import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getOrdersByPhoneExecution(args: {
	context: IExecuteFunctions;
	input: {
		"phone": string,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getOrdersByPhone',
		input: args.input
	});
}
