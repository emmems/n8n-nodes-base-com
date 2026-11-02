import {makeBaseRequest} from "../../request.maker";

export async function getInventoryManufacturersExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getInventoryManufacturers'
	});
}
