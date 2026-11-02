import {IExecuteFunctions} from "n8n-core";
import {ExternalStoragesMethod} from "../types";
import zod from "zod";

import {getExternalStoragesListExecution} from "./GetExternalStoragesList/execution";
import {getExternalStorageCategoriesExecution} from "./GetExternalStorageCategories/execution";
import {getExternalStorageProductsDataExecution} from "./GetExternalStorageProductsData/execution";
import {getExternalStorageProductsListExecution} from "./GetExternalStorageProductsList/execution";
import {getExternalStorageProductsQuantityExecution} from "./GetExternalStorageProductsQuantity/execution";
import {getExternalStorageProductsPricesExecution} from "./GetExternalStorageProductsPrices/execution";
import {updateExternalStorageProductsQuantityExecution} from "./UpdateExternalStorageProductsQuantity/execution";

export async function externalStoragesExecution(
	data: IExecuteFunctions,
	apiKey: string,
	operation: string,
	category: string,
	i: number,
) {
	if (operation === ExternalStoragesMethod.GetExternalStoragesList) {
		return await getExternalStoragesListExecution({
			apiKey: apiKey,
		})
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageCategories) {
		const schema = zod.object({
			storage_id: zod.string(),
		});

		return await getExternalStorageCategoriesExecution({
			apiKey: apiKey,
			input: schema.parse({
				storage_id: data.getNodeParameter('storage_id', i)?.toString(),
			})
		});
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageProductsData) {
		const schema = zod.object({
			storage_id: zod.string(),
			products: zod.array(zod.number()),
		});

		const metadataArraySchema = zod.array(zod.object({
			product_id: zod.number()
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema,
		})

		const products = metadataObjectSchema.parse(data.getNodeParameter('products', i)).metadataValues?.map(el => el.product_id);

		return await getExternalStorageProductsDataExecution({
			apiKey: apiKey,
			input: schema.parse({
				storage_id: data.getNodeParameter('storage_id', i)?.toString(),
				products
			})
		});
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageProductsList) {
		const schema = zod.object({
			filter_category_id: zod.string().nullish(),
			filter_sort: zod.string().nullish(),
			filter_id: zod.string().nullish(),
			filter_ean: zod.string().nullish(),
			filter_sku: zod.string().nullish(),
			filter_name: zod.string().nullish(),
			filter_price_from: zod.number().nullish(),
			filter_price_to: zod.number().nullish(),
			filter_quantity_from: zod.number().nullish(),
			filter_quantity_to: zod.number().nullish(),
			filter_available: zod.number().nullish(),
			page: zod.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getExternalStorageProductsListExecution({
			apiKey: apiKey,
			input: {
				storage_id: data.getNodeParameter('storage_id', i)?.toString() as string,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageProductsQuantity) {
		const schema = zod.object({
			page: zod.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getExternalStorageProductsQuantityExecution({
			apiKey: apiKey,
			input: {
				storage_id: data.getNodeParameter('storage_id', i)?.toString() as string,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageProductsPrices) {
		const schema = zod.object({
			page: zod.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getExternalStorageProductsPricesExecution({
			apiKey: apiKey,
			input: {
				storage_id: data.getNodeParameter('storage_id', i)?.toString() as string,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ExternalStoragesMethod.UpdateExternalStorageProductsQuantity) {
		const schema = zod.object({
			storage_id: zod.string(),
			products: zod.array(
				zod.array(
					zod.union([
						zod.string(), zod.number()
					])
				)
			),
		});

		const metadataArraySchema = zod.array(zod.object({
			product_id: zod.string(),
			variant_id: zod.number(),
			stock_quantity: zod.number()
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema,
		})

		const products = metadataObjectSchema.parse(data.getNodeParameter('products', i)).metadataValues?.map(el => {
			return [el.product_id, el.variant_id, el.stock_quantity]
		});

		return await updateExternalStorageProductsQuantityExecution({
			apiKey: apiKey,
			input: schema.parse({
				storage_id: data.getNodeParameter('storage_id', i)?.toString(),
				products
			})
		});
	}
}
