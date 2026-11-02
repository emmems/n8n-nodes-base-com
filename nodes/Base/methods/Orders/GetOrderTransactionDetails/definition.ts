import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const getOrderTransactionDetailsDefinition: INodeProperties[] = [
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
					OrdersMethod.GetOrderTransactionDetails
				],
			},
		},
		default: 0,
		placeholder: '3754894',
		description: 'Order Identifier from BaseLinker order manager',
	},
];
