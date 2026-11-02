import {makeBaseRequest} from "../../request.maker";

export async function getInventoryProductLogsExecution(args: {
	apiKey: string;
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
		apiKey: args.apiKey,
		methodName: 'getInventoryProductLogs',
		input: args.input
	});
}
