import {makeBaseRequest} from "../../request.maker";

export async function getOrdersByEmailExecution(args: {
	apiKey: string;
	input: {
		"email": string,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getOrdersByEmail',
		input: args.input
	});
}
