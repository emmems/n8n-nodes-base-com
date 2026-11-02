import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const addOrderInvoiceFileDefinition: INodeProperties[] = [
	{
		displayName: 'Invoice ID',
		name: 'invoice_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.AddOrderInvoiceFile
				],
			},
		},
		default: 0,
		placeholder: '153845',
		description: 'BaseLinker invoice identifier',
	},
	{
		displayName: 'File',
		name: 'file',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.AddOrderInvoiceFile
				],
			},
		},
		default: '',
		description: 'Invoice PDF file in binary format encoded in base64, at the very beginning of the invoice string provide a prefix "data:" e.g. "data:4AAQSkSzkJRgABA[...]"',
		placeholder: 'data:4AAQSkZJRgABA[...]'
	},
	{
		displayName: 'External Invoice Number',
		name: 'external_invoice_number',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.AddOrderInvoiceFile
				],
			},
		},
		default: '',
		description: 'External system invoice number (overwrites BaseLinker invoice number)',
		placeholder: 'FV 101/03/2020'
	},
];
