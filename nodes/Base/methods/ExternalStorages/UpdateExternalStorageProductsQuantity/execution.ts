import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function updateExternalStorageProductsQuantityExecution(args: {
	context: IExecuteFunctions;
	input: {
		"storage_id": string,
		"products": Array<Array<string | number>>
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'updateExternalStorageProductsQuantity',
		input: args.input
	});
}
