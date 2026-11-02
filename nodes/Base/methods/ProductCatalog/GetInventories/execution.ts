import {makeBaseRequest} from "../../request.maker";

export async function getInventoriesExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventories'
	});
}
