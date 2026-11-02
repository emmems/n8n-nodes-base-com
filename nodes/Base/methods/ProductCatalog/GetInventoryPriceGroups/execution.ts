import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getInventoryPriceGroupsExecution(args: {
	context: IExecuteFunctions;
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getInventoryPriceGroups',
	});
}
