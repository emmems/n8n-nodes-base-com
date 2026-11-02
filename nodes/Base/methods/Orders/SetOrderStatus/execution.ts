import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function setOrderStatusExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"status_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'setOrderStatus',
		input: args.input
	});
}
