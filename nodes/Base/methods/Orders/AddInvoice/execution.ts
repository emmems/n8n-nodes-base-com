import {makeBaseRequest} from "../../request.maker";

export async function addInvoiceExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
		"series_id": number,
		"vat_rate"?: number | string | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'addInvoice',
		input: args.input
	});
}
