import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function createPackageManualExecution(args: {
	context: IExecuteFunctions;
	input: {
		"order_id": number,
		"courier_code": string,
		"package_number": string,
		"pickup_date": number,
		"return_shipment"?: boolean | null,
	};
}) {
	return await makeBaseRequest({
		context: args.context,
		methodName: 'createPackageManual',
		input: args.input
	});
}
