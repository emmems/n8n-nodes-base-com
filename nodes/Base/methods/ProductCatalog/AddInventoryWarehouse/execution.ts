import {makeBaseRequest} from "../../request.maker";

export async function addInventoryWarehouseExecution(args: {
	apiKey: string;
	input: {
		"warehouse_id"?: number | null;
		"name": string;
		"description": string;
		"stock_edition": boolean;
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'addInventoryWarehouse',
		input: args.input
	});
}
