import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getExternalStorageProductsListExecution(args: {
	context: IExecuteFunctions;
	input: {
		"storage_id": string,
		"filter_category_id"?: string | null,
		"filter_sort"?: string | null,
		"filter_id"?: string | null,
		"filter_ean"?: string | null,
		"filter_sku"?: string | null,
		"filter_name"?: string | null,
		"filter_price_from"?: number | null,
		"filter_price_to"?: number | null,
		"filter_quantity_from"?: number | null,
		"filter_quantity_to"?: number | null,
		"filter_available"?: number | null,
		"page"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getExternalStorageProductsList',
		input: args.input,
	});
}
