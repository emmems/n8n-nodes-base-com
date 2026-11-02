import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getExternalStorageCategoriesExecution(args: {
	context: IExecuteFunctions;
	input: {
		"storage_id": string,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getExternalStorageCategories',
		input: args.input
	});
}
