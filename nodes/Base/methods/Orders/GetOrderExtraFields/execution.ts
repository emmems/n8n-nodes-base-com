import {makeBaseRequest} from "../../request.maker";

export async function getOrderExtraFieldsExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getOrderExtraFields',
	});
}
