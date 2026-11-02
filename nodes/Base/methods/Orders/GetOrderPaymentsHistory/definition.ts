import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const getOrderPaymentsHistoryDefinition: INodeProperties[] = [
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.GetOrderPaymentsHistory
				],
			},
		},
		default: 0,
		placeholder: '3754894',
		description: 'Order Identifier from BaseLinker order manager',
	},
	{
		displayName: 'Additional Fields (Optional)',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.GetOrderPaymentsHistory
				],
			},
		},
		options: [
			{
				displayName: 'Show Full History (Optional)',
				name: 'show_full_history',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: '(optional, false by default) Download full payment history, including order value change entries, manual order payment edits. False by default - only returns entries containing an external payment identifier (most commonly used).',
			},
		],
	},
];
