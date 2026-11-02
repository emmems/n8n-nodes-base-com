import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addInventoryPriceGroupExecution(args: {
	context: IExecuteFunctions;
	input: {
		"price_group_id"?: number | null;
		"name": string;
		"description": string;
		"currency": string;
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'addInventoryPriceGroup',
		input: args.input
	});
}
