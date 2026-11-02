import {makeBaseRequest} from "../../request.maker";

export async function createPackageExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
		"courier_code": string,
		"account_id"?: number | null,
		"fields"?: Array<Record<string, string>> | null,
		"packages": Array<Record<string, number>>,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'createPackage',
		input: args.input
	});
}
