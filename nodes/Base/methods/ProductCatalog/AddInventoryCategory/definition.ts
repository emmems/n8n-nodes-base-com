import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const addInventoryCategoryDefinition: INodeProperties[] = [
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
					ProductCatalogMethod.AddInventoryCategory
				],
			},
		},
		default: 0,
		placeholder: '206',
		description:'Catalog ID. The list of identifiers can be retrieved by the getInventories method (inventory_id field). To add a category available for all catalogs created in BaseLinker, this field should be omitted.',
	},
	{
		displayName: 'Category ID (Optional)',
		name: 'category_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventoryCategory
				],
			},
		},
		default: 0,
		placeholder: '6',
		description:'The category identifier to be provided for updates. Should be left blank when creating a new category.',
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
					ProductCatalogMethod.AddInventoryCategory
				],
			},
		},
		default:'',
		placeholder: 'Textiles',
		description:'Category name',
	},
	{
		displayName: 'Parent ID',
		name: 'parent_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventoryCategory
				],
			},
		},
		default: 0,
		placeholder: '5',
		description:'The parent category identifier obtained previously at the output of the addCategory method. Categories should be added starting from the hierarchy root so that the child is always added after the parent (you need to know the parent ID to add the child). For the top level category, 0 should be given as parent_id.',
	},
]
