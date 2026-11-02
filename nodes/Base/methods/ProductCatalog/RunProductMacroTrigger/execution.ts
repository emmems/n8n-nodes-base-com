import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function runProductMacroTriggerExecution(args: {
	context: IExecuteFunctions;
	input: {
		"product_id": number;
		"trigger_id": number;
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'runProductMacroTrigger',
		input: args.input
	});
}
