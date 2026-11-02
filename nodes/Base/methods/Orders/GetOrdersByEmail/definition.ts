import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const getOrdersByEmailDefinition: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.GetOrdersByEmail
				],
			},
		},
		default: '',
		placeholder: 'test@test.com',
		description: 'The e-mail address we search for in orders',
	},
];
