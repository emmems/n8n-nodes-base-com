import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryCategoryExecution(args: {
	context: IExecuteFunctions;
	input: {
		"category_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'deleteInventoryCategory',
		input: args.input
	});
}
