import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function getLabelExecution(args: {
	context: IExecuteFunctions;
	input: {
		"courier_code": string,
		"package_id"?: number | null,
		"package_number"?: string | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'getLabel',
		input: args.input
	});
}
