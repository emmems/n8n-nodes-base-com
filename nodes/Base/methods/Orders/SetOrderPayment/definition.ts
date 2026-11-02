import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const setOrderPaymentDefinition: INodeProperties[] = [
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
					OrdersMethod.SetOrderPayment
				],
			},
		},
		default: 0,
		placeholder: '3754894',
		description: 'Order ID number',
	},
	{
		displayName: 'Payment Done',
		name: 'payment_done',
		type: 'number',
		typeOptions: {
			numberPrecision: 2,
		},
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.SetOrderPayment
				],
			},
		},
		default: 0,
		description: 'The amount of the payment. The value changes the current payment in the order (not added to the previous value). If the amount matches the order value, the order will be marked as paid.',
		placeholder: '120.57'
	},
	{
		displayName: 'Payment Date',
		name: 'payment_date',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.SetOrderPayment
				],
			},
		},
		default: 0,
		placeholder: '1444736731',
		description: 'Payment date unixtime',
	},
	{
		displayName: 'Payment Comment',
		name: 'payment_comment',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.SetOrderPayment
				],
			},
		},
		default: '',
		placeholder: 'bank transfer mBank 12.10.2015',
		description: 'Payments commentary',
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
					OrdersMethod.SetOrderPayment
				],
			},
		},
		options: [
			{
				displayName: 'External Payment ID (Optional)',
				name: 'external_payment_id',
				type: 'string',
				default: '',
				description: '(optional) External payment identifier',
			},
		],
	},
];
