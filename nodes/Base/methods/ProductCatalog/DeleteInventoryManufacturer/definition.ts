import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const deleteInventoryManufacturerDefinition: INodeProperties[] = [
	{
		displayName: 'Manufacturer ID',
		name: 'manufacturer_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.DeleteInventoryManufacturer
				],
			},
		},
		default: 0,
		placeholder: '8',
		description:'The ID of the manufacturer removed from BaseLinker warehouse',
	},
]
