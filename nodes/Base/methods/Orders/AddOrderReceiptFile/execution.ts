import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addOrderReceiptFileExecution(args: {
	context: IExecuteFunctions;
	input: {
		"receipt_id": number,
		"file": string,
		"external_receipt_number": string,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'addOrderReceiptFile',
		input: args.input
	});
}
