import {makeBaseRequest} from "../../request.maker";

export async function getInvoicesExecution(args: {
	apiKey: string;
	input: {
		"invoice_id"?: number | null,
		"order_id"?: number | null,
		"date_from"?: number | null,
		"id_from"?: number | null,
		"series_id"?: number | null,
		"get_external_invoices"?: boolean | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInvoices',
		input: args.input
	});
}
