import {makeBaseRequest} from "../../request.maker";

export async function addOrderProductExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
		"storage"?: string | null,
		"storage_id"?: string | null,
		"product_id": string,
		"variant_id"?: string | null,
		"auction_id"?: string | null,
		"name"?: string | null,
		"sku"?: string | null,
		"ean"?: string | null,
		"location"?: string | null,
		"warehouse_id"?: number | null,
		"attributes"?: string | null,
		"price_brutto": number,
		"tax_rate": number,
		"quantity": number,
		"weight"?: number | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'addOrderProduct',
		input: args.input
	});
}
