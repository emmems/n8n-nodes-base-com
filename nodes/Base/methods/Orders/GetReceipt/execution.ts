import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getReceiptExecution(args: {
	context: IExecuteFunctions;
	input: {
		"receipt_id"?: number | null,
		"order_id"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getReceipt',
		input: args.input
	});
}
