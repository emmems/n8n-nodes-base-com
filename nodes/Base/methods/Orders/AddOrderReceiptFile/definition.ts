import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const addOrderReceiptFileDefinition: INodeProperties[] = [
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
					OrdersMethod.AddOrderReceiptFile
				],
			},
		},
		default: 0,
		placeholder: '153845',
		description: 'BaseLinker receipt identifier',
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
					OrdersMethod.AddOrderReceiptFile
				],
			},
		},
		default: '',
		description: 'Receipt PDF file in binary format encoded in base64, at the very beginning of the receipt string provide a prefix "data:" e.g. "data:4AAQSkSzkJRgABA[...]"',
		placeholder: 'data:4AAQSkZJRgABA[...]'
	},
	{
		displayName: 'External Receipt Number',
		name: 'external_receipt_number',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.AddOrderReceiptFile
				],
			},
		},
		default: '',
		description: 'External system receipt number (overwrites BaseLinker receipt number)',
		placeholder: 'RC40/08/2023'
	},
];
