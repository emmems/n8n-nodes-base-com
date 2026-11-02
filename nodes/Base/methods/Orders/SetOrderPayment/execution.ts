import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function setOrderPaymentExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"payment_done": number,
		"payment_date": number,
		"payment_comment": string,
		"external_payment_id"?: string | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'setOrderPayment',
		input: args.input
	});
}
