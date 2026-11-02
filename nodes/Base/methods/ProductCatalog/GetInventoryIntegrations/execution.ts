import {makeBaseRequest} from "../../request.maker";

export async function getInventoryIntegrationsExecution(args: {
	apiKey: string;
	input: {
		"inventory_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryIntegrations',
		input: args.input
	});
}
