import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const updateInventoryProductsStockDefinition: INodeProperties[] = [
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
					ProductCatalogMethod.UpdateInventoryProductsStock
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
		description: 'An array of products, where the key is a product ID and the value is a list of stocks. When determining the variant stock, provide variant ID as a product ID.\n' +
			'In the stocks array the key should be the warehouse ID and the value - stock for that warehouse. The format of the warehouse identifier should be as follows: "[type:bl|shop|warehouse]_[id:int]". (e.g. "bl_123"). The list of warehouse identifiers can be retrieved using the getInventoryWarehousesmethod.\n' +
			'\n' +
			'Stocks cannot be assigned to the warehouses created automatically for purposes of keeping external stocks (shops, wholesalers, etc.).',
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
						displayName: 'Product ID and Variant ID for External Warehouse',
						name: 'value',
						type: 'fixedCollection',
						default: {},
						description: 'The value is an array containing the fields listed below',
						options: [
							{
								name: 'metadataValues',
								displayName: 'Metadata',
								values: [
									{
										displayName: 'Warehouse ID',
										name: 'warehouse_id',
										type: 'string',
										default: '',
										description: 'In the stocks array the key should be the warehouse ID and the value - stock for that warehouse. The format of the warehouse identifier should be as follows: "[type:bl|shop|warehouse]_[ID:int]". (e.g. "bl_123"). The list of warehouse identifiers can be retrieved using the getInventoryWarehousesmethod.',
										placeholder: 'bl_206'
									},
									{
										displayName: 'Stock for that Warehouse',
										name: 'stock',
										type: 'number',
										default: 0,
										description: 'In the stocks array the key should be the warehouse ID and the value - stock for that warehouse. The format of the warehouse identifier should be as follows: "[type:bl|shop|warehouse]_[ID:int]". (e.g. "bl_123"). The list of warehouse identifiers can be retrieved using the getInventoryWarehousesmethod.',
										placeholder: '3'
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
					ProductCatalogMethod.UpdateInventoryProductsStock
				],
			},
		},
	},
]
