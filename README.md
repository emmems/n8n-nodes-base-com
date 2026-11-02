# @emems/n8n-nodes-base-com

An [n8n](https://n8n.io/) community node for the [Base](https://base.com/) API (formerly BaseLinker).

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Compatibility](#compatibility) · [Development](#development) · [Resources](#resources)

## Installation

Follow the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n docs. In n8n, go to **Settings → Community Nodes → Install** and enter:

```
@emems/n8n-nodes-base-com
```

## Credentials

The node uses the **Base API** credential, which needs one API token.

1. In Base, open **Account & other → My account → API**.
2. Generate a token. Its permissions decide which operations will work.
3. In n8n, create a **Base API** credential and paste in the token.

n8n checks the token by calling `getInventories` when you save the credential.

## Operations

Each operation maps to the [Base API](https://api.baselinker.com/) method with the same name.

**Product Catalog:** add/delete/get inventories, price groups, warehouses, categories and manufacturers; get extra fields, integrations and available text field keys; add, delete and get products; get and update stock and prices; get product logs; run product macro triggers.

**External Storage:** get the storages list, categories, product data, product list, quantities and prices; update product quantities.

**Order:** add and get orders (by ID, email or phone); get the journal list, order sources, extra fields, transaction details, status list and payment history; set order fields, status(es), payment and receipt; add, edit and delete order products; add and get invoices, series and invoice files; add invoice and receipt files; get receipts and new receipts; run order macro triggers.

**Courier Shipment:** create packages (automatic and manual); get couriers, courier fields, services and accounts; get labels and protocols; get order packages and package status history; delete packages; request parcel pickups and get their fields.

## Compatibility

The package targets the modern execution APIs in `n8n-workflow@3.0.1`, currently a release candidate (RC). It has been tested by installing the packed package into n8n 2.45.7 and running workflows. No n8n 3.x application has been released yet, so it has not been tested in one. Use the Node.js version required by your n8n installation.

The package has no runtime dependencies. Requests use n8n’s authenticated HTTP helper and the `baseComApi` credential. Base API error responses fail execution, or produce an error item when **Continue On Fail** is enabled.

## Development

```sh
npm ci
npm run build
npm run lint
npm test
```

To run it in a local n8n (installs into `~/.n8n/custom` and starts n8n):

```sh
npm run dev:n8n
```

To call the API without n8n:

```sh
BASE_API_TOKEN=your-token node debug/base-api.js
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Base API documentation](https://api.baselinker.com/)

## License

[MIT](LICENSE.md)
