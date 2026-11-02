import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getInvoiceFileExecution(args: {
	context: IExecuteFunctions;
	input: {
		"invoice_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getInvoiceFile',
		input: args.input
	});
}
