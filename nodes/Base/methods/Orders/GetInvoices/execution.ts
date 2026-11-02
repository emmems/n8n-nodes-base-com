import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getInvoicesExecution(args: {
	context: IExecuteFunctions;
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
		context: args.context,
		methodName: 'getInvoices',
		input: args.input
	});
}
