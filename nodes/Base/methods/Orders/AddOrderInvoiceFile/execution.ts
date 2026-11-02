import {makeBaseRequest} from "../../request.maker";

export async function addOrderInvoiceFileExecution(args: {
	apiKey: string;
	input: {
		"invoice_id": number,
		"file": string,
		"external_invoice_number": string,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'addOrderInvoiceFile',
		input: args.input
	});
}
