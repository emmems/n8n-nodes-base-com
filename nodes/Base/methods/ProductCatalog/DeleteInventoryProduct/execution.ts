import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryProductExecution(args: {
	context: IExecuteFunctions;
	input: {
		"product_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'deleteInventoryProduct',
		input: args.input
	});
}
