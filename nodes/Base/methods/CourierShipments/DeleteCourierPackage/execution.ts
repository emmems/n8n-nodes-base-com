import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function deleteCourierPackageExecution(args: {
	context: IExecuteFunctions;
	input: {
		"courier_code": string,
		"package_id"?: number | null,
		"package_number"?: string | null,
		"force_delete"?: boolean | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'deleteCourierPackage',
		input: args.input
	});
}
