import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getCourierServicesExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"courier_code": string,
		"account_id"?: number | null,
		"fields"?: Array<Record<string, string>> | null,
		"packages"?: Array<Record<string, number>> | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getCourierServices',
		input: args.input
	});
}
