import {makeBaseRequest} from "../../request.maker";

export async function getOrdersByPhoneExecution(args: {
	apiKey: string;
	input: {
		"phone": string,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getOrdersByPhone',
		input: args.input
	});
}
