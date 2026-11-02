import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function setOrderFieldsExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"admin_comments"?: string | null,
		"user_comments"?: string | null,
		"payment_method"?: string | null,
		"payment_method_cod"?: boolean | null,
		"email"?: string | null,
		"phone"?: string | null,
		"user_login"?: string | null,
		"delivery_method"?: string | null,
		"delivery_price"?: number | null,
		"delivery_fullname"?: string | null,
		"delivery_company"?: string | null,
		"delivery_address"?: string | null,
		"delivery_postcode"?: string | null,
		"delivery_city"?: string | null,
		"delivery_state"?: string | null,
		"delivery_country_code"?: string | null,
		"delivery_point_id"?: string | null,
		"delivery_point_name"?: string | null,
		"delivery_point_address"?: string | null,
		"delivery_point_postcode"?: string | null,
		"delivery_point_city"?: string | null,
		"invoice_fullname"?: string | null,
		"invoice_company"?: string | null,
		"invoice_nip"?: string | null,
		"invoice_address"?: string | null,
		"invoice_postcode"?: string | null,
		"invoice_city"?: string | null,
		"invoice_state"?: string | null,
		"invoice_country_code"?: string | null,
		"want_invoice"?: boolean | null,
		"extra_field_1"?: string | null,
		"extra_field_2"?: string | null,
		"custom_extra_fields"?: Record<string, string | Record<string, string>> | null,
		"pick_state"?: number | null,
		"pack_state"?: number | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'setOrderFields',
		input: args.input
	});
}
