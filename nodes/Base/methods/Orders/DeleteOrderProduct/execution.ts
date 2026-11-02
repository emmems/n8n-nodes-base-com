import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function deleteOrderProductExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"order_product_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'deleteOrderProduct',
		input: args.input
	});
}
