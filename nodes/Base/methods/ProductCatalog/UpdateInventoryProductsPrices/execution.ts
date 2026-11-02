import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function updateInventoryProductsPricesExecution(args: {
	context: IExecuteFunctions;
	input: {
		"inventory_id": string,
		"products": Record<string, Record<string, number>>,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'updateInventoryProductsPrices',
		input: args.input
	});
}
