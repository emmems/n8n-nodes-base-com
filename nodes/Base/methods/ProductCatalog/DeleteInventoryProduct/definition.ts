import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const deleteInventoryProductDefinition: INodeProperties[] = [
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.DeleteInventoryProduct
				],
			},
		},
		default:'',
		placeholder: '8',
		description:'BaseLinker catalogue product identifier',
	},
]
