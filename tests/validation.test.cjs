const test = require('node:test');
const assert = require('node:assert/strict');
const { default: validation } = require('../dist/nodes/Base/methods/validation.js');

test('validates nested parameter shapes and strips undeclared fields', () => {
  const schema = validation.object({
    fields: validation.array(validation.object({ id: validation.string(), amount: validation.number().nonnegative() })),
    enabled: validation.boolean(),
    optional: validation.string().optional(),
    nullable: validation.string().nullish(),
  });
  assert.deepEqual(schema.parse({ fields: [{ id: '42', amount: 0, extra: true }], enabled: false, nullable: null, ignored: 1 }), {
    fields: [{ id: '42', amount: 0 }], enabled: false, nullable: null,
  });
  assert.throws(() => schema.parse({ fields: [{ id: '42', amount: -1 }], enabled: false }), /nonnegative/);
  assert.throws(() => schema.parse({ fields: [{ id: 42, amount: 1 }], enabled: false }), /fields\[0\].id/);
});

test('validates numeric records, unions, and transforms used by stock and price operations', () => {
  const record = validation.record(validation.string(), validation.number());
  assert.deepEqual(record.parse({ warehouse: 10, price: 0 }), { warehouse: 10, price: 0 });
  for (const input of [null, [], { warehouse: '10' }, { warehouse: NaN }, { warehouse: Infinity }]) {
    assert.throws(() => record.parse(input), /must be/);
  }
  const union = validation.union([validation.string(), validation.number(), validation.null()]);
  for (const value of ['123', 123, null]) assert.equal(union.parse(value), value);
  assert.throws(() => union.parse(true), /accepted value/);
  const transform = validation.object({ warehouse: validation.string(), stock: validation.number() })
    .transform(({ warehouse, stock }) => ({ [warehouse]: stock }));
  assert.deepEqual(transform.parse({ warehouse: 'bl_123', stock: 4 }), { bl_123: 4 });
});

test('validates positive quantities and email parameters', () => {
  assert.equal(validation.number().gt(0).parse(1), 1);
  assert.throws(() => validation.number().gt(0).parse(0), /greater than/);
  assert.equal(validation.string().email().parse('user@example.com'), 'user@example.com');
  assert.throws(() => validation.string().email().parse('invalid'), /email/);
});

for (const email of ['a..b@example.com', '.a@example.com', 'a.@example.com', 'a@example.1', 'a@-example.com', 'a@example', 'a b@example.com']) {
  test(`rejects malformed email ${email}`, () => {
    assert.throws(() => validation.string().email().parse(email), /email/);
  });
}
for (const email of ['a.b+tag@example.com', "o'hara@example.co.uk", 'USER_1@example.com']) {
  test(`accepts email ${email}`, () => {
    assert.equal(validation.string().email().parse(email), email);
  });
}
