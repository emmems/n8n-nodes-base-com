import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getOrderExtraFieldsExecution(args: {
	context: IExecuteFunctions;
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getOrderExtraFields',
	});
}
