import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const setOrderFieldsDefinition: INodeProperties[] = [
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
					OrdersMethod.SetOrderFields
				],
			},
		},
		default: 0,
		placeholder: '3754894',
		description: 'Order identifier from the BaseLinker order manager. Field required. Other fields are optional.',
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
					OrdersMethod.SetOrderFields
				],
			},
		},
		options: [
			{
				displayName: 'Admin Comments (Optional)',
				name: 'admin_comments',
				type: 'string',
				default: '',
				description: 'Seller comments',
				placeholder: 'Seller test comments'
			},
			{
				displayName: 'User Comments (Optional)',
				name: 'user_comments',
				type: 'string',
				default: '',
				description: 'Buyer comments',
				placeholder: 'User comment'
			},
			{
				displayName: 'Payment Method (Optional)',
				name: 'payment_method',
				type: 'string',
				default: 'PayPal',
				placeholder: 'GBP',
			},
			{
				displayName: 'Payment Method Cod (Optional)',
				name: 'payment_method_cod',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: 'Flag indicating whether the type of payment is COD (cash on delivery)'
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Buyer e-mail address',
				placeholder: 'test@test.com'
			},
			{
				displayName: 'Phone (Optional)',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Buyer phone number',
				placeholder: '693123123'
			},
			{
				displayName: 'User Login (Optional)',
				name: 'user_login',
				type: 'string',
				default: '',
				description: 'Allegro or eBay user login',
				placeholder: 'nick1'
			},
			{
				displayName: 'Delivery Method (Optional)',
				name: 'delivery_method',
				type: 'string',
				default: '',
				description: 'Delivery method name',
				placeholder: 'Expedited shipping'
			},
			{
				displayName: 'Delivery Price (Optional)',
				name: 'delivery_price',
				type: 'number',
				default: 0,
				description: 'Gross delivery price',
				placeholder: '10'
			},
			{
				displayName: 'Delivery Fullname (Optional)',
				name: 'delivery_fullname',
				type: 'string',
				default: '',
				description: 'Delivery address - name and surname',
				placeholder: 'John Doe'
			},
			{
				displayName: 'Delivery Company (Optional)',
				name: 'delivery_company',
				type: 'string',
				default: '',
				description: 'Delivery address - company',
				placeholder: 'Company'
			},
			{
				displayName: 'Delivery Address (Optional)',
				name: 'delivery_address',
				type: 'string',
				default: '',
				description: 'Delivery address - street and number',
				placeholder: 'Long Str 12'
			},
			{
				displayName: 'Delivery Postcode (Optional)',
				name: 'delivery_postcode',
				type: 'string',
				default: '',
				description: 'Delivery address - postcode',
				placeholder: 'E2 8HQ'
			},
			{
				displayName: 'Delivery City (Optional)',
				name: 'delivery_city',
				type: 'string',
				default: '',
				description: 'Delivery address - city',
				placeholder: 'London'
			},
			{
				displayName: 'Delivery State (Optional)',
				name: 'delivery_state',
				type: 'string',
				default: '',
				description: 'Delivery address - state/province',
				placeholder: ''
			},
			{
				displayName: 'Delivery Country Code (Optional)',
				name: 'delivery_country_code',
				type: 'string',
				default: '',
				description: 'Delivery address - country code (two-letter, e.g. EN)',
				placeholder: 'GB'
			},
			{
				displayName: 'Delivery Point ID (Optional)',
				name: 'delivery_point_id',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - pick-up point identifier',
				placeholder: ''
			},
			{
				displayName: 'Delivery Point Name (Optional)',
				name: 'delivery_point_name',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - pick-up point name',
				placeholder: ''
			},
			{
				displayName: 'Delivery Point Address (Optional)',
				name: 'delivery_point_address',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - pick-up point address',
				placeholder: ''
			},
			{
				displayName: 'Delivery Point Postcode (Optional)',
				name: 'delivery_point_postcode',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - pick-up point postcode',
				placeholder: ''
			},
			{
				displayName: 'Delivery Point City (Optional)',
				name: 'delivery_point_city',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - pick-up point city',
				placeholder: ''
			},
			{
				displayName: 'Invoice Fullnam (Optional)',
				name: 'invoice_fullname',
				type: 'string',
				default: '',
				description: 'Billing details - name and surname',
				placeholder: 'John Doe'
			},
			{
				displayName: 'Invoice Company (Optional)',
				name: 'invoice_company',
				type: 'string',
				default: '',
				description: 'Billing details - company',
				placeholder: 'Company'
			},
			{
				displayName: 'Invoice NIP (Optional)',
				name: 'invoice_nip',
				type: 'string',
				default: '',
				description: 'Billing details - Vat Reg. no./tax number.',
				placeholder: 'GB8943245'
			},
			{
				displayName: 'Invoice Address (Optional)',
				name: 'invoice_address',
				type: 'string',
				default: '',
				description: 'Billing details - street and house number',
				placeholder: 'Long Str 12'
			},
			{
				displayName: 'Invoice Postcode (Optional)',
				name: 'invoice_postcode',
				type: 'string',
				default: '',
				description: 'Billing details - postcode',
				placeholder: 'E2 8HQ'
			},
			{
				displayName: 'Invoice City (Optional)',
				name: 'invoice_city',
				type: 'string',
				default: '',
				description: 'Billing details - city',
				placeholder: 'London'
			},
			{
				displayName: 'Invoice State (Optional)',
				name: 'invoice_state',
				type: 'string',
				default: '',
				description: 'Billing details - state/province',
				placeholder: ''
			},
			{
				displayName: 'Invoice Country Code (Optional)',
				name: 'invoice_country_code',
				type: 'string',
				default: '',
				description: 'Billing details - country code (two-letter, e.g. EN)',
				placeholder: 'GB'
			},
			{
				displayName: 'Want Invoice (Optional)',
				name: 'want_invoice',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: 'Flag indicating whether the customer wants an invoice (1 - yes, 0 - no)',
			},
			{
				displayName: 'Extra Field 1 (Optional)',
				name: 'extra_field_1',
				type: 'string',
				default: '',
				description: 'Value of the "additional field 1". - the seller can store any information there.',
				placeholder: 'field test 1'
			},
			{
				displayName: 'Extra Field 2 (Optional)',
				name: 'extra_field_2',
				type: 'string',
				default: '',
				description: 'Value of the "additional field 2". - the seller can store any information there.',
				placeholder: ''
			},
			{
				displayName: 'Custom Extra Fields (Optional)',
				name: 'custom_extra_fields',
				placeholder: 'Add Extra Field',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: '\tA list containing order custom extra fields, where the key is the extra field ID and value is an extra field content for given extra field. The list of extra fields can be retrieved with getOrderExtraFields method.\n' +
					'In case of removing a field the empty string is expected.',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Extra Field ID',
								name: 'extra_field_id',
								type: 'string',
								required: true,
								default: '',
								placeholder: '135',
								description: 'Key is the extra field ID'
							},
							{
								displayName: 'Extra Field Name (Optional)',
								name: 'extra_field_name',
								type: 'string',
								default: '',
								placeholder: '135',
								description: 'Name is the extra field name'
							},
							{
								displayName: 'Extra Field Value',
								name: 'extra_field_value',
								type: 'string',
								required: true,
								default: '',
								placeholder: 'B2B',
								description: 'Value is an extra field content for given extra field'
							},
						],
					},
				],
			},
			{
				displayName: 'Pick State (Optional)',
				name: 'pick_state',
				type: 'number',
				default: 0,
				placeholder: 'See description',
				description: 'Flag indicating the status of the order products collection (1 - all products have been collected, 0 - not all products have been collected)',
			},
			{
				displayName: 'Pack State (Optional)',
				name: 'pack_state',
				type: 'number',
				default: 0,
				placeholder: 'See description',
				description: 'Flag indicating the status of the order products packing (1 - all products have been packed, 0 - not all products have been packed)',
			},
		],
	},
];
