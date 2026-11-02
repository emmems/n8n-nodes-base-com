import {makeBaseRequest} from "../../request.maker";

export async function getCourierFieldsExecution(args: {
	apiKey: string;
	input: {
		"courier_code": string,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getCourierFields',
		input: args.input
	});
}
