import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const deleteInventoryDefinition: INodeProperties[] = [
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
					ProductCatalogMethod.DeleteInventory
				],
			},
		},
		default: 0,
		placeholder: '307',
		description:'Catalog ID. The list of identifiers can be retrieved using the method getInventories.',
	},
]
