import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const deleteInventoryCategoryDefinition: INodeProperties[] = [
	{
		displayName: 'Category ID',
		name: 'category_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.DeleteInventoryCategory
				],
			},
		},
		default: 0,
		placeholder: '6',
		description:'The number of the category to be removed in the BaseLinker storage',
	},
]
