import {IExecuteFunctions} from "n8n-workflow";
import {ProductCatalogMethod} from "../types";
import validation from "../validation";
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
import {updateInventoryProductsPricesExecution} from "./UpdateInventoryProductsPrices/execution";
import {getInventoryProductsPricesExecution} from "./GetInventoryProductsPrices/execution";
import {getInventoryProductLogsExecution} from "./GetInventoryProductLogs/execution";
import {runProductMacroTriggerExecution} from "./RunProductMacroTrigger/execution";

export async function productCatalogExecution(
	data: IExecuteFunctions,
	operation: string,
	category: string,
	i: number,
) {
	if (operation === ProductCatalogMethod.AddInventoryPriceGroup) {
		const schema = validation.object({
			price_group_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			name: validation.string(),
			description: validation.string(),
			currency: validation.string(),
		});

		return await addInventoryPriceGroupExecution({
			context: data,
			input: schema.parse({
				price_group_id: data.getNodeParameter('price_group_id', i),
				name: data.getNodeParameter('name', i),
				description: data.getNodeParameter('description', i),
				currency: data.getNodeParameter('currency', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryPriceGroup) {
		const schema = validation.object({
			price_group_id: validation.number(),
		})

		return await deleteInventoryPriceGroupExecution({
			context: data,
			input: schema.parse({
				price_group_id: data.getNodeParameter('price_group_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryPriceGroups) {
		return await getInventoryPriceGroupsExecution({
			context: data,
		});
	}

	if (operation === ProductCatalogMethod.AddInventoryWarehouse) {
		const schema = validation.object({
			warehouse_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			name: validation.string(),
			description: validation.string(),
			stock_edition: validation.boolean(),
		});

		return await addInventoryWarehouseExecution({
			context: data,
			input: schema.parse({
				warehouse_id: data.getNodeParameter('warehouse_id', i),
				name: data.getNodeParameter('name', i),
				description: data.getNodeParameter('description', i),
				stock_edition: data.getNodeParameter('stock_edition', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryWarehouse) {
		const schema = validation.object({
			warehouse_id: validation.number(),
		})

		return await deleteInventoryWarehouseExecution({
			context: data,
			input: schema.parse({
				warehouse_id: data.getNodeParameter('warehouse_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryWarehouses) {
		return await getInventoryWarehousesExecution({
			context: data,
		});
	}

	if (operation === ProductCatalogMethod.AddInventory) {
		const metadataArraySchema = validation.array(validation.object({
			value: validation.union([
				validation.string(), validation.number()
			])
		}))

		const metadataObjectSchema = validation.object({
			metadataValues: metadataArraySchema.optional(),
		})

		const schema = validation.object({
			inventory_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			name: validation.string(),
			description: validation.string(),
			languages: validation.array(validation.union([
				validation.string(), validation.number()
			])),
			default_language: validation.string(),
			price_groups: validation.array(validation.union([
				validation.string(), validation.number()
			])),
			default_price_group: validation.number(),
			warehouses: validation.array(validation.union([
				validation.string(), validation.number()
			])),
			default_warehouse: validation.string(),
			reservations: validation.boolean(),
		})

		const languages = metadataObjectSchema.parse(data.getNodeParameter('languages', i)).metadataValues?.map(el => el.value);
		const price_groups = metadataObjectSchema.parse(data.getNodeParameter('price_groups', i)).metadataValues?.map(el => el.value);
		const warehouses = metadataObjectSchema.parse(data.getNodeParameter('warehouses', i)).metadataValues?.map(el => el.value);

		return await addInventoryExecution({
			context: data,
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
		const schema = validation.object({
			inventory_id: validation.number(),
		})

		return await deleteInventoryExecution({
			context: data,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventories) {
		return await getInventoriesExecution({
			context: data,
		});
	}

	if (operation === ProductCatalogMethod.AddInventoryCategory) {
		const schema = validation.object({
			inventory_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			category_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			name: validation.string(),
			parent_id: validation.number(),
		});

		return await addInventoryCategoryExecution({
			context: data,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
				category_id: data.getNodeParameter('category_id', i),
				name: data.getNodeParameter('name', i),
				parent_id: data.getNodeParameter('parent_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryCategory) {
		const schema = validation.object({
			category_id: validation.number(),
		})

		return await deleteInventoryCategoryExecution({
			context: data,
			input: schema.parse({
				category_id: data.getNodeParameter('category_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryCategories) {
		const schema = validation.object({
			inventory_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
		})

		return await getInventoryCategoriesExecution({
			context: data,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.AddInventoryManufacturer) {
		const schema = validation.object({
			manufacturer_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			name: validation.string(),
		});

		return await addInventoryManufacturerExecution({
			context: data,
			input: schema.parse({
				manufacturer_id: data.getNodeParameter('manufacturer_id', i),
				name: data.getNodeParameter('name', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.DeleteInventoryManufacturer) {
		const schema = validation.object({
			manufacturer_id: validation.number(),
		})

		return await deleteInventoryManufacturerExecution({
			context: data,
			input: schema.parse({
				manufacturer_id: data.getNodeParameter('manufacturer_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryManufacturers) {
		return await getInventoryManufacturersExecution({
			context: data,
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryExtraFields) {
		return await getInventoryExtraFieldsExecution({
			context: data,
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryIntegrations) {
		const schema = validation.object({
			inventory_id: validation.number(),
		})

		return await getInventoryIntegrationsExecution({
			context: data,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryAvailableTextFieldKeys) {
		const schema = validation.object({
			inventory_id: validation.number(),
		})

		return await getInventoryAvailableTextFieldKeysExecution({
			context: data,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.AddInventoryProduct) {
		const metadataArraySchema = validation.array(validation.object({
			name: validation.string(),
			value: validation.union([
				validation.string(),
				validation.number(),
			])
		}))

		const metadataObjectSchema = validation.object({
			metadataValues: metadataArraySchema,
		})

		const metadataArraySchemaForLinks = validation.array(validation.object({
			name: validation.string(),
			value: validation.object({
				metadataValues: validation.object({
					product_id: validation.number(),
					variant_id: validation.number()
				}).transform(item => {
					return {
						['product_id']: item.product_id,
						['variant_id']: item.variant_id
					}
				})
			})
		}))

		const metadataObjectSchemaForLinks = validation.object({
			metadataValues: metadataArraySchemaForLinks,
		})


		const schema = validation.object({
			inventory_id: validation.string(),
			product_id: validation.union([
				validation.string(), validation.null()
			]).optional(),
			parent_id: validation.union([
				validation.string(), validation.null()
			]).optional(),
			is_bundle: validation.union([
				validation.boolean(), validation.null()
			]).optional(),
			ean: validation.union([
				validation.string(), validation.null()
			]).optional(),
			sku: validation.union([
				validation.string(), validation.null()
			]).optional(),
			tax_rate: validation.union([
				validation.number(), validation.null()
			]).optional(),
			weight: validation.union([
				validation.number(), validation.null()
			]).optional(),
			height: validation.union([
				validation.number(), validation.null()
			]).optional(),
			width: validation.union([
				validation.number(), validation.null()
			]).optional(),
			length: validation.union([
				validation.number(), validation.null()
			]).optional(),
			star: validation.union([
				validation.number(), validation.null()
			]).optional(),
			manufacturer_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			category_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			prices: validation.union([
				validation.record(validation.string(), validation.number()), validation.null()
			]).optional(),
			stock: validation.union([
				validation.record(validation.string(), validation.number()), validation.null()
			]).optional(),
			locations: validation.union([
				validation.record(validation.string(), validation.string()), validation.null()
			]).optional(),
			text_fields: validation.union([
				validation.record(validation.string(), validation.union([
					validation.string(),
					validation.record(validation.string(), validation.string())
				])), validation.null()
			]).optional(),
			images: validation.union([
				validation.record(validation.string(), validation.string()), validation.null()
			]).optional(),
			links: validation.union([
				validation.record(validation.string(), validation.record(validation.string(), validation.number())), validation.null()
			]).optional(),
			bundle_products: validation.union([
				validation.record(validation.string(), validation.string()), validation.null()
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
			context: data,
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
				manufacturer_id: additionalFields.manufacturer_id,
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
		const schema = validation.object({
			product_id: validation.number(),
		})

		return await deleteInventoryProductExecution({
			context: data,
			input: schema.parse({
				product_id: data.getNodeParameter('product_id', i),
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryProductsData) {
		const metadataArraySchema = validation.array(validation.object({
			value: validation.union([
				validation.string(), validation.number()
			])
		}))

		const metadataObjectSchema = validation.object({
			metadataValues: metadataArraySchema.optional(),
		})

		const schema = validation.object({
			inventory_id: validation.number(),
			products: validation.array(validation.number()),
		})

		const products = metadataObjectSchema.parse(data.getNodeParameter('products', i)).metadataValues?.map(el => el.value);

		return await getInventoryProductsDataExecution({
			context: data,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i),
				products,
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryProductsList) {
		const schema = validation.object({
			filter_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			filter_category_id: validation.union([
				validation.number(), validation.null()
			]).optional(),
			filter_ean: validation.union([
				validation.string(), validation.null()
			]).optional(),
			filter_sku: validation.union([
				validation.string(), validation.null()
			]).optional(),
			filter_name: validation.union([
				validation.string(), validation.null()
			]).optional(),
			filter_price_from: validation.union([
				validation.number(), validation.null()
			]).optional(),
			filter_price_to: validation.union([
				validation.number(), validation.null()
			]).optional(),
			filter_stock_from: validation.union([
				validation.number(), validation.null()
			]).optional(),
			filter_stock_to: validation.union([
				validation.number(), validation.null()
			]).optional(),
			page: validation.union([
				validation.number(), validation.null()
			]).optional(),
			filter_sort: validation.union([
				validation.string(), validation.null()
			]).optional(),
		});

		const additionalFields = data.getNodeParameter("additionalFields", i);

		return await getInventoryProductsListExecution({
			context: data,
			input: {
				inventory_id: data.getNodeParameter('inventory_id', i) as number,
				...schema.parse(additionalFields)
			}
		});

	}

	if (operation === ProductCatalogMethod.GetInventoryProductsStock) {
		const schema = validation.object({
			page: validation.union([
				validation.number(), validation.null()
			]).optional(),
		});

		const additionalFields = data.getNodeParameter("additionalFields", i);

		return await getInventoryProductsStockExecution({
			context: data,
			input: {
				inventory_id: data.getNodeParameter('inventory_id', i) as number,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ProductCatalogMethod.UpdateInventoryProductsStock) {
		const metadataArraySchemaForProducts = validation.array(validation.object({
			name: validation.string(),
			value: validation.object({
				metadataValues: validation.object({
					warehouse_id: validation.string(),
					stock: validation.number()
				}).transform(item => {
					return {
						[item.warehouse_id]: item.stock
					}
				})
			})
		}))

		const metadataObjectSchemaForProductsStock = validation.object({
			metadataValues: metadataArraySchemaForProducts,
		})

		const schema = validation.object({
			inventory_id: validation.string(),
			products: validation.record(
				validation.string(),
				validation.record(validation.string(), validation.number())
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
			context: data,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i)?.toString(),
				products: preparedObjectForProducts,
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryProductsPrices) {
		const schema = validation.object({
			page: validation.union([
				validation.number(), validation.null()
			]).optional(),
		});

		const additionalFields = data.getNodeParameter("additionalFields", i);

		return await getInventoryProductsPricesExecution({
			context: data,
			input: {
				inventory_id: data.getNodeParameter('inventory_id', i) as number,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ProductCatalogMethod.UpdateInventoryProductsPrices) {
		const metadataArraySchemaForProducts = validation.array(validation.object({
			name: validation.string(),
			value: validation.object({
				metadataValues: validation.object({
					price_group_id: validation.string(),
					price: validation.number()
				}).transform(item => {
					return {
						[item.price_group_id]: item.price
					}
				})
			})
		}))

		const metadataObjectSchemaForProductsPrices = validation.object({
			metadataValues: metadataArraySchemaForProducts,
		})

		const schema = validation.object({
			inventory_id: validation.string(),
			products: validation.record(
				validation.string(),
				validation.record(validation.string(), validation.number())
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

		return await updateInventoryProductsPricesExecution({
			context: data,
			input: schema.parse({
				inventory_id: data.getNodeParameter('inventory_id', i)?.toString(),
				products: preparedObjectForProducts,
			})
		});
	}

	if (operation === ProductCatalogMethod.GetInventoryProductLogs) {
		const schema = validation.object({
			date_from: validation.union([
				validation.number(), validation.null()
			]).optional(),
			date_to: validation.union([
				validation.number(), validation.null()
			]).optional(),
			log_type: validation.union([
				validation.number(), validation.null()
			]).optional(),
			sort: validation.union([
				validation.number(), validation.null()
			]).optional(),
			page: validation.union([
				validation.number(), validation.null()
			]).optional(),
		});

		const additionalFields = data.getNodeParameter("additionalFields", i);

		return await getInventoryProductLogsExecution({
			context: data,
			input: {
				product_id: data.getNodeParameter('product_id', i) as number,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ProductCatalogMethod.RunProductMacroTrigger) {
		const schema = validation.object({
			product_id: validation.number(),
			trigger_id: validation.number(),
		})

		return await runProductMacroTriggerExecution({
			context: data,
			input: schema.parse({
				product_id: data.getNodeParameter('product_id', i),
				trigger_id: data.getNodeParameter('trigger_id', i),
			})
		});
	}
	return undefined;
}
