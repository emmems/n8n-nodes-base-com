import {makeBaseRequest} from "../../request.maker";

export async function updateInventoryProductsPricesExecution(args: {
	apiKey: string;
	input: {
		"inventory_id": string,
		"products": Record<string, Record<string, number>>,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'updateInventoryProductsPrices',
		input: args.input
	});
}
