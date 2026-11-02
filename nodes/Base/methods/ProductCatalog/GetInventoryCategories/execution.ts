import {makeBaseRequest} from "../../request.maker";

export async function getInventoryCategoriesExecution(args: {
	apiKey: string;
	input: {
		"inventory_id"?: number | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryCategories',
		input: args.input
	});
}
