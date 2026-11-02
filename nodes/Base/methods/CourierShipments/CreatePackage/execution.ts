import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function createPackageExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"courier_code": string,
		"account_id"?: number | null,
		"fields"?: Array<Record<string, string>> | null,
		"packages": Array<Record<string, number>>,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'createPackage',
		input: args.input
	});
}
