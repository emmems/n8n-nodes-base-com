import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const getInventoryProductsDataDefinition: INodeProperties[] = [
	{
		displayName: 'Inventory ID (Optional)',
		name: 'inventory_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.GetInventoryProductsData
				],
			},
		},
		default: 0,
		placeholder: '307',
		description:'Catalog ID. The list of identifiers can be retrieved using the method getInventories.',
	},
	{
		displayName: 'Products',
		name: 'products',
		placeholder: 'Add product',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'An array of product ID numbers to download',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'ID of Product',
						name: 'value',
						type: 'number',
						default: 0,
						description: 'Product ID numbers to download',
						placeholder: '2685'
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
					ProductCatalogMethod.GetInventoryProductsData
				],
			}
		},
	},
]



