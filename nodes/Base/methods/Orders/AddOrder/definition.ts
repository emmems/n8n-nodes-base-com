import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const addOrderDefinition: INodeProperties[] = [
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.AddOrder
				],
			},
		},
		default: '',
		placeholder: 'GBP',
		description: '3-letter currency symbol (e.g. EUR, PLN)',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.AddOrder
				],
			},
		},
		default: '',
		description: 'Buyer e-mail address',
		placeholder: 'test@test.com'
	},
	{
		displayName: 'Products',
		name: 'products',
		placeholder: 'Add Product',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'Order product array. Each element of the array is also an array containing fields:\n' +
			'storage (varchar) - type of magazine from which the product comes (available values: "db" - BaseLinker internal catalog, "shop" - the online store magazine, "warehouse" - a connected wholesaler).\n' +
			'storage_id (int) - the identifier of the magazine from which the product comes (one of the shops connected to the account). Value "0" for a product from the BaseLinker internal catalog.\n' +
			'product_id (varchar) - Product identifier in BaseLinker or store magazine. Blank if the product number is unknown\n' +
			'variant_id (int) - Product variant ID. Blank if the variant number is unknown\n' +
			'name (varchar) - Product name\n' +
			'sku (varchar) - Product sku\n' +
			'ean (varchar) - Product ean\n' +
			'location (varchar) - Product location\n' +
			'warehouse_id (int) - Product source warehouse identifier. Only applies to products from BaseLinker inventory. By default warehouse_id is determined based on the source of the order.\n' +
			'attributes (varchar) - Specific product attributes (e.g. "Color: blue")\n' +
			'price_brutto (float) - Single item gross price\n' +
			'tax_rate (float) - VAT rate\n' +
			'quantity (int) - Quantity of pieces\n' +
			'weight (float) - Single item weight',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Storage (Optional)',
						name: 'storage',
						type: 'string',
						default: '',
						placeholder: 'db',
						description: 'Type of magazine from which the product comes (available values: "db" - BaseLinker internal catalog, "shop" - the online store magazine, "warehouse" - a connected wholesaler)'
					},
					{
						displayName: 'Storage ID (Optional)',
						name: 'storage_id',
						type: 'number',
						default: 0,
						description: 'The identifier of the magazine from which the product comes (one of the shops connected to the account). Value "0" for a product from the BaseLinker internal catalog.'
					},
					{
						displayName: 'Product ID',
						name: 'product_id',
						type: 'string',
						required: true,
						default: '',
						placeholder: '5434',
						description: 'Product identifier in BaseLinker or store magazine. Blank if the product number is unknown.'
					},
					{
						displayName: 'Variant ID',
						name: 'variant_id',
						type: 'number',
						default: 0,
						description: 'Product variant ID. Blank if the variant number is unknown.'
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						required: true,
						default: '',
						placeholder: 'Harry Potter and the Chamber of Secrets',
						description: 'Product name'
					},
					{
						displayName: 'SKU (Optional)',
						name: 'sku',
						type: 'string',
						default: '',
						placeholder: 'LU4235',
						description: 'Product sku'
					},
					{
						displayName: 'EAN (Optional)',
						name: 'ean',
						type: 'string',
						default: '',
						placeholder: '1597368451236',
						description: 'Product ean'
					},
					{
						displayName: 'Location (Optional)',
						name: 'location',
						type: 'string',
						default: '',
						placeholder: 'A1-13-7',
						description: 'Product location'
					},
					{
						displayName: 'Warehouse ID (Optional)',
						name: 'warehouse_id',
						type: 'number',
						default: 0,
						description: 'Product source warehouse identifier. Only applies to products from BaseLinker inventory. By default warehouse_id is determined based on the source of the order.'
					},
					{
						displayName: 'Attributes (Optional)',
						name: 'attributes',
						type: 'string',
						default: '',
						description: 'Specific product attributes (e.g. "Color: blue")'
					},
					{
						displayName: 'Price Brutto',
						name: 'price_brutto',
						type: 'number',
						required: true,
						typeOptions: {
							numberPrecision: 2,
						},
						default: 0,
						placeholder: '20.00',
						description: 'Single item gross price, 100 means 100zł, 10.99 means 10.99zł'
					},
					{
						displayName: 'Tax Rate',
						name: 'tax_rate',
						type: 'number',
						required: true,
						typeOptions: {
							numberPrecision: 2,
						},
						default: 0,
						placeholder: '23',
						description: 'VAT rate'
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						required: true,
						default: 0,
						placeholder: '2',
						description: 'Quantity of pieces'
					},
					{
						displayName: 'Weight (Optional)',
						name: 'weight',
						type: 'number',
						typeOptions: {
							numberPrecision: 2,
						},
						default: 0,
						placeholder: '1',
						description: 'Single item weight'
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.AddOrder
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
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
					OrdersMethod.AddOrder
				],
			},
		},
		options: [
			{
				displayName: 'Order Status ID (Optional)',
				name: 'order_status_id',
				type: 'number',
				default: 0,
				placeholder: '6624',
				description: 'Order status (the list available to retrieve with getOrderStatusList)',
			},
			{
				displayName: 'Custom Source ID (Optional)',
				name: 'custom_source_id',
				type: 'number',
				default: 0,
				description: '(optional) Identifier of custom order source defined in BaseLinker panel. If not provided, default order source is assigned.',
			},
			{
				displayName: 'Date Add (Optional)',
				name: 'date_add',
				type: 'number',
				default: 0,
				placeholder: '1698395514',
				description: 'Date of order creation (in unix time format)',
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
				displayName: 'Paid (Optional)',
				name: 'paid',
				type: 'boolean',
				default: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: 'Information whether the order is already paid. The value "1" automatically adds a full payment to the order.'
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
				displayName: 'Admin Comments (Optional)',
				name: 'admin_comments',
				type: 'string',
				default: '',
				description: 'Seller comments',
				placeholder: 'Seller test comments'
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
		],
	},
];
