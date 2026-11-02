import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const deleteInventoryPriceGroupDefinition: INodeProperties[] = [
	{
		displayName: 'Price Group ID',
		name: 'price_group_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.DeleteInventoryPriceGroup
				],
			},
		},
		default: 0,
		placeholder: '105',
		description:'Price group identifier',
	},
]
