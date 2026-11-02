import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getExternalStorageProductsPricesExecution(args: {
	context: IExecuteFunctions;
	input: {
		"storage_id": string,
		"page"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getExternalStorageProductsPrices',
		input: args.input
	});
}
