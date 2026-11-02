import {IExecuteFunctions} from "n8n-core";
import {ProductCatalogMethod} from "../types";
import zod from "zod";
import {addInventoryPriceGroupExecution} from "./AddInventoryPriceGroup/execution";
import {deleteInventoryPriceGroupExecution} from "./DeleteInventoryPriceGroup/execution";
import {getInventoryPriceGroupsExecution} from "./GetInventoryPriceGroups/execution";
import {addInventoryWarehouseExecution} from "./AddInventoryWarehouse/execution";
import {deleteInventoryWarehouseExecution} from "./DeleteInventoryWarehouse/execution";
import {getInventoryWarehousesExecution} from "./GetInventoryWarehouses/execution";
import {addInventoryExecution} from "./AddInventory/execution";
import {deleteInventoryExecution} from "./DeleteInventory/execution";
import {getInventoriesExecution} from "./GetInventories/execution";
import {addInventoryCategoryExecution} from "./AddInventoryCategory/execution";
import {deleteInventoryCategoryExecution} from "./DeleteInventoryCategory/execution";
import {getInventoryCategoriesExecution} from "./GetInventoryCategories/execution";
import {addInventoryManufacturerExecution} from "./AddInventoryManufacturer/execution";
import {deleteInventoryManufacturerExecution} from "./DeleteInventoryManufacturer/execution";
import {getInventoryManufacturersExecution} from "./GetInventoryManufacturers/execution";
import {getInventoryExtraFieldsExecution} from "./GetInventoryExtraFields/execution";
import {getInventoryIntegrationsExecution} from "./GetInventoryIntegrations/execution";
import {getInventoryAvailableTextFieldKeysExecution} from "./GetInventoryAvailableTextFieldKeys/execution";
import {addInventoryProductExecution} from "./AddInventoryProduct/execution";
import {deleteInventoryProductExecution} from "./DeleteInventoryProduct/execution";
import {getInventoryProductsDataExecution} from "./GetInventoryProductsData/execution";
import {getInventoryProductsListExecution} from "./GetInventoryProductsList/execution";
import {getInventoryProductsStockExecution} from "./GetInventoryProductsStock/execution";
import {updateInventoryProductsStockExecution} from "./UpdateInventoryProductsStock/execution";
import {getInventoryProductsPricesExecution} from "./GetInventoryProductsPrices/execution";
import {getInventoryProductLogsExecution} from "./GetInventoryProductLogs/execution";
import {runProductMacroTriggerExecution} from "./RunProductMacroTrigger/execution";

export async function productCatalogExecution(
	data: IExecuteFunctions,
	apiKey: string,
	operation: string,
	category: string,
	i: number,
) {
	if (operation === ProductCatalogMethod.AddInventoryPriceGroup) {
		const schema = zod.object({
			price_group_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			name: zod.string(),
			description: zod.string(),
			currency: zod.string(),
		});

		return await addInventoryPriceGroupExecution({
			apiKey: apiKey,
			input: schema.parse({
				price_group_id: data.getNodeParameter('price_group_id', i),
				name: data.getNodeParameter('name', i),
				description: data.getNodeParameter('description', i),
				currency: data.getNodeParameter('currency', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryPriceGroup) {
		const schema = zod.object({
			price_group_id: zod.number(),
		})

		return await deleteInventoryPriceGroupExecution({
			apiKey: apiKey,
			input: schema.parse({
				price_group_id: data.getNodeParameter('price_group_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryPriceGroups) {
		return await getInventoryPriceGroupsExecution({
			apiKey: apiKey
		});
	}

	if (operation === ProductCatalogMethod.AddInventoryWarehouse) {
		const schema = zod.object({
			warehouse_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			name: zod.string(),
			description: zod.string(),
			stock_edition: zod.boolean(),
		});

		return await addInventoryWarehouseExecution({
			apiKey: apiKey,
			input: schema.parse({
				warehouse_id: data.getNodeParameter('warehouse_id', i),
				name: data.getNodeParameter('name', i),
				description: data.getNodeParameter('description', i),
				stock_edition: data.getNodeParameter('stock_edition', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryWarehouse) {
		const schema = zod.object({
			warehouse_id: zod.number(),
		})

		return await deleteInventoryWarehouseExecution({
			apiKey: apiKey,
			input: schema.parse({
				warehouse_id: data.getNodeParameter('warehouse_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryWarehouses) {
		return await getInventoryWarehousesExecution({
			apiKey: apiKey
		});
	}

	if (operation === ProductCatalogMethod.AddInventory) {
		const metadataArraySchema = zod.array(zod.object({
			value: zod.union([
				zod.string(), zod.number()
			])
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema.optional(),
		})

		const schema = zod.object({
			inventory_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			name: zod.string(),
			description: zod.string(),
			languages: zod.array(zod.union([
				zod.string(), zod.number()
			])),
			default_language: zod.string(),
			price_groups: zod.array(zod.union([
				zod.string(), zod.number()
			])),
			default_price_group: zod.number(),
			warehouses: zod.array(zod.union([
				zod.string(), zod.number()
			])),
			default_warehouse: zod.string(),
			reservations: zod.boolean(),
		})

		const languages = metadataObjectSchema.parse(data.getNodeParameter('languages', i)).metadataValues?.map(el => el.value);
		const price_groups = metadataObjectSchema.parse(data.getNodeParameter('price_groups', i)).metadataValues?.map(el => el.value);
		const warehouses = metadataObjectSchema.parse(data.getNodeParameter('warehouses', i)).metadataValues?.map(el => el.value);

		return await addInventoryExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
				name: data.getNodeParameter('name', i),
				description: data.getNodeParameter('description', i),
				languages,
				default_language: data.getNodeParameter('default_language', i),
				price_groups,
				default_price_group: data.getNodeParameter('default_price_group', i),
				warehouses,
				default_warehouse: data.getNodeParameter('default_warehouse', i),
				reservations: data.getNodeParameter('reservations', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventory) {
		const schema = zod.object({
			inventory_id: zod.number(),
		})

		return await deleteInventoryExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventories) {
		return await getInventoriesExecution({
			apiKey: apiKey
		});
	}

	if (operation === ProductCatalogMethod.AddInventoryCategory) {
		const schema = zod.object({
			inventory_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			category_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			name: zod.string(),
			parent_id: zod.number(),
		});

		return await addInventoryCategoryExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
				category_id: data.getNodeParameter('category_id', i),
				name: data.getNodeParameter('name', i),
				parent_id: data.getNodeParameter('parent_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryCategory) {
		const schema = zod.object({
			category_id: zod.number(),
		})

		return await deleteInventoryCategoryExecution({
			apiKey: apiKey,
			input: schema.parse({
				category_id: data.getNodeParameter('category_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryCategories) {
		const schema = zod.object({
			inventory_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
		})

		return await getInventoryCategoriesExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.AddInventoryManufacturer) {
		const schema = zod.object({
			manufacturer_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			name: zod.string(),
		});

		return await addInventoryManufacturerExecution({
			apiKey: apiKey,
			input: schema.parse({
				manufacturer_id: data.getNodeParameter('manufacturer_id', i),
				name: data.getNodeParameter('name', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryManufacturer) {
		const schema = zod.object({
			manufacturer_id: zod.number(),
		})

		return await deleteInventoryManufacturerExecution({
			apiKey: apiKey,
			input: schema.parse({
				manufacturer_id: data.getNodeParameter('manufacturer_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryManufacturers) {
		return await getInventoryManufacturersExecution({
			apiKey: apiKey
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryExtraFields) {
		return await getInventoryExtraFieldsExecution({
			apiKey: apiKey
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryIntegrations) {
		const schema = zod.object({
			inventory_id: zod.number(),
		})

		return await getInventoryIntegrationsExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryAvailableTextFieldKeys) {
		const schema = zod.object({
			inventory_id: zod.number(),
		})

		return await getInventoryAvailableTextFieldKeysExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.AddInventoryProduct) {
		const metadataArraySchema = zod.array(zod.object({
			name: zod.string(),
			value: zod.union([
				zod.string(),
				zod.number(),
			])
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema,
		})

		const metadataArraySchemaForLinks = zod.array(zod.object({
			name: zod.string(),
			value: zod.object({
				metadataValues: zod.object({
					product_id: zod.number(),
					variant_id: zod.number()
				}).transform(item => {
					return {
						['product_id']: item.product_id,
						['variant_id']: item.variant_id
					}
				})
			})
		}))

		const metadataObjectSchemaForLinks = zod.object({
			metadataValues: metadataArraySchemaForLinks,
		})


		const schema = zod.object({
			inventory_id: zod.string(),
			product_id: zod.union([
				zod.string(), zod.null()
			]).optional(),
			parent_id: zod.union([
				zod.string(), zod.null()
			]).optional(),
			is_bundle: zod.union([
				zod.boolean(), zod.null()
			]).optional(),
			ean: zod.union([
				zod.string(), zod.null()
			]).optional(),
			sku: zod.union([
				zod.string(), zod.null()
			]).optional(),
			tax_rate: zod.union([
				zod.number(), zod.null()
			]).optional(),
			weight: zod.union([
				zod.number(), zod.null()
			]).optional(),
			height: zod.union([
				zod.number(), zod.null()
			]).optional(),
			width: zod.union([
				zod.number(), zod.null()
			]).optional(),
			length: zod.union([
				zod.number(), zod.null()
			]).optional(),
			star: zod.union([
				zod.number(), zod.null()
			]).optional(),
			manufacturer_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			category_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			prices: zod.union([
				zod.record(zod.string(), zod.number()), zod.null()
			]).optional(),
			stock: zod.union([
				zod.record(zod.string(), zod.number()), zod.null()
			]).optional(),
			locations: zod.union([
				zod.record(zod.string(), zod.string()), zod.null()
			]).optional(),
			text_fields: zod.union([
				zod.record(zod.string(), zod.union([
					zod.string(),
					zod.record(zod.string(), zod.string())
				])), zod.null()
			]).optional(),
			images: zod.union([
				zod.record(zod.string(), zod.string()), zod.null()
			]).optional(),
			links: zod.union([
				zod.record(zod.string(), zod.record(zod.string(), zod.number())), zod.null()
			]).optional(),
			bundle_products: zod.union([
				zod.record(zod.string(), zod.string()), zod.null()
			]).optional()
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		let preparedObjectForPrices = undefined;
		let preparedObjectForStock = undefined;
		let preparedObjectForLocations = undefined;
		let preparedObjectForTextFields = undefined;
		let preparedObjectForTextFieldFeatures = undefined;
		let preparedObjectForImages = undefined;
		let preparedObjectForLinks = undefined;
		let preparedObjectForBundleProducts = undefined;

		if (additionalFields.prices !== undefined) {
			preparedObjectForPrices = metadataObjectSchema.parse(additionalFields.prices).metadataValues?.reduce((prev: {
				[x: string]: string | number;
			}, curr: { name: string; value: string | number; }) => {
				prev[curr.name] = curr.value
				return prev;
			}, {})
		}
		if (additionalFields.stock !== undefined) {
			preparedObjectForStock = metadataObjectSchema.parse(additionalFields.stock).metadataValues?.reduce((prev: {
				[x: string]: string | number;
			}, curr: { name: string; value: string | number; }) => {
				prev[curr.name] = curr.value
				return prev;
			}, {})
		}
		if (additionalFields.locations !== undefined) {
			preparedObjectForLocations = metadataObjectSchema.parse(additionalFields.locations).metadataValues?.reduce((prev: {
				[x: string]: string | number;
			}, curr: { name: string; value: string | number; }) => {
				prev[curr.name] = curr.value
				return prev;
			}, {})
		}
		if (additionalFields.text_fields !== undefined) {
			preparedObjectForTextFields = metadataObjectSchema.parse(additionalFields.text_fields).metadataValues?.reduce((prev: {
				[x: string]: string | number;
			}, curr: { name: string; value: string | number; }) => {
				prev[curr.name] = curr.value
				return prev;
			}, {})
		}
		if (additionalFields.text_field_features !== undefined) {
			preparedObjectForTextFieldFeatures = metadataObjectSchema.parse(additionalFields.text_field_features).metadataValues?.reduce((prev: {
				[x: string]: string | number;
			}, curr: { name: string; value: string | number; }) => {
				prev[curr.name] = curr.value
				return prev;
			}, {})
		}
		if (additionalFields.images !== undefined) {
			let preparedArrayForImages = metadataObjectSchema.parse(additionalFields.images).metadataValues.map(item => {
				if (typeof item.value === 'string') {
					if (item.value.startsWith('http')) {
						item.value = `url:${item.value}`;
					}
				}
				return item;
			});

			preparedObjectForImages = preparedArrayForImages?.reduce((prev: { [x: string]: string | number; }, curr: {
				name: string;
				value: string | number;
			}) => {
				prev[curr.name] = curr.value
				return prev;
			}, {})
		}
		if (additionalFields.links !== undefined) {
			preparedObjectForLinks = metadataObjectSchemaForLinks.parse(additionalFields.links).metadataValues?.reduce((prev, curr) => {
				prev[curr.name] = curr.value.metadataValues
				return prev;
			}, {} as Record<string, { [key: string]: number | undefined }>)
		}

		let text_fields = undefined;
		if (preparedObjectForTextFields !== undefined && preparedObjectForTextFieldFeatures !== undefined) {
			text_fields = {
				...preparedObjectForTextFields,
				...preparedObjectForTextFieldFeatures
			}
		} else if (preparedObjectForTextFields !== undefined) {
			text_fields = {
				...preparedObjectForTextFields
			}
		}

		if (additionalFields.is_bundle) {
			if (additionalFields.bundle_products !== undefined) {
				preparedObjectForBundleProducts = metadataObjectSchema.parse(additionalFields.bundle_products).metadataValues?.reduce((prev: {
					[x: string]: string | number;
				}, curr: { name: string; value: string | number; }) => {
					prev[curr.name] = curr.value
					return prev;
				}, {})
			}
		}

		return await addInventoryProductExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
				product_id: additionalFields.product_id,
				parent_id: additionalFields.parent_id,
				is_bundle: additionalFields.is_bundle,
				ean: additionalFields.ean,
				sku: additionalFields.sku,
				tax_rate: additionalFields.tax_rate,
				weight: additionalFields.weight,
				height: additionalFields.height,
				width: additionalFields.width,
				length: additionalFields.length,
				star: additionalFields.star,
				manufacturer_id: additionalFields.manufacture_id,
				category_id: additionalFields.category_id,
				prices: preparedObjectForPrices,
				stock: preparedObjectForStock,
				locations: preparedObjectForLocations,
				text_fields: text_fields,
				images: preparedObjectForImages,
				links: preparedObjectForLinks,
				bundle_products: preparedObjectForBundleProducts,
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryProduct) {
		const schema = zod.object({
			product_id: zod.number(),
		})

		return await deleteInventoryProductExecution({
			apiKey: apiKey,
			input: schema.parse({
				product_id: data.getNodeParameter('product_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryProductsData) {
		const metadataArraySchema = zod.array(zod.object({
			value: zod.union([
				zod.string(), zod.number()
			])
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema.optional(),
		})

		const schema = zod.object({
			inventory_id: zod.number(),
			products: zod.array(zod.number()),
		})

		const products = metadataObjectSchema.parse(data.getNodeParameter('products', i)).metadataValues?.map(el => el.value);

		return await getInventoryProductsDataExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
				products,
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryProductsList) {
		const schema = zod.object({
			filter_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			filter_category_id: zod.union([
				zod.number(), zod.null()
			]).optional(),
			filter_ean: zod.union([
				zod.string(), zod.null()
			]).optional(),
			filter_sku: zod.union([
				zod.string(), zod.null()
			]).optional(),
			filter_name: zod.union([
				zod.string(), zod.null()
			]).optional(),
			filter_price_from: zod.union([
				zod.number(), zod.null()
			]).optional(),
			filter_price_to: zod.union([
				zod.number(), zod.null()
			]).optional(),
			filter_stock_from: zod.union([
				zod.number(), zod.null()
			]).optional(),
			filter_stock_to: zod.union([
				zod.number(), zod.null()
			]).optional(),
			page: zod.union([
				zod.number(), zod.null()
			]).optional(),
			filter_sort: zod.union([
				zod.string(), zod.null()
			]).optional(),
		});

		const additionalFields = data.getNodeParameter("additionalFields", i);

		return await getInventoryProductsListExecution({
			apiKey: apiKey,
			input: {
				inventory_id: data.getNodeParameter('inventory_id', i) as number,
				...schema.parse(additionalFields)
			}
		});

	}

	if (operation === ProductCatalogMethod.GetInventoryProductsStock) {
		const schema = zod.object({
			page: zod.union([
				zod.number(), zod.null()
			]).optional(),
		});

		const additionalFields = data.getNodeParameter("additionalFields", i);

		return await getInventoryProductsStockExecution({
			apiKey: apiKey,
			input: {
				inventory_id: data.getNodeParameter('inventory_id', i) as number,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ProductCatalogMethod.UpdateInventoryProductsStock) {
		const metadataArraySchemaForProducts = zod.array(zod.object({
			name: zod.string(),
			value: zod.object({
				metadataValues: zod.object({
					warehouse_id: zod.string(),
					stock: zod.number()
				}).transform(item => {
					return {
						[item.warehouse_id]: item.stock
					}
				})
			})
		}))

		const metadataObjectSchemaForProductsStock = zod.object({
			metadataValues: metadataArraySchemaForProducts,
		})

		const schema = zod.object({
			inventory_id: zod.string(),
			products: zod.record(
				zod.string(),
				zod.record(zod.string(), zod.number())
			)
		})

		let preparedObjectForProducts = undefined;
		const products = data.getNodeParameter('products', i);
		if (products !== undefined) {
			preparedObjectForProducts = metadataObjectSchemaForProductsStock.parse(products).metadataValues?.reduce((prev, curr) => {
				prev[curr.name] = curr.value.metadataValues
				return prev;
			}, {} as Record<string, { [key: string]: number | undefined }>)
		}

		return await updateInventoryProductsStockExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i)?.toString(),
				products: preparedObjectForProducts,
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryProductsPrices) {
		const schema = zod.object({
			page: zod.union([
				zod.number(), zod.null()
			]).optional(),
		});

		const additionalFields = data.getNodeParameter("additionalFields", i);

		return await getInventoryProductsPricesExecution({
			apiKey: apiKey,
			input: {
				inventory_id: data.getNodeParameter('inventory_id', i) as number,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ProductCatalogMethod.UpdateInventoryProductsPrices) {
		const metadataArraySchemaForProducts = zod.array(zod.object({
			name: zod.string(),
			value: zod.object({
				metadataValues: zod.object({
					price_group_id: zod.string(),
					price: zod.number()
				}).transform(item => {
					return {
						[item.price_group_id]: item.price
					}
				})
			})
		}))

		const metadataObjectSchemaForProductsPrices = zod.object({
			metadataValues: metadataArraySchemaForProducts,
		})

		const schema = zod.object({
			inventory_id: zod.string(),
			products: zod.record(
				zod.string(),
				zod.record(zod.string(), zod.number())
			)
		})

		let preparedObjectForProducts = undefined;
		const products = data.getNodeParameter('products', i);
		if (products !== undefined) {
			preparedObjectForProducts = metadataObjectSchemaForProductsPrices.parse(products).metadataValues?.reduce((prev, curr) => {
				prev[curr.name] = curr.value.metadataValues
				return prev;
			}, {} as Record<string, { [key: string]: number | undefined }>)
		}

		return await updateInventoryProductsStockExecution({
			apiKey: apiKey,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i)?.toString(),
				products: preparedObjectForProducts,
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryProductLogs) {
		const schema = zod.object({
			date_from: zod.union([
				zod.number(), zod.null()
			]).optional(),
			date_to: zod.union([
				zod.number(), zod.null()
			]).optional(),
			log_type: zod.union([
				zod.number(), zod.null()
			]).optional(),
			sort: zod.union([
				zod.number(), zod.null()
			]).optional(),
			page: zod.union([
				zod.number(), zod.null()
			]).optional(),
		});

		const additionalFields = data.getNodeParameter("additionalFields", i);

		return await getInventoryProductLogsExecution({
			apiKey: apiKey,
			input: {
				product_id: data.getNodeParameter('product_id', i) as number,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ProductCatalogMethod.RunProductMacroTrigger) {
		const schema = zod.object({
			product_id: zod.number(),
			trigger_id: zod.number(),
		})

		return await runProductMacroTriggerExecution({
			apiKey: apiKey,
			input: schema.parse({
				product_id: data.getNodeParameter('product_id', i),
				trigger_id: data.getNodeParameter('product_id', i),
			})
		});
	}
}
