import { IDataObject, IExecuteFunctions, JsonObject, NodeApiError } from 'n8n-workflow';

export async function makeBaseRequest(args: {
	context: IExecuteFunctions;
	methodName: string;
	input?: Record<string, unknown>;
}): Promise<IDataObject> {
	const body = new URLSearchParams();
	body.set('method', args.methodName);
	if (args.input != null) body.set('parameters', JSON.stringify(args.input));

	const response = (await args.context.helpers.httpRequestWithAuthentication.call(
		args.context,
		'baseComApi',
		{
			url: 'https://api.baselinker.com/connector.php',
			method: 'POST',
			body: body.toString(),
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			json: true,
			returnFullResponse: false,
		},
	)) as IDataObject;

	if (response.status === 'ERROR') {
		throw new NodeApiError(args.context.getNode(), response as JsonObject, {
			message: typeof response.error_message === 'string' ? response.error_message : 'Base API request failed',
			description: typeof response.error_code === 'string' ? response.error_code : undefined,
		});
	}

	return response;
}
