import {makeBaseRequest} from "../../request.maker";

export async function getCouriersListExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getCouriersList',
	});
}
