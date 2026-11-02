import {makeBaseRequest} from "../../request.maker";

export async function getInventoryProductsDataExecution(args: {
	apiKey: string;
	input: {
		"inventory_id": number,
		"products": Array<number>,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryProductsData',
		input: args.input
	});
}
