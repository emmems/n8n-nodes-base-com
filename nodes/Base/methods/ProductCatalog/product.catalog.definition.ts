import {Resource, ProductCatalogMethod} from "../types";
import {INodeProperties} from "n8n-workflow";
import {addInventoryPriceGroupDefinition} from "./AddInventoryPriceGroup/definition";
import {deleteInventoryPriceGroupDefinition} from "./DeleteInventoryPriceGroup/definition";
import {getInventoryPriceGroupsDefinition} from "./GetInventoryPriceGroups/definition";
import {addInventoryWarehouseDefinition} from "./AddInventoryWarehouse/definition";
import {deleteInventoryWarehouseDefinition} from "./DeleteInventoryWarehouse/definition";
import {getInventoryWarehousesDefinition} from "./GetInventoryWarehouses/definition";
import {addInventoryDefinition} from "./AddInventory/definition";
import {deleteInventoryDefinition} from "./DeleteInventory/definition";
import {getInventoriesDefinition} from "./GetInventories/definition";
import {addInventoryCategoryDefinition} from "./AddInventoryCategory/definition";
import {deleteInventoryCategoryDefinition} from "./DeleteInventoryCategory/definition";
import {getInventoryCategoriesDefinition} from "./GetInventoryCategories/definition";
import {addInventoryManufacturerDefinition} from "./AddInventoryManufacturer/definition";
import {deleteInventoryManufacturerDefinition} from "./DeleteInventoryManufacturer/definition";
import {getInventoryManufacturersDefinition} from "./GetInventoryManufacturers/definition";
import {getInventoryExtraFieldsDefinition} from "./GetInventoryExtraFields/definition";
import {getInventoryIntegrationsDefinition} from "./GetInventoryIntegrations/definition";
import {getInventoryAvailableTextFieldKeysDefinition} from "./GetInventoryAvailableTextFieldKeys/definition";
import {addInventoryProductDefinition} from "./AddInventoryProduct/definition";
import {deleteInventoryProductDefinition} from "./DeleteInventoryProduct/definition";
import {getInventoryProductsDataDefinition} from "./GetInventoryProductsData/definition";
import {getInventoryProductsListDefinition} from "./GetInventoryProductsList/definition";
import {getInventoryProductsStockDefinition} from "./GetInventoryProductsStock/definition";
import {updateInventoryProductsStockDefinition} from "./UpdateInventoryProductsStock/definition";
import {getInventoryProductsPricesDefinition} from "./GetInventoryProductsPrices/definition";
import {updateInventoryProductsPricesDefinition} from "./UpdateInventoryProductsPrices/definition";
import {getInventoryProductLogsDefinition} from "./GetInventoryProductLogs/definition";
import {runProductMacroTriggerDefinition} from "./RunProductMacroTrigger/definition";

export const productCatalogDefinition: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
			},
		},
		required: true,
		options: [
			// Product catalog
			{
				name: 'Add Inventory Price Group',
				value: ProductCatalogMethod.AddInventoryPriceGroup,
				description: 'The method allows to create a price group in BaseLinker storage. Providing a price group ID will update the existing price group. Such price groups may be later assigned in addInventory method.',
				action: 'Add or updated price group in inventory',
			},
			{
				name: 'Delete Inventory Price Group',
				value: ProductCatalogMethod.DeleteInventoryPriceGroup,
				description: 'The method allows you to remove the price group from BaseLinker storage',
				action: 'Remove the price group from inventory',
			},
			{
				name: 'Get Inventory Price Groups',
				value: ProductCatalogMethod.GetInventoryPriceGroups,
				description: 'The method allows to retrieve price groups existing in BaseLinker storage',
				action: 'Gets list of price groups',
			},
			{
				name: 'Add Inventory Warehouse',
				value: ProductCatalogMethod.AddInventoryWarehouse,
				description: 'The method allows you to add a new warehouse available in BaseLinker catalogues. Adding a warehouse with the same identifier again will cause updates of the previously saved warehouse. The method does not allow editing warehouses created automatically for the purpose of keeping external stocks of shops, wholesalers etc. Such warehouse may be later used in addInventory method.',
				action: 'Add or updated warehouse in catalogues',
			},
			{
				name: 'Delete Inventory Warehouse',
				value: ProductCatalogMethod.DeleteInventoryWarehouse,
				description: 'The method allows you to remove the warehouse available in BaseLinker catalogues. The method does not allow to remove warehouses created automatically for the purpose of keeping external stocks of shops, wholesalers etc.',
				action: 'Remove the warehouse from catalogues',
			},
			{
				name: 'Get Inventory Warehouses',
				value: ProductCatalogMethod.GetInventoryWarehouses,
				description: 'The method allows you to retrieve a list of warehouses available in BaseLinker catalogues. The method also returns information about the warehouses created automatically for the purpose of keeping external stocks (shops, wholesalers etc.).',
				action: 'Gets list of warehouses',
			},
			{
				name: 'Add Inventory',
				value: ProductCatalogMethod.AddInventory,
				description: 'The method allows you to add the BaseLinker catalogs. Adding a catalog with the same identifier again will cause updates of the previously saved catalog.',
				action: 'Add or updated the catalogs',
			},
			{
				name: 'Delete Inventory',
				value: ProductCatalogMethod.DeleteInventory,
				description: 'The method allows you to delete a catalog from BaseLinker storage',
				action: 'Remove the catalog from storage',
			},
			{
				name: 'Get Inventories',
				value: ProductCatalogMethod.GetInventories,
				description: 'The method allows you to retrieve a list of catalogs available in the BaseLinker storage',
				action: 'Gets list of inventories id',
			},
			{
				name: 'Add Inventory Category',
				value: ProductCatalogMethod.AddInventoryCategory,
				description: 'The method allows you to add a category to the BaseLinker catalog. Adding a category with the same identifier again, updates the previously saved category.',
				action: 'Add or updated category in catalog',
			},
			{
				name: 'Delete Inventory Category',
				value: ProductCatalogMethod.DeleteInventoryCategory,
				description: 'The method allows you to remove categories from BaseLinker warehouse. Along with the category, the products contained therein are removed (however, this does not apply to products in subcategories). The subcategories will be changed to the highest level categories.',
				action: 'Remove the category from warehouse',
			},
			{
				name: 'Get Inventory Categories',
				value: ProductCatalogMethod.GetInventoryCategories,
				description: 'The method allows you to retrieve a list of categories for a BaseLinker catalog',
				action: 'Gets list of categories for catalog',
			},
			{
				name: 'Add Inventory Manufacturer',
				value: ProductCatalogMethod.AddInventoryManufacturer,
				description: 'The method allows you to add a manufacturer to the BaseLinker catalog. Adding a manufacturer with the same identifier again, updates the previously saved manufacturer.',
				action: 'Add or updated manufacturer in catalog',
			},
			{
				name: 'Delete Inventory Manufacturer',
				value: ProductCatalogMethod.DeleteInventoryManufacturer,
				description: 'The method allows you to remove manufacturer from BaseLinker catalog',
				action: 'Remove the manufacturer from catalog',
			},
			{
				name: 'Get Inventory Manufacturers',
				value: ProductCatalogMethod.GetInventoryManufacturers,
				description: 'The method allows you to retrieve a list of manufacturers for a BaseLinker catalog',
				action: 'Gets list of manufacturers for catalog',
			},
			{
				name: 'Get Inventory Extra Fields',
				value: ProductCatalogMethod.GetInventoryExtraFields,
				description: 'The method allows you to retrieve a list of extra fields for a BaseLinker catalog',
				action: 'Gets list of extra fields for catalog',
			},
			{
				name: 'Get Inventory Integrations',
				value: ProductCatalogMethod.GetInventoryIntegrations,
				description: 'The method returns a list of integrations where text values in the catalog can be overwritten. The returned data contains a list of accounts for each integration and a list of languages supported by the integration.',
				action: 'Gets list of integrations',
			},
			{
				name: 'Get Inventory Available Text Field Keys',
				value: ProductCatalogMethod.GetInventoryAvailableTextFieldKeys,
				description: 'The method returns a list of product text fields that can be overwritten for specific integration',
				action: 'Gets list of product text fields',
			},
			{
				name: 'Add Inventory Product',
				value: ProductCatalogMethod.AddInventoryProduct,
				description: 'The method allows you to add a new product to BaseLinker catalog. Entering the product with the ID updates previously saved product.',
				action: 'Add a new product to catalog',
			},
			{
				name: 'Delete Inventory Product',
				value: ProductCatalogMethod.DeleteInventoryProduct,
				description: 'The method allows you to remove the product from BaseLinker catalog',
				action: 'Remove the product from catalog',
			},
			{
				name: 'Get Inventory Products Data',
				value: ProductCatalogMethod.GetInventoryProductsData,
				description: 'The method allows you to retrieve detailed data for selected products from the BaseLinker catalogue',
				action: 'Gets detailed data for selected products',
			},
			{
				name: 'Get Inventory Products List',
				value: ProductCatalogMethod.GetInventoryProductsList,
				description: 'Catalog ID. The list of identifiers can be retrieved using the method getInventories.',
				action: 'Gets list of products',
			},
			{
				name: 'Get Inventory Products Stock',
				value: ProductCatalogMethod.GetInventoryProductsStock,
				description: 'The method allows you to retrieve stock data of products from BaseLinker catalogs',
				action: 'Gets stock data of products from catalogs',
			},
			{
				name: 'Update Inventory Products Stock',
				value: ProductCatalogMethod.UpdateInventoryProductsStock,
				description: 'The method allows to update stocks of products (and/or their variants) in BaseLinker catalog. Maximum 1000 products at a time.',
				action: 'Update stocks of products in catalog',
			},
			{
				name: 'Get Inventory Products Prices',
				value: ProductCatalogMethod.GetInventoryProductsPrices,
				description: 'The method allows to retrieve the gross prices of products from BaseLinker catalogues',
				action: 'Gets the gross prices of products from catalogs',
			},
			{
				name: 'Update Inventory Products Prices',
				value: ProductCatalogMethod.UpdateInventoryProductsPrices,
				description: 'The method allows bulk update of gross prices of products (and/or their variants) in the BaseLinker catalog. Maximum 1000 products at a time.',
				action: 'Update of gross prices of products',
			},
			{
				name: 'Get Inventory Product Logs',
				value: ProductCatalogMethod.GetInventoryProductLogs,
				description: 'The method allows to retrieve a list of events related to product change (or their variants) in the BaseLinker catalog',
				action: 'Gets a list of events related to product change in catalog',
			},
			{
				name: 'Run Product Macro Trigger',
				value: ProductCatalogMethod.RunProductMacroTrigger,
				description: 'The method allows you to run personal trigger for products automatic actions',
				action: 'Run personal trigger for products automatic actions',
			}
		],
		default: ProductCatalogMethod.GetInventoryProductsList.toString(),
		noDataExpression: true,
	},
	...addInventoryPriceGroupDefinition,
	...deleteInventoryPriceGroupDefinition,
	...getInventoryPriceGroupsDefinition,
	...addInventoryWarehouseDefinition,
	...deleteInventoryWarehouseDefinition,
	...getInventoryWarehousesDefinition,
	...addInventoryDefinition,
	...deleteInventoryDefinition,
	...getInventoriesDefinition,
	...addInventoryCategoryDefinition,
	...deleteInventoryCategoryDefinition,
	...getInventoryCategoriesDefinition,
	...addInventoryManufacturerDefinition,
	...deleteInventoryManufacturerDefinition,
	...getInventoryManufacturersDefinition,
	...getInventoryExtraFieldsDefinition,
	...getInventoryIntegrationsDefinition,
	...getInventoryAvailableTextFieldKeysDefinition,
	...addInventoryProductDefinition,
	...deleteInventoryProductDefinition,
	...getInventoryProductsDataDefinition,
	...getInventoryProductsListDefinition,
	...getInventoryProductsStockDefinition,
	...updateInventoryProductsStockDefinition,
	...getInventoryProductsPricesDefinition,
	...updateInventoryProductsPricesDefinition,
	...getInventoryProductLogsDefinition,
	...runProductMacroTriggerDefinition,
]
