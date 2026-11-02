import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function requestParcelPickupExecution(args: {
	context: IExecuteFunctions;
	input: {
		"courier_code": string,
		"package_ids"?: Array<number> | null,
		"package_numbers"?: Array<string> | null,
		"account_id": number,
		"fields"?: Array<Record<string, string>> | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'requestParcelPickup',
		input: args.input
	});
}
