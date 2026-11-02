import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryPriceGroupExecution(args: {
	context: IExecuteFunctions;
	input: {
		"price_group_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'deleteInventoryPriceGroup',
		input: args.input
	});
}
