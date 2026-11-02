import {makeBaseRequest} from "../../request.maker";

export async function getInventoryProductsPricesExecution(args: {
	apiKey: string;
	input: {
		"inventory_id": number,
		"page"?: number | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryProductsPrices',
		input: args.input
	});
}
