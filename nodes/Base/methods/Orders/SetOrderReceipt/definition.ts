import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const setOrderReceiptDefinition: INodeProperties[] = [
	{
		displayName: 'Receipt ID',
		name: 'receipt_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.SetOrderReceipt
				],
			},
		},
		default: 0,
		placeholder: '153845',
		description: 'Receipt_id number received in the getNewReceipts method',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.SetOrderReceipt
				],
			},
		},
		default: 0,
		description: 'Receipt printing date (unixtime format)',
		placeholder: '1407341754'
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
					OrdersMethod.SetOrderReceipt
				],
			},
		},
		options: [
			{
				displayName: 'Receipt NR (Optional)',
				name: 'receipt_nr',
				type: 'string',
				default: '',
				description: 'The number of the issued receipt (may be blank if the printer does not return the number)',
			},
			{
				displayName: 'Printer Error (Optional)',
				name: 'printer_error',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: 'Flag indicating whether an error occurred during receipt printing (false by default)',
			},
			{
				displayName: 'Printer Name (Optional)',
				name: 'printer_name',
				type: 'string',
				default: '',
				description: '(optional) Printer name',
			},
		],
	},
];
