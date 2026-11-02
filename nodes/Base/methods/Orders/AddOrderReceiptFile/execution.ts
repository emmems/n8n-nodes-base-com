import {makeBaseRequest} from "../../request.maker";

export async function addOrderReceiptFileExecution(args: {
	apiKey: string;
	input: {
		"receipt_id": number,
		"file": string,
		"external_receipt_number": string,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'addOrderReceiptFile',
		input: args.input
	});
}
