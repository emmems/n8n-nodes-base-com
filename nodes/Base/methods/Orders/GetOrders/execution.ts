import {makeBaseRequest} from "../../request.maker";

export async function getOrdersExecution(args: {
	apiKey: string;
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
		apiKey: args.apiKey,
		methodName: 'getOrders',
		input: args.input
	});
}
