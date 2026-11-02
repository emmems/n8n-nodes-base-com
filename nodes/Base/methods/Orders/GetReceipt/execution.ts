import {makeBaseRequest} from "../../request.maker";

export async function getReceiptExecution(args: {
	apiKey: string;
	input: {
		"receipt_id"?: number | null,
		"order_id"?: number | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getReceipt',
		input: args.input
	});
}
