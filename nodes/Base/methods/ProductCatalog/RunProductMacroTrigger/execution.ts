import {makeBaseRequest} from "../../request.maker";

export async function runProductMacroTriggerExecution(args: {
	apiKey: string;
	input: {
		"product_id": number;
		"trigger_id": number;
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'runProductMacroTrigger',
		input: args.input
	});
}
