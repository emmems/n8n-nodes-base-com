import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const getOrdersDefinition: INodeProperties[] = [
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
					OrdersMethod.GetOrders
				],
			},
		},
		options: [
			{
				displayName: 'Order ID (Optional)',
				name: 'order_id',
				type: 'number',
				default: 0,
				placeholder: '1630473',
				description: '(optional) Order identifier. Completing this field will download information about only one specific order.',
			},
			{
				displayName: 'Date Confirmed From (Optional)',
				name: 'date_confirmed_from',
				type: 'number',
				default: 0,
				placeholder: '1407341754',
				description: '(optional) Date of order confirmation from which orders are to be collected. Format unix time stamp.',
			},
			{
				displayName: 'Date From (Optional)',
				name: 'date_from',
				type: 'number',
				default: 0,
				description: '(optional) The order date from which orders are to be collected. Format unix time stamp.',
			},
			{
				displayName: 'ID From (Optional)',
				name: 'id_from',
				type: 'number',
				default: 0,
				description: '(optional) The order ID number from which subsequent orders are to be collected',
			},
			{
				displayName: 'Get Unconfirmed Orders (Optional)',
				name: 'get_unconfirmed_orders',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: '(optional, false by default) Download unconfirmed orders as well (this is e.g. an order from Allegro to which the customer has not yet completed the delivery form). Default is false. Unconfirmed orders may not be complete yet, the shipping method and price is also unknown.',
			},
			{
				displayName: 'Include Custom Extra Fields (Optional)',
				name: 'include_custom_extra_fields',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: '(optional, false by default) Download values of custom additional fields',
			},
			{
				displayName: 'Status ID (Optional)',
				name: 'status_id',
				type: 'number',
				default: 0,
				description: '(optional) The status identifier from which orders are to be collected. Leave blank to download orders from all statuses.',
			},
			{
				displayName: 'Filter Email (Optional)',
				name: 'filter_email',
				type: 'string',
				default: '',
				description: '(optional) Filtering of order lists by e-mail address (displays only orders with the given e-mail address)',
			},
			{
				displayName: 'Filter Order Source (Optional)',
				name: 'filter_order_source',
				type: 'string',
				default: '',
				description: '(optional) Filtering of order lists by order source, for instance "ebay", "amazon" (displays only orders come from given source). The list of order sources can be retrieved with getOrderSources method.',
			},
			{
				displayName: 'Filter Order Source ID (Optional)',
				name: 'filter_order_source_id',
				type: 'number',
				default: 0,
				description: '(optional) Filtering of order lists by order source identifier, for instance "2523" (displays only orders come from order source defined in "filter_order_source" identified by given order source identifier). Filtering by order source indentifier requires "filter_order_source" to be set prior. The list of order source identifiers can be retrieved with getOrderSources method.',
			},
		],
	},
];
