import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryPriceGroupExecution(args: {
	apiKey: string;
	input: {
		"price_group_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'deleteInventoryPriceGroup',
		input: args.input
	});
}
