import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getCourierPackagesStatusHistoryExecution(args: {
	context: IExecuteFunctions;
	input: {
		"package_ids": Array<number>,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getCourierPackagesStatusHistory',
		input: args.input
	});
}
