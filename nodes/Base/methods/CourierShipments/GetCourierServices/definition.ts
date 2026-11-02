import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../../types";

export const getCourierServicesDefinition: INodeProperties[] = [
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.GetCourierServices
				],
			},
		},
		default: 0,
		placeholder: '6911000',
		description: 'Order identifier'
	},
	{
		displayName: 'Courier Code',
		name: 'courier_code',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.GetCourierServices
				],
			},
		},
		default: '',
		placeholder: 'xpress',
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
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.GetCourierServices
				],
			},
		},
		options: [
			{
				displayName: 'Account ID (Optional)',
				name: 'account_id',
				type: 'number',
				default: 0,
				placeholder: '294',
				description: '\t(optional) Courier API account id for the courier accounts retrieved from the request getCourierAccounts\n' +
					'If blank, the first account will be used.',
			},
			{
				displayName: 'Fields (Optional)',
				name: 'fields',
				placeholder: 'Add Field',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'List of form fields retrieved from the request getCourierFields\n' +
					'For checkbox with multiple selection, the information should be sent in separate arrays e.g.\n' +
					'[\n' +
					'  {\n' +
					'    "id":"services",\n' +
					'    "value":"sms"\n' +
					'  },\n' +
					'  {\n' +
					'    "id":"services",\n' +
					'    "value":"email"\n' +
					'  },\n' +
					']',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'The field ID',
								placeholder: 'service',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Option ID (required for checkbox, select field types) or value (required for text, date field types)\n' +
									'Date - format unix time',
								placeholder: 'dhl',
							},
						],
					},
				],
			},
			{
				displayName: 'Packages (Optional)',
				name: 'packages',
				placeholder: 'Add Package',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'Array of shipments list, weight of at least one shipment required. The array includes fields received in response to the request getCourierFields. The response returns also information whether the courier supports multiple shipments.\n' +
					'As a key use the field \'id\' retrieved from the packages_fields parameter in response of the getCourierFields method.\n' +
					'As a value of field provide a value compatible with the field type from the getCourierFields response. Height, length, width should be sent in centimeters. Weight should be sent in kilograms.\n' +
					'E.g.\n' +
					'[\n' +
					'  "weight":"1",\n' +
					'  "height":"25",\n' +
					']',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Package Values',
								name: 'value',
								type: 'fixedCollection',
								default: {},
								typeOptions: {
									multipleValues: true,
								},
								description: '\'E.g.\\n\' +\n' +
									'\t\t\t\'[\\n\' +\n' +
									'\t\t\t\'  "weight":"1",\\n\' +\n' +
									'\t\t\t\'  "height":"25",\\n\' +\n' +
									'\t\t\t\']\',',
								options: [
									{
										name: 'metadataValues',
										displayName: 'Metadata',
										values: [
											{
												displayName: 'ID',
												name: 'id',
												type: 'string',
												default: '',
												description: 'As a key use the field \'ID\' retrieved from the packages_fields parameter in response of the getCourierFields method',
												placeholder: 'weight',
											},
											{
												displayName: 'Value',
												name: 'value',
												type: 'number',
												default: 0,
												description: 'As a value of field provide a value compatible with the field type from the getCourierFields response. Height, length, width should be sent in centimeters. Weight should be sent in kilograms.',
											},
										]
									}
								]
							},
						],
					},
				],
			},
		],
	},
];
