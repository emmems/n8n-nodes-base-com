import {makeBaseRequest} from "../../request.maker";

export async function getOrderTransactionDetailsExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getOrderTransactionDetails',
		input: args.input
	});
}
