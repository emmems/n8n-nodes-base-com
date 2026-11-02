import {makeBaseRequest} from "../../request.maker";

export async function getExternalStoragesListExecution(args: {
	apiKey: string;
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'getExternalStoragesList',
	});
}
