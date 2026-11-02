import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function setOrderStatusesExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_ids": Array<number>,
		"status_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'setOrderStatuses',
		input: args.input
	});
}
