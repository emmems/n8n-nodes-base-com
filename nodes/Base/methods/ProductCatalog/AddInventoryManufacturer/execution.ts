import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addInventoryManufacturerExecution(args: {
	context: IExecuteFunctions;
	input: {
		"manufacturer_id"?: number | null;
		"name": string;
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'addInventoryManufacturer',
		input: args.input
	});
}
