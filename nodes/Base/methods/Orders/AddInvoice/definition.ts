import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const addInvoiceDefinition: INodeProperties[] = [
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
					OrdersMethod.AddInvoice
				],
			},
		},
		default: 0,
		placeholder: '3754894',
		description: 'Order Identifier from BaseLinker order manager',
	},
	{
		displayName: 'Series ID',
		name: 'series_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.AddInvoice
				],
			},
		},
		default: 0,
		placeholder: '15',
		description: 'Series numbering identifier',
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
					OrdersMethod.AddInvoice
				],
			},
		},
		options: [
			{
				displayName: 'Vat Rate (Optional)',
				name: 'vat_rate',
				type: 'string',
				default: '',
				placeholder: 'See description',
				description: '\t(optional) VAT rate - parameter accepts values:\n' +
					'- "DEFAULT": according to the numbering series (is set as default value)\n' +
					'- "ITEM": use the rate assigned to the item of the order\n' +
					'- "EXPT" / "ZW": exempt from VAT\n' +
					'- "NP": annotation NP\n' +
					'- "OO": VAT reverse charge\n' +
					'- value: number from range 0-100',
			},
		],
	},
];
