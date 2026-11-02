import {makeBaseRequest} from "../../request.maker";

export async function getSeriesExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getSeries',
	});
}
