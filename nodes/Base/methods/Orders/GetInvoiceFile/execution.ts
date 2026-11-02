import {makeBaseRequest} from "../../request.maker";

export async function getInvoiceFileExecution(args: {
	apiKey: string;
	input: {
		"invoice_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInvoiceFile',
		input: args.input
	});
}
