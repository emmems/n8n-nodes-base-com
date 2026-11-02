import {IExecuteFunctions} from "n8n-workflow";
import {ExternalStoragesMethod} from "../types";
import validation from "../validation";

import {getExternalStoragesListExecution} from "./GetExternalStoragesList/execution";
import {getExternalStorageCategoriesExecution} from "./GetExternalStorageCategories/execution";
import {getExternalStorageProductsDataExecution} from "./GetExternalStorageProductsData/execution";
import {getExternalStorageProductsListExecution} from "./GetExternalStorageProductsList/execution";
import {getExternalStorageProductsQuantityExecution} from "./GetExternalStorageProductsQuantity/execution";
import {getExternalStorageProductsPricesExecution} from "./GetExternalStorageProductsPrices/execution";
import {updateExternalStorageProductsQuantityExecution} from "./UpdateExternalStorageProductsQuantity/execution";

export async function externalStoragesExecution(
	data: IExecuteFunctions,
	operation: string,
	category: string,
	i: number,
) {
	if (operation === ExternalStoragesMethod.GetExternalStoragesList) {
		return await getExternalStoragesListExecution({
			context: data,
		})
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageCategories) {
		const schema = validation.object({
			storage_id: validation.string(),
		});

		return await getExternalStorageCategoriesExecution({
			context: data,
			input: schema.parse({
				storage_id: data.getNodeParameter('storage_id', i)?.toString(),
			})
		});
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageProductsData) {
		const schema = validation.object({
			storage_id: validation.string(),
			products: validation.array(validation.number()),
		});

		const metadataArraySchema = validation.array(validation.object({
			product_id: validation.number()
		}))

		const metadataObjectSchema = validation.object({
			metadataValues: metadataArraySchema,
		})

		const products = metadataObjectSchema.parse(data.getNodeParameter('products', i)).metadataValues?.map(el => el.product_id);

		return await getExternalStorageProductsDataExecution({
			context: data,
			input: schema.parse({
				storage_id: data.getNodeParameter('storage_id', i)?.toString(),
				products
			})
		});
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageProductsList) {
		const schema = validation.object({
			filter_category_id: validation.string().nullish(),
			filter_sort: validation.string().nullish(),
			filter_id: validation.string().nullish(),
			filter_ean: validation.string().nullish(),
			filter_sku: validation.string().nullish(),
			filter_name: validation.string().nullish(),
			filter_price_from: validation.number().nullish(),
			filter_price_to: validation.number().nullish(),
			filter_quantity_from: validation.number().nullish(),
			filter_quantity_to: validation.number().nullish(),
			filter_available: validation.number().nullish(),
			page: validation.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getExternalStorageProductsListExecution({
			context: data,
			input: {
				storage_id: data.getNodeParameter('storage_id', i)?.toString() as string,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageProductsQuantity) {
		const schema = validation.object({
			page: validation.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getExternalStorageProductsQuantityExecution({
			context: data,
			input: {
				storage_id: data.getNodeParameter('storage_id', i)?.toString() as string,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ExternalStoragesMethod.GetExternalStorageProductsPrices) {
		const schema = validation.object({
			page: validation.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getExternalStorageProductsPricesExecution({
			context: data,
			input: {
				storage_id: data.getNodeParameter('storage_id', i)?.toString() as string,
				...schema.parse(additionalFields)
			}
		});
	}

	if (operation === ExternalStoragesMethod.UpdateExternalStorageProductsQuantity) {
		const schema = validation.object({
			storage_id: validation.string(),
			products: validation.array(
				validation.array(
					validation.union([
						validation.string(), validation.number()
					])
				)
			),
		});

		const metadataArraySchema = validation.array(validation.object({
			product_id: validation.string(),
			variant_id: validation.number(),
			stock_quantity: validation.number()
		}))

		const metadataObjectSchema = validation.object({
			metadataValues: metadataArraySchema,
		})

		const products = metadataObjectSchema.parse(data.getNodeParameter('products', i)).metadataValues?.map(el => {
			return [el.product_id, el.variant_id, el.stock_quantity]
		});

		return await updateExternalStorageProductsQuantityExecution({
			context: data,
			input: schema.parse({
				storage_id: data.getNodeParameter('storage_id', i)?.toString(),
				products
			})
		});
	}
	return undefined;
}
