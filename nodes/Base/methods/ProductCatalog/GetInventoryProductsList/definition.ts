import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const getInventoryProductsListDefinition: INodeProperties[] = [
	{
		displayName: 'Inventory ID',
		name: 'inventory_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.GetInventoryProductsList
				],
			},
		},
		default: 0,
		placeholder: '307',
		description:'Catalog ID. The list of identifiers can be retrieved using the method getInventories.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.GetInventoryProductsList
				],
			},
		},
		options: [
			{
				displayName: 'Filter ID (Optional)',
				name: 'filter_id',
				type: 'number',
				default: 0,
				placeholder: '2685',
				description: '(optional) limiting results to a specific product ID',
			},
			{
				displayName: 'Filter Category ID (Optional)',
				name: 'filter_category_id',
				type: 'number',
				default: 0,
				placeholder: '2685',
				description: '(optional) Retrieving products from a specific category (optional)',
			},
			{
				displayName: 'Filter EAN (Optional)',
				name: 'filter_ean',
				type: 'string',
				default: '',
				placeholder: '63576363463',
				description: '(optional) limiting results to a specific ean',
			},
			{
				displayName: 'Filter SKU (Optional)',
				name: 'filter_sku',
				type: 'string',
				default: '',
				placeholder: 'PL53F',
				description: '(optional) limiting the results to a specific SKU (stock keeping number)',
			},
			{
				displayName: 'Filter Name (Optional)',
				name: 'filter_name',
				type: 'string',
				default: '',
				placeholder: 'Nike PL35 shoes',
				description: '(optional) item name filter (part of the searched name or an empty field)',
			},
			{
				displayName: 'Filter Price From (Optional)',
				name: 'filter_price_from',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				placeholder: '20.99',
				description: '(optional) minimum price limit (not displaying products with lower price)',
			},
			{
				displayName: 'Filter Price To (Optional)',
				name: 'filter_price_to',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				placeholder: '23.99',
				description: '(optional) maximum price limit',
			},
			{
				displayName: 'Filter Stock From (Optional)',
				name: 'filter_stock_from',
				type: 'number',
				default: 0,
				placeholder: '5',
				description: '(optional) minimum quantity limit',
			},
			{
				displayName: 'Filter Stock To (Optional)',
				name: 'filter_stock_to',
				type: 'number',
				default: 0,
				placeholder: '7',
				description: '(optional) maximum quantity limit',
			},
			{
				displayName: 'Page (Optional)',
				name: 'page',
				type: 'number',
				default: 0,
				placeholder: '',
				description: '(optional) Results paging (1000 products per page for BaseLinker warehouse)',
			},
			{
				displayName: 'Filter Sort (Optional)',
				name: 'filter_sort',
				type: 'string',
				default: '',
				placeholder: '',
				description: '(optional) the value for sorting the product list. Possible values: "ID [ASC|DESC]".',
			},
		],
	},
]



