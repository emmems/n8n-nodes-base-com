import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function setOrderProductFieldsExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"order_product_id": number,
		"storage"?: string | null,
		"storage_id"?: string | null,
		"product_id"?: string | null,
		"variant_id"?: string | null,
		"auction_id"?: string | null,
		"name"?: string | null,
		"sku"?: string | null,
		"ean"?: string | null,
		"location"?: string | null,
		"warehouse_id"?: number | null,
		"attributes"?: string | null,
		"price_brutto"?: number | null,
		"tax_rate"?: number | null,
		"quantity"?: number | null,
		"weight"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'setOrderProductFields',
		input: args.input
	});
}
