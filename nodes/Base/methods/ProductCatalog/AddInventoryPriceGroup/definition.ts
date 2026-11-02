import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const addInventoryPriceGroupDefinition: INodeProperties[] = [
	{
		displayName: 'Price Group ID (Optional)',
		name: 'price_group_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventoryPriceGroup
				],
			},
		},
		default: 0,
		placeholder: '105',
		description:'Price group identifier',
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
					ProductCatalogMethod.AddInventoryPriceGroup
				],
			},
		},
		default:'',
		placeholder: 'USA',
		description:'Name of the price group',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		typeOptions: {
			rows: 2,
		},
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventoryPriceGroup
				],
			},
		},
		default:'',
		placeholder: 'Price group for US market',
		description:'Price group description',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventoryPriceGroup
				],
			},
		},
		default:'',
		placeholder: 'USD',
		description:'3-letter currency symbol e.g. PLN, EUR',
	},
]
