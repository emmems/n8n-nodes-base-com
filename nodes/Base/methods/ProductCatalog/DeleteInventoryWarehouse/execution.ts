import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryWarehouseExecution(args: {
	context: IExecuteFunctions;
	input: {
		"warehouse_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'deleteInventoryWarehouse',
		input: args.input
	});
}
