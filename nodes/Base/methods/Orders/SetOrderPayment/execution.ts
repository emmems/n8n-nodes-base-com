import {makeBaseRequest} from "../../request.maker";

export async function setOrderPaymentExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
		"payment_done": number,
		"payment_date": number,
		"payment_comment": string,
		"external_payment_id"?: string | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'setOrderPayment',
		input: args.input
	});
}
