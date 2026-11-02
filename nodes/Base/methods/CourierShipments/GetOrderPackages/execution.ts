import {makeBaseRequest} from "../../request.maker";

export async function getOrderPackagesExecution(args: {
	apiKey: string;
	input: {
		"order_id": number,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getOrderPackages',
		input: args.input
	});
}
