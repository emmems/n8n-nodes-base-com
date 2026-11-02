import {makeBaseRequest} from "../../request.maker";

export async function runOrderMacroTriggerExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
		"trigger_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'runOrderMacroTrigger',
		input: args.input
	});
}
