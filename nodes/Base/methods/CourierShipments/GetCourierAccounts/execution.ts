import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getCourierAccountsExecution(args: {
	context: IExecuteFunctions;
	input: {
		"courier_code": string,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getCourierAccounts',
		input: args.input
	});
}
