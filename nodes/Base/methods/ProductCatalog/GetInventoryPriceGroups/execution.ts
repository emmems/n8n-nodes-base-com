import {makeBaseRequest} from "../../request.maker";

export async function getInventoryPriceGroupsExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryPriceGroups',
	});
}
