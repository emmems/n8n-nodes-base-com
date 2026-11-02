import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getProtocolExecution(args: {
	context: IExecuteFunctions;
	input: {
		"courier_code": string,
		"package_ids"?: Array<number> | null,
		"package_numbers"?: Array<string> | null,
		"account_id": number,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getProtocol',
		input: args.input
	});
}
