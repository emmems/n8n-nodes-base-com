import {INodeProperties} from "n8n-workflow";
import {Resource, ExternalStoragesMethod} from "../types";

import {getExternalStoragesListDefinition} from "./GetExternalStoragesList/definition";
import {getExternalStorageCategoriesDefinition} from "./GetExternalStorageCategories/definition";
import {getExternalStorageProductsDataDefinition} from "./GetExternalStorageProductsData/definition";
import {getExternalStorageProductsListDefinition} from "./GetExternalStorageProductsList/definition";
import {getExternalStorageProductsQuantityDefinition} from "./GetExternalStorageProductsQuantity/definition";
import {getExternalStorageProductsPricesDefinition} from "./GetExternalStorageProductsPrices/definition";
import {updateExternalStorageProductsQuantityDefinition} from "./UpdateExternalStorageProductsQuantity/definition";

export const externalStoragesDefinition: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					Resource.ExternalStorages
				],
			},
		},
		required: true,
		options: [
			// External Storages
			{
				name: 'Get External Storages List',
				value: ExternalStoragesMethod.GetExternalStoragesList,
				description: 'The method allows you to retrieve a list of available external storages (shops, wholesalers) that can be referenced via API',
				action: 'Get external storages list',
			},
			{
				name: 'Get External Storage Categories',
				value: ExternalStoragesMethod.GetExternalStorageCategories,
				description: 'The method allows you to retrieve a category list from an external storage (shop/wholesale) connected to BaseLinker',
				action: 'Get category list from an external storage',
			},
			{
				name: 'Get External Storage Products Data',
				value: ExternalStoragesMethod.GetExternalStorageProductsData,
				description: 'The method allows to retrieve detailed data of selected products from an external storage (shop/wholesaler) connected to BaseLinker',
				action: 'Get detailed data of selected products from an external storage',
			},
			{
				name: 'Get External Storage Products List',
				value: ExternalStoragesMethod.GetExternalStorageProductsList,
				description: 'The method allows to retrieve detailed data of selected products from an external storage (shop/wholesaler) connected to BaseLinker',
				action: 'Get filtered data of products from an external storage',
			},
			{
				name: 'Get External Storage Products Quantity',
				value: ExternalStoragesMethod.GetExternalStorageProductsQuantity,
				description: 'The method allows to retrieve stock from an external storage (shop/wholesaler) connected to BaseLinker',
				action: 'Get stock of products from an external storage',
			},
			{
				name: 'Get External Storage Products Prices',
				value: ExternalStoragesMethod.GetExternalStorageProductsPrices,
				description: 'The method allows to retrieve product prices from an external storage (shop/wholesaler) connected to BaseLinker',
				action: 'Get prices of products from an external storage',
			},
			{
				name: 'Update External Storage Products Quantity',
				value: ExternalStoragesMethod.UpdateExternalStorageProductsQuantity,
				description: 'The method allows to bulk update the product stock (and/or variants) in an external storage (shop/wholesaler) connected to BaseLinker. Maximum 1000 products at a time.',
				action: 'Update the product stock in an external storage',
			},
		],
		default: ExternalStoragesMethod.GetExternalStorageProductsList.toString(),
		noDataExpression: true,
	},
	...getExternalStoragesListDefinition,
	...getExternalStorageCategoriesDefinition,
	...getExternalStorageProductsDataDefinition,
	...getExternalStorageProductsListDefinition,
	...getExternalStorageProductsQuantityDefinition,
	...getExternalStorageProductsPricesDefinition,
	...updateExternalStorageProductsQuantityDefinition,
];
