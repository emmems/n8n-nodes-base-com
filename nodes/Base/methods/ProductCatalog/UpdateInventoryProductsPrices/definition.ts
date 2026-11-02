import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const updateInventoryProductsPricesDefinition: INodeProperties[] = [
	{
		displayName: 'Inventory ID',
		name: 'inventory_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.UpdateInventoryProductsPrices
				],
			},
		},
		default: '',
		placeholder: '307',
		description:'Catalog ID. The list of identifiers can be retrieved using the method getInventories.',
	},
	{
		displayName: 'Products',
		name: 'products',
		placeholder: 'Add Product',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'An array of products, where the key is a product ID and the value is a list of prices. When determining the variant price, provide variant ID as a product ID.\n' +
			'In the prices array the key should be the price group ID and the value - price for that price group. The list of price groups can be retrieved using the getInventoryPriceGroups method.',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Product ID',
						name: 'name',
						type: 'string',
						default: '',
						description: 'An array of products, where the key is a product ID and the value is a list of stocks. When determining the variant stock, provide variant ID as a product ID.',
						placeholder: '2685'
					},
					{
						displayName: 'List of Prices',
						name: 'value',
						type: 'fixedCollection',
						default: {},
						description: 'In the prices array the key should be the price group ID and the value - price for that price group. The list of price groups can be retrieved using the getInventoryPriceGroups method.',
						options: [
							{
								name: 'metadataValues',
								displayName: 'Metadata',
								values: [
									{
										displayName: 'Price Group ID',
										name: 'price_group_id',
										type: 'string',
										default: '',
										placeholder: '105'
									},
									{
										displayName: 'Price',
										name: 'price',
										type: 'number',
										typeOptions: {
											numberPrecision: 2,
										},
										default: 0,
										placeholder: '21.99'
									},
								]
							}
						]
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
					ProductCatalogMethod.UpdateInventoryProductsPrices
				],
			},
		},
	},
]
