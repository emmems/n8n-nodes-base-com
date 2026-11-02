import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addInventoryWarehouseExecution(args: {
	context: IExecuteFunctions;
	input: {
		"warehouse_id"?: number | null;
		"name": string;
		"description": string;
		"stock_edition": boolean;
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'addInventoryWarehouse',
		input: args.input
	});
}
