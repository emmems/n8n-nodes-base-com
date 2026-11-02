import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getJournalListExecution(args: {
	context: IExecuteFunctions;
	input: {
		"last_log_id": number,
		"logs_types": Array<number>,
		"order_id"?: number | null
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getJournalList',
		input: args.input
	});
}
