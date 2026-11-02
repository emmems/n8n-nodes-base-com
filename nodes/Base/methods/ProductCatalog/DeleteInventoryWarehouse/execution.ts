import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryWarehouseExecution(args: {
	apiKey: string;
	input: {
		"warehouse_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'deleteInventoryWarehouse',
		input: args.input
	});
}
