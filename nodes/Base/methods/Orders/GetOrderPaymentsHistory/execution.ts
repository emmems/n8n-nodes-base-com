import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getOrderPaymentsHistoryExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"show_full_history"?: boolean | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getOrderPaymentsHistory',
		input: args.input
	});
}
