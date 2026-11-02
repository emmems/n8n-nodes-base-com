import {makeBaseRequest} from "../../request.maker";

export async function getCourierPackagesStatusHistoryExecution(args: {
	apiKey: string;
	input: {
		"package_ids": Array<number>,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getCourierPackagesStatusHistory',
		input: args.input
	});
}
