import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryProductExecution(args: {
	apiKey: string;
	input: {
		"product_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'deleteInventoryProduct',
		input: args.input
	});
}
