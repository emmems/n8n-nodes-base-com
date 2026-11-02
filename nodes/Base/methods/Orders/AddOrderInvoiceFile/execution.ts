import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addOrderInvoiceFileExecution(args: {
	context: IExecuteFunctions;
	input: {
		"invoice_id": number,
		"file": string,
		"external_invoice_number": string,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'addOrderInvoiceFile',
		input: args.input
	});
}
