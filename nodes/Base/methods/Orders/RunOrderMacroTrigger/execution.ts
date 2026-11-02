import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function runOrderMacroTriggerExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"trigger_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'runOrderMacroTrigger',
		input: args.input
	});
}
