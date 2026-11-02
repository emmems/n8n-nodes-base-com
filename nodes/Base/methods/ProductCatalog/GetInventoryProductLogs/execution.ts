import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getInventoryProductLogsExecution(args: {
	context: IExecuteFunctions;
	input: {
		"product_id": number,
		"date_from"?: number | null,
		"date_to"?: number | null,
		"log_type"?: number | null,
		"sort"?: number | null,
		"page"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getInventoryProductLogs',
		input: args.input
	});
}
