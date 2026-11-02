import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addInvoiceExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"series_id": number,
		"vat_rate"?: number | string | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'addInvoice',
		input: args.input
	});
}
