import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getOrderTransactionDetailsExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getOrderTransactionDetails',
		input: args.input
	});
}
