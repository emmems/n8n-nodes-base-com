import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const getInvoicesDefinition: INodeProperties[] = [
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
					OrdersMethod.GetInvoices
				],
			},
		},
		options: [
			{
				displayName: 'Invoice ID (Optional)',
				name: 'invoice_id',
				type: 'number',
				default: 0,
				description: '(optional) Invoice identifier. Completing this field will result in downloading information about only one specific invoice.',
			},
			{
				displayName: 'Order ID (Optional)',
				name: 'order_id',
				type: 'number',
				default: 0,
				placeholder: '1630473',
				description: '(optional) Order identifier. Completing this field will result in downloading information only about the invoice associated with this order (if the order has an invoice created).',
			},
			{
				displayName: 'Date From (Optional)',
				name: 'date_from',
				type: 'number',
				default: 0,
				placeholder: '1407341754',
				description: '(optional) Date from which invoices are to be collected. Unix time stamp format.',
			},
			{
				displayName: 'ID From (Optional)',
				name: 'id_from',
				type: 'number',
				default: 0,
				description: '(optional) The invoice ID number from which subsequent invoices are to be retrieved',
			},
			{
				displayName: 'Series ID (Optional)',
				name: 'series_id',
				type: 'number',
				default: 0,
				description: '(optional) numbering series ID that allows filtering after the invoice numbering series',
			},
			{
				displayName: 'Get External Invoices (Optional)',
				name: 'get_external_invoices',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: 'If set to \'false\' then omits from the results invoices that already have an external invoice file uploaded by addOrderInvoiceFile method (useful for ERP integrations uploading invoice files to BaseLinker)',
			},
		],
	},
];
