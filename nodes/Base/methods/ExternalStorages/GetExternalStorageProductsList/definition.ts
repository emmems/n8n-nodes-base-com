import {INodeProperties} from "n8n-workflow";
import {Resource, ExternalStoragesMethod} from "../../types";

export const getExternalStorageProductsListDefinition: INodeProperties[] = [
	{
		displayName: 'Storage ID',
		name: 'storage_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ExternalStorages
				],
				operation: [
					ExternalStoragesMethod.GetExternalStorageProductsList
				],
			},
		},
		default: '',
		placeholder: 'shop_2445',
		description: 'Storage ID in format "[type:shop|warehouse]_[ID:int]" (e.g. "shop_2445")',
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
					Resource.ExternalStorages
				],
				operation: [
					ExternalStoragesMethod.GetExternalStorageProductsList
				],
			},
		},
		options: [
			{
				displayName: 'Filter Category ID (Optional)',
				name: 'filter_category_id',
				type: 'string',
				default:'',
				placeholder: '543',
				description:'(optional) Retrieving products from a specific category (optional)',
			},
			{
				displayName: 'Filter Sort (Optional)',
				name: 'filter_sort',
				type: 'string',
				default:'',
				placeholder: '"ID [ASC|DESC]", "name [ASC|DESC]"...',
				description: '(optional) the value for sorting the product list. Possible values: "ID [ASC|DESC]", "name [ASC|DESC]", "quantity [ASC|DESC]", "price [ASC|DESC]".',
			},
			{
				displayName: 'Filter ID (Optional)',
				name: 'filter_id',
				type: 'string',
				default:'',
				placeholder: '2546',
				description: '(optional) limiting results to a specific product ID',
			},
			{
				displayName: 'Filter EAN (Optional)',
				name: 'filter_ean',
				type: 'string',
				default:'',
				placeholder: '63576363463',
				description: '(optional) limiting results to a specific ean',
			},
			{
				displayName: 'Filter SKU (Optional)',
				name: 'filter_sku',
				type: 'string',
				default:'',
				placeholder: 'PL53F',
				description: '(optional) limiting the results to a specific SKU (stock keeping number)',
			},
			{
				displayName: 'Filter Name (Optional)',
				name: 'filter_name',
				type: 'string',
				default:'',
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
				description:'(optional) minimum price limit (not displaying products with lower price)',
			},
			{
				displayName: 'Filter Price To (Optional)',
				name: 'filter_price_to',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				description:'(optional) maximum price limit',
			},
			{
				displayName: 'Filter Quantity From (Optional)',
				name: 'filter_quantity_from',
				type: 'number',
				default: 0,
				description:'(optional) minimum quantity limit',
			},
			{
				displayName: 'Filter Quantity To (Optional)',
				name: 'filter_quantity_to',
				type: 'number',
				default: 0,
				description:'(optional) maximum quantity limit',
			},
			{
				displayName: 'Filter Available (Optional)',
				name: 'filter_available',
				type: 'number',
				default: 0,
				description: '(optional) displaying only products marked as available (value 1) or not available (0) or all (empty value)',
			},
			{
				displayName: 'Page (Optional)',
				name: 'page',
				type: 'number',
				default: 0,
				description: '(NEW) (optional) Paging results',
			},
		],
	},
];
