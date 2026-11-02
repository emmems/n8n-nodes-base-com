import {makeBaseRequest} from "../../request.maker";

export async function getLabelExecution(args: {
	apiKey: string;
	input: {
		"courier_code": string,
		"package_id"?: number | null,
		"package_number"?: string | null,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getLabel',
		input: args.input
	});
}
