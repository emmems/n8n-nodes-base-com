import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getExternalStorageProductsDataExecution(args: {
	context: IExecuteFunctions;
	input: {
		"storage_id": string,
		"products": Array<number>,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getExternalStorageProductsData',
		input: args.input
	});
}
