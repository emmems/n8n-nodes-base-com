import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryManufacturerExecution(args: {
	apiKey: string;
	input: {
		"manufacturer_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'deleteInventoryManufacturer',
		input: args.input
	});
}
