import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addInventoryCategoryExecution(args: {
	context: IExecuteFunctions;
	input: {
		"inventory_id"?: number | null;
		"category_id"?: number | null;
		"name": string;
		"parent_id": number;
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'addInventoryCategory',
		input: args.input
	});
}
