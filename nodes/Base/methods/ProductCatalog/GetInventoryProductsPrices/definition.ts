import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const getInventoryProductsPricesDefinition: INodeProperties[] = [
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
					ProductCatalogMethod.GetInventoryProductsPrices
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
					ProductCatalogMethod.GetInventoryProductsPrices
				],
			},
		},
		options: [
			{
				displayName: 'Page (Optional)',
				name: 'page',
				type: 'number',
				default: 0,
				placeholder: '',
				description: '(optional) Results paging (1000 products per page for BaseLinker warehouse)',
			},
		],
	},
]



