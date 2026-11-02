import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getOrdersExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id"?: number | null,
		"date_confirmed_from"?: number | null,
		"date_from"?: number | null,
		"id_from"?: number | null,
		"get_unconfirmed_orders"?: boolean | null,
		"include_custom_extra_fields"?: boolean | null,
		"status_id"?: number | null,
		"filter_email"?: string | null,
		"filter_order_source"?: string | null,
		"filter_order_source_id"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getOrders',
		input: args.input
	});
}
