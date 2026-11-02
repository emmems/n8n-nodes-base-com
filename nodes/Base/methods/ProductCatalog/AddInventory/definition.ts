import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const addInventoryDefinition: INodeProperties[] = [
	{
		displayName: 'Inventory ID (Optional)',
		name: 'inventory_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			},
		},
		default: 0,
		placeholder: '307',
		description:'Catalog ID. The list of identifiers can be retrieved using the method getInventories.',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			},
		},
		default:'',
		placeholder: 'Additional catalog',
		description:'Catalog name',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 2,
		},
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			},
		},
		default:'',
		placeholder: 'Additional product catalog',
		description:'Catalog description',
	},
	{
		displayName: 'Languages',
		name: 'languages',
		placeholder: 'Add Language',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'An array of languages available in the catalogue',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Language',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Shortcut for the language',
						placeholder: 'en'
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			}
		},
	},
	{
		displayName: 'Default Language',
		name: 'default_language',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			},
		},
		default:'',
		placeholder: 'en',
		description:'Default catalogue language. Must be included in the "languages" parameter.',
	},
	{
		displayName: 'Price Groups',
		name: 'price_groups',
		placeholder: 'Add Price Group',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'An array of price group identifiers available in the catalogue. The list of price group identifiers can be downloaded using the getInventoryPriceGroups method.',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Price Group',
						name: 'value',
						type: 'number',
						default: '',
						description: 'ID for the price group',
						placeholder: '105'
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			}
		},
	},
	{
		displayName: 'Default Price Group',
		name: 'default_price_group',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			},
		},
		default: '',
		placeholder: '105',
		description:'ID of the price group default for the catalogue. The identifier must be included in the "price_groups" parameter.',
	},
	{
		displayName: 'Warehouses',
		name: 'warehouses',
		placeholder: 'Add warehouse',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'An array of warehouse identifiers available in the catalogue. The list of warehouse identifiers can be retrieved using the getInventoryWarehouses API method. The format of the identifier should be as follows: "[type:bl|shop|warehouse]_[ID:int]". (e.g. "shop_2445").',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Warehouse',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Identifier for the warehouse (e.g. "shop_2334")',
						placeholder: 'shop_2334'
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			}
		},
	},
	{
		displayName: 'Default Warehouse',
		name: 'default_warehouse',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			},
		},
		default:'',
		placeholder: 'shop_2334',
		description: 'Identifier of the warehouse default for the catalogue. The identifier must be included in the "warehouses" parameter.',
	},
	{
		displayName: 'Reservations',
		name: 'reservations',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventory
				],
			},
		},
		default:true,
		// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
		description: 'Does this catalogue support reservations',
	},
]



