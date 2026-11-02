import {makeBaseRequest} from "../../request.maker";

export async function setOrderStatusExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
		"status_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'setOrderStatus',
		input: args.input
	});
}
