import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function setOrderReceiptExecution(args: {
	context: IExecuteFunctions;
	input: {
		"receipt_id": number,
		"receipt_nr"?: string | null,
		"date": number,
		"printer_error"?: boolean | null,
		"printer_name"?: string | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'setOrderReceipt',
		input: args.input
	});
}
