import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BaseComApi implements ICredentialType {
	name = 'baseComApi';
	documentationUrl = 'https://api.baselinker.com/';
	displayName = 'Base API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API token generated in Base: Account & other → My account → API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				"X-BLToken": '={{$credentials.apiKey}}'
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.baselinker.com',
			url: '/connector.php',
			body: 'method=getInventories',
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'status',
					value: 'ERROR',
					message: 'Incorrect API Key'
				}
			}
		]
	};
}
