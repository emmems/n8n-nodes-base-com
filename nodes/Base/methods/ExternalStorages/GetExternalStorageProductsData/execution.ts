import {makeBaseRequest} from "../../request.maker";

export async function getExternalStorageProductsDataExecution(args: {
	apiKey: string;
	input: {
		"storage_id": string,
		"products": Array<number>,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getExternalStorageProductsData',
		input: args.input
	});
}
