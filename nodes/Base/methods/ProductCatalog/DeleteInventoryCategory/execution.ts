import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryCategoryExecution(args: {
	apiKey: string;
	input: {
		"category_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'deleteInventoryCategory',
		input: args.input
	});
}
