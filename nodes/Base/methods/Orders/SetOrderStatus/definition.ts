import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const setOrderStatusDefinition: INodeProperties[] = [
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
					OrdersMethod.SetOrderStatus
				],
			},
		},
		default: 0,
		placeholder: '3754894',
		description: 'Order ID number',
	},
	{
		displayName: 'Status ID',
		name: 'status_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.SetOrderStatus
				],
			},
		},
		default: 0,
		description: 'Status ID number. The status list can be retrieved using getOrderStatusList.',
		placeholder: '34562'
	},
];
