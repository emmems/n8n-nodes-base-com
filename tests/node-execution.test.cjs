const test = require('node:test');
const assert = require('node:assert/strict');
const { NodeApiError } = require('n8n-workflow');
const { Base } = require('../dist/nodes/Base/Base.node.js');
const { Resource, ProductCatalogMethod } = require('../dist/nodes/Base/methods/types.js');

function makeContext({ request, continueOnFail = false, items = [{ json: {} }], resource = Resource.ProductCatalog, operation = ProductCatalogMethod.GetInventoryProductsList, parameters = {} }) {
  const requests = [];
  const context = {
    getInputData: () => items,
    getNode: () => ({ name: 'Base', type: 'base', typeVersion: 1, position: [0, 0], parameters: {} }),
    getNodeParameter(name, index) {
      if (name === 'resource') return resource;
      if (name === 'operation') return operation;
      if (name in parameters) return parameters[name];
      if (name === 'inventory_id') return 765;
      if (name === 'additionalFields') return { filter_sku: `SKU ${index}` };
      throw new Error(`Unexpected parameter: ${name}`);
    },
    getCredentials: async (name) => {
      assert.equal(name, 'baseComApi');
      return { apiKey: 'secret-token' };
    },
    continueOnFail: () => continueOnFail,
    helpers: {
      httpRequestWithAuthentication: async function (credentialName, options) {
        requests.push({ credentialName, options, context: this });
        return request(options, requests.length - 1);
      },
      returnJsonArray: (values) => values.map((json) => ({ json })),
      constructExecutionMetaData: (values, { itemData }) => values.map((value) => ({ ...value, pairedItem: itemData })),
    },
  };
  return { context, requests };
}

test('uses n8n credential auth and sends Base URL encoded form data', async () => {
  const { context, requests } = makeContext({ request: async () => ({ status: 'SUCCESS', products: [] }) });
  const result = await new Base().execute.call(context);

  assert.equal(result[0][0].json.status, 'SUCCESS');
  assert.equal(requests.length, 1);
  const { credentialName, options } = requests[0];
  assert.equal(credentialName, 'baseComApi');
  assert.equal(requests[0].context, context);
  assert.equal(options.url, 'https://api.baselinker.com/connector.php');
  assert.equal(options.method, 'POST');
  assert.equal(options.headers['content-type'], 'application/x-www-form-urlencoded');
  const form = new URLSearchParams(options.body);
  assert.equal(form.get('method'), 'getInventoryProductsList');
  assert.deepEqual(JSON.parse(form.get('parameters')), { inventory_id: 765, filter_sku: 'SKU 0' });
  assert.equal(options.headers['X-BLToken'], undefined);
});

test('executes once per input and preserves each item parameter value', async () => {
  const { context, requests } = makeContext({
    items: [{ json: { id: 1 } }, { json: { id: 2 } }],
    request: async (_options, index) => ({ status: 'SUCCESS', item: index }),
  });
  const result = await new Base().execute.call(context);

  assert.equal(requests.length, 2);
  assert.deepEqual(result[0].map((item) => item.pairedItem), [{ item: 0 }, { item: 1 }]);
  assert.deepEqual(result[0].map((item) => item.json.item), [0, 1]);
  assert.deepEqual(requests.map(({ options }) => JSON.parse(new URLSearchParams(options.body).get('parameters'))), [
    { inventory_id: 765, filter_sku: 'SKU 0' },
    { inventory_id: 765, filter_sku: 'SKU 1' },
  ]);
});

test('continues after an HTTP helper error when continueOnFail is enabled', async () => {
  const { context, requests } = makeContext({
    continueOnFail: true,
    items: [{ json: {} }, { json: {} }],
    request: async (_options, index) => {
      if (index === 0) throw new Error('Base unavailable');
      return { status: 'SUCCESS' };
    },
  });
  const result = await new Base().execute.call(context);

  assert.equal(requests.length, 2);
  assert.deepEqual(result[0].map((item) => item.pairedItem), [{ item: 0 }, { item: 1 }]);
  assert.deepEqual(result[0].map((item) => item.json), [
    { error: 'Base unavailable' },
    { status: 'SUCCESS' },
  ]);
});

test('propagates HTTP helper errors when continueOnFail is disabled', async () => {
  const { context } = makeContext({ request: async () => { throw new Error('HTTP 401'); } });
  await assert.rejects(() => new Base().execute.call(context), /HTTP 401/);
});

test('Set Order Payment sends the declared payment amount field', async () => {
  const { context, requests } = makeContext({
    resource: Resource.Orders,
    operation: 'setOrderPayment',
    parameters: { order_id: 88, payment_done: 12.5, payment_date: 1730000000, payment_comment: 'Paid' },
    request: async () => ({ status: 'SUCCESS' }),
  });
  await new Base().execute.call(context);
  const form = new URLSearchParams(requests[0].options.body);
  assert.equal(form.get('method'), 'setOrderPayment');
  assert.deepEqual(JSON.parse(form.get('parameters')), { order_id: 88, payment_done: 12.5, payment_date: 1730000000, payment_comment: 'Paid' });
});


test('throws NodeApiError for a Base ERROR response when continueOnFail is disabled', async () => {
  const response = { status: 'ERROR', error_code: 'ERROR_BAD_TOKEN', error_message: 'Invalid API token' };
  const { context, requests } = makeContext({
    items: [{ json: {} }, { json: {} }],
    request: async () => response,
  });
  await assert.rejects(() => new Base().execute.call(context), (error) => {
    assert.ok(error instanceof NodeApiError);
    assert.match(error.message, /Invalid API token/);
    assert.match(error.description, /ERROR_BAD_TOKEN/);
    return true;
  });
  assert.equal(requests.length, 1);
});

test('continues with a paired error item after a Base ERROR response', async () => {
  const { context, requests } = makeContext({
    continueOnFail: true,
    items: [{ json: {} }, { json: {} }],
    request: async (_options, index) => index === 0
      ? { status: 'ERROR', error_code: 'ERROR_BAD_TOKEN', error_message: 'Invalid API token' }
      : { status: 'SUCCESS' },
  });
  const [result] = await new Base().execute.call(context);
  assert.equal(requests.length, 2);
  assert.deepEqual(result.map((item) => item.json), [{ error: 'Invalid API token' }, { status: 'SUCCESS' }]);
  assert.deepEqual(result.map((item) => item.pairedItem), [{ item: 0 }, { item: 1 }]);
});

for (const [value, expected] of [
  ['23', 23], ['7.5', 7.5], ['0', 0], ['100', 100], [23, 23], [0, 0], [100, 100],
  ...['DEFAULT', 'ITEM', 'EXPT', 'ZW', 'NP', 'OO'].map((rate) => [rate.toLowerCase(), rate]),
]) {
  test(`Add Invoice serializes VAT ${JSON.stringify(value)} as ${JSON.stringify(expected)}`, async () => {
    const { context, requests } = makeContext({
      resource: Resource.Orders,
      operation: 'addInvoice',
      parameters: { order_id: 88, series_id: 9, additionalFields: { vat_rate: value } },
      request: async () => ({ status: 'SUCCESS' }),
    });
    await new Base().execute.call(context);
    const form = new URLSearchParams(requests[0].options.body);
    assert.equal(form.get('method'), 'addInvoice');
    assert.deepEqual(JSON.parse(form.get('parameters')), { order_id: 88, series_id: 9, vat_rate: expected });
  });
}

for (const value of ['-1', '101', '23junk', '', ' ', 'NaN', 'Infinity', -1, 101, NaN, Infinity]) {
  test(`Add Invoice rejects invalid VAT ${String(value)} before requesting`, async () => {
    const { context, requests } = makeContext({
      resource: Resource.Orders,
      operation: 'addInvoice',
      parameters: { order_id: 88, series_id: 9, additionalFields: { vat_rate: value } },
      request: async () => ({ status: 'SUCCESS' }),
    });
    await assert.rejects(() => new Base().execute.call(context), /Invalid value for Vat Rate/);
    assert.equal(requests.length, 0);
  });
}

test('Update Inventory Products Prices sends the price method and price group mapping', async () => {
  const { context, requests } = makeContext({
    operation: ProductCatalogMethod.UpdateInventoryProductsPrices,
    parameters: { products: { metadataValues: [
      { name: '123', value: { metadataValues: { price_group_id: '45', price: 19.99 } } },
    ] } },
    request: async () => ({ status: 'SUCCESS' }),
  });
  await new Base().execute.call(context);
  const form = new URLSearchParams(requests[0].options.body);
  assert.equal(form.get('method'), 'updateInventoryProductsPrices');
  assert.deepEqual(JSON.parse(form.get('parameters')), { inventory_id: '765', products: { 123: { 45: 19.99 } } });
});

test('Run Product Macro Trigger sends distinct product and trigger IDs', async () => {
  const { context, requests } = makeContext({
    operation: ProductCatalogMethod.RunProductMacroTrigger,
    parameters: { product_id: 123, trigger_id: 456 },
    request: async () => ({ status: 'SUCCESS' }),
  });
  await new Base().execute.call(context);
  const form = new URLSearchParams(requests[0].options.body);
  assert.equal(form.get('method'), 'runProductMacroTrigger');
  assert.deepEqual(JSON.parse(form.get('parameters')), { product_id: 123, trigger_id: 456 });
});

test('Add Inventory Product serializes the declared manufacturer_id field', async () => {
  const { context, requests } = makeContext({
    operation: ProductCatalogMethod.AddInventoryProduct,
    parameters: { inventory_id: '765', additionalFields: { manufacturer_id: 456 } },
    request: async () => ({ status: 'SUCCESS' }),
  });
  await new Base().execute.call(context);
  const form = new URLSearchParams(requests[0].options.body);
  assert.equal(form.get('method'), 'addInventoryProduct');
  assert.deepEqual(JSON.parse(form.get('parameters')), { inventory_id: '765', manufacturer_id: 456 });
});

test('External Storage validates and serializes a product ID collection without runtime dependencies', async () => {
  const { context, requests } = makeContext({
    resource: Resource.ExternalStorages,
    operation: 'getExternalStorageProductsData',
    parameters: { storage_id: 'shop_1', products: { metadataValues: [{ product_id: 42 }, { product_id: 77 }] } },
    request: async () => ({ status: 'SUCCESS' }),
  });
  await new Base().execute.call(context);
  const form = new URLSearchParams(requests[0].options.body);
  assert.equal(form.get('method'), 'getExternalStorageProductsData');
  assert.deepEqual(JSON.parse(form.get('parameters')), { storage_id: 'shop_1', products: [42, 77] });
});

for (const products of [null, [], { metadataValues: 'invalid' }, { metadataValues: [{ product_id: '42' }] }]) {
  test(`rejects malformed External Storage collection ${JSON.stringify(products)} before requesting`, async () => {
    const { context, requests } = makeContext({
      resource: Resource.ExternalStorages,
      operation: 'getExternalStorageProductsData',
      parameters: { storage_id: 'shop_1', products },
      request: async () => ({ status: 'SUCCESS' }),
    });
    await assert.rejects(() => new Base().execute.call(context), /must be/);
    assert.equal(requests.length, 0);
  });
}
