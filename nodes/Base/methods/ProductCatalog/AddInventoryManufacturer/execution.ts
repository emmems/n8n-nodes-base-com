import {makeBaseRequest} from "../../request.maker";

export async function addInventoryManufacturerExecution(args: {
	apiKey: string;
	input: {
		"manufacturer_id"?: number | null;
		"name": string;
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'addInventoryManufacturer',
		input: args.input
	});
}
