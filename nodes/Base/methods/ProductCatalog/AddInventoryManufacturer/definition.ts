import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const addInventoryManufacturerDefinition: INodeProperties[] = [
	{
		displayName: 'Manufacturer ID (Optional)',
		name: 'manufacturer_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventoryManufacturer
				],
			},
		},
		default: 0,
		placeholder: '8',
		description:'Manufacturer ID provided in case of an update. Should be blank when creating a new manufacturer.',
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
					ProductCatalogMethod.AddInventoryManufacturer
				],
			},
		},
		default:'',
		placeholder: 'Test manufacturer 2',
		description:'Manufacturer name',
	},
]
