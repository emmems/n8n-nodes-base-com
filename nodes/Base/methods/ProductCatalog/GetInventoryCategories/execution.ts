import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getInventoryCategoriesExecution(args: {
	context: IExecuteFunctions;
	input: {
		"inventory_id"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getInventoryCategories',
		input: args.input
	});
}
