import {makeBaseRequest} from "../../request.maker";

export async function setOrderReceiptExecution(args: {
	apiKey: string;
	input: {
		"receipt_id": number,
		"receipt_nr"?: string | null,
		"date": number,
		"printer_error"?: boolean | null,
		"printer_name"?: string | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'setOrderReceipt',
		input: args.input
	});
}
