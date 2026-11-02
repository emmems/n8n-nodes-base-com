import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getInventoryExtraFieldsExecution(args: {
	context: IExecuteFunctions;
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getInventoryExtraFields'
	});
}
