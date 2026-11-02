import {makeBaseRequest} from "../../request.maker";

export async function addInventoryPriceGroupExecution(args: {
	apiKey: string;
	input: {
		"price_group_id"?: number | null;
		"name": string;
		"description": string;
		"currency": string;
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'addInventoryPriceGroup',
		input: args.input
	});
}
