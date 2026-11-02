import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryExecution(args: {
	context: IExecuteFunctions;
	input: {
		"inventory_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'deleteInventory',
		input: args.input
	});
}
