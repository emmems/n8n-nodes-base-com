import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getRequestParcelPickupFieldsExecution(args: {
	context: IExecuteFunctions;
	input: {
		"courier_code": string,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getRequestParcelPickupFields',
		input: args.input
	});
}
