import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function deleteInventoryManufacturerExecution(args: {
	context: IExecuteFunctions;
	input: {
		"manufacturer_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'deleteInventoryManufacturer',
		input: args.input
	});
}
