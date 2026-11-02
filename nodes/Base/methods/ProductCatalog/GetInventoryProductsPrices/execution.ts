import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getInventoryProductsPricesExecution(args: {
	context: IExecuteFunctions;
	input: {
		"inventory_id": number,
		"page"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getInventoryProductsPrices',
		input: args.input
	});
}
