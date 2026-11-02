import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const deleteInventoryWarehouseDefinition: INodeProperties[] = [
	{
		displayName: 'Warehouse ID',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.DeleteInventoryWarehouse
				],
			},
		},
		default: 0,
		placeholder: '206',
		description:'ID of the warehouse',
	},
]
