import {makeBaseRequest} from "../../request.maker";

export async function getOrderSourcesExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getOrderSources',
	});
}
