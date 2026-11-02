import {makeBaseRequest} from "../../request.maker";

export async function getInventoryExtraFieldsExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryExtraFields'
	});
}
