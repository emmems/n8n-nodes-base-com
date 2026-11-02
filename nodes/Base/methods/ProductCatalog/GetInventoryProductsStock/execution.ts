import {makeBaseRequest} from "../../request.maker";

export async function getInventoryProductsStockExecution(args: {
	apiKey: string;
	input: {
		"inventory_id": number,
		"page"?: number | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryProductsStock',
		input: args.input
	});
}
