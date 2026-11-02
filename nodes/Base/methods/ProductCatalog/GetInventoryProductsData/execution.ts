import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getInventoryProductsDataExecution(args: {
	context: IExecuteFunctions;
	input: {
		"inventory_id": number,
		"products": Array<number>,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getInventoryProductsData',
		input: args.input
	});
}
