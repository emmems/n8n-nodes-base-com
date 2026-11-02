import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryExecution(args: {
	apiKey: string;
	input: {
		"inventory_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'deleteInventory',
		input: args.input
	});
}
