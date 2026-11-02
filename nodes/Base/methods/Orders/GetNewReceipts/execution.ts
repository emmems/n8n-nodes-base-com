import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getNewReceiptsExecution(args: {
	context: IExecuteFunctions;
	input: {
		"series_id"?: number | null,
		"id_from"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getNewReceipts',
		input: args.input
	});
}
