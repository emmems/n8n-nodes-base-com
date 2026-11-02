import {makeBaseRequest} from "../../request.maker";

export async function getOrderPaymentsHistoryExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
		"show_full_history"?: boolean | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getOrderPaymentsHistory',
		input: args.input
	});
}
