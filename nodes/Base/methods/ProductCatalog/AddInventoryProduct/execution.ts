import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addInventoryProductExecution(args: {
	context: IExecuteFunctions;
	input: {
		"inventory_id": string,
		"product_id"?: string | null,
		"parent_id"?: string | null,
		"is_bundle"?: boolean | null,
		"ean"?: string | null,
		"sku"?: string | null,
		"tax_rate"?: number | null,
		"weight"?: number | null,
		"height"?: number | null,
		"length"?: number | null,
		"star"?: number | null,
		"manufacturer_id"?: number | null,
		"category_id"?: number | null,
		"prices"?: Record<string, string | number> | null,
		"stock"?: Record<string, string | number> | null,
		"locations"?: Record<string, string | number> | null,
		"text_fields"?: Record<string, string | number | Record<string, string | number>> | null,
		"images"?: Record<string, string | number> | null,
		"links"?: Record<string, string | number | Record<string, string | number>> | null,
		"bundle_products"?: Record<string, string | number> | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'addInventoryProduct',
		input: args.input
	});
}
