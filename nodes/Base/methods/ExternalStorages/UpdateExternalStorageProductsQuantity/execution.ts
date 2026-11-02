import {makeBaseRequest} from "../../request.maker";

export async function updateExternalStorageProductsQuantityExecution(args: {
	apiKey: string;
	input: {
		"storage_id": string,
		"products": Array<Array<string | number>>
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'updateExternalStorageProductsQuantity',
		input: args.input
	});
}
