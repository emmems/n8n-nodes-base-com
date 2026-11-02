import {makeBaseRequest} from "../../request.maker";

export async function requestParcelPickupExecution(args: {
	apiKey: string;
	input: {
		"courier_code": string,
		"package_ids"?: Array<number> | null,
		"package_numbers"?: Array<string> | null,
		"account_id": number,
		"fields"?: Array<Record<string, string>> | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'requestParcelPickup',
		input: args.input
	});
}
