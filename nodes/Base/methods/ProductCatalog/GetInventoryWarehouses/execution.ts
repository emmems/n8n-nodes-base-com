import {makeBaseRequest} from "../../request.maker";

export async function getInventoryWarehousesExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryWarehouses',
	});
}
