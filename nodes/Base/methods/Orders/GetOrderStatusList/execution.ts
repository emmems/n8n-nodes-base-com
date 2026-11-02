import {makeBaseRequest} from "../../request.maker";

export async function getOrderStatusListExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getOrderStatusList',
	});
}
