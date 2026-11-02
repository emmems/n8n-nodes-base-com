import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const getInventoryCategoriesDefinition: INodeProperties[] = [
	{
		displayName: 'Inventory ID (Optional)',
		name: 'inventory_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.GetInventoryCategories
				],
			},
		},
		default: 0,
		placeholder: '',
		description:'Catalog ID. The list of identifiers can be retrieved by the getInventories method (inventory_id field). To retrieve categories available for all catalogs created in BaseLinker, this field should be omitted.',
	},
]
