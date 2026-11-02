import {makeBaseRequest} from "../../request.maker";

export async function getExternalStorageCategoriesExecution(args: {
	apiKey: string;
	input: {
		"storage_id": string,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getExternalStorageCategories',
		input: args.input
	});
}
