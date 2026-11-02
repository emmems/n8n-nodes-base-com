import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const runOrderMacroTriggerDefinition: INodeProperties[] = [
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
					OrdersMethod.RunOrderMacroTrigger
				],
			},
		},
		default: 0,
		placeholder: '143476260',
		description: 'Order identifier from BaseLinker order manager',
	},
	{
		displayName: 'Trigger ID',
		name: 'trigger_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.RunOrderMacroTrigger
				],
			},
		},
		default: 0,
		placeholder: '12413',
		description: 'Identifier of personal trigger from orders automatic actions',
	},
];
