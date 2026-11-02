import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getOrdersByEmailExecution(args: {
	context: IExecuteFunctions;
	input: {
		"email": string,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getOrdersByEmail',
		input: args.input
	});
}
