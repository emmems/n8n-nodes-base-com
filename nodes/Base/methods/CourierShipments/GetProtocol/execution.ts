import {makeBaseRequest} from "../../request.maker";

export async function getProtocolExecution(args: {
	apiKey: string;
	input: {
		"courier_code": string,
		"package_ids"?: Array<number> | null,
		"package_numbers"?: Array<string> | null,
		"account_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getProtocol',
		input: args.input
	});
}
