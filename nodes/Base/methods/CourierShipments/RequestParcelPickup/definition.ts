import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../../types";

export const requestParcelPickupDefinition: INodeProperties[] = [
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
					CourierShipmentsMethod.RequestParcelPickup
				],
			},
		},
		default: '',
		placeholder: 'dpd',
	},
	{
		displayName: 'Package IDs (Optional if Package_numbers Was Provided)',
		name: 'package_ids',
		placeholder: 'Add Package ID',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'Array of shipments ID, optional if package_numbers was provided',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Package ID',
						name: 'package_id',
						type: 'number',
						default: 0,
						placeholder: '7323859',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.RequestParcelPickup
				],
			},
		},
	},
	{
		displayName: 'Package Numbers (Optional if Package_ids Was Provided)',
		name: 'package_numbers',
		placeholder: 'Add Package ID',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'Array of shipments number (consignment number), optional if package_ids was provided',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Package Number',
						name: 'package_number',
						type: 'string',
						default: '',
						placeholder: '7323859',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.RequestParcelPickup
				],
			},
		},
	},
	{
		displayName: 'Account ID',
		name: 'account_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.RequestParcelPickup
				],
			},
		},
		default: '',
		placeholder: '1645',
		description: 'Courier API account ID for the courier accounts retrieved from the request getCourierAccounts',
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
					CourierShipmentsMethod.RequestParcelPickup
				],
			},
		},
		options: [
			{
				displayName: 'Fields (Optional)',
				name: 'fields',
				placeholder: 'Add Field',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: '\tList of form fields retrieved from the request getRequestParcelPickupFields\n' +
					'For checkbox with multiple selection, the information should be sent in separate arrays e.g.\n' +
					'[\n' +
					'  {\n' +
					'    "id":"pickup_date",\n' +
					'    "value":"1642416311"\n' +
					'  },\n' +
					'  {\n' +
					'    "id":"shipments_weight",\n' +
					'    "value":"40"\n' +
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
								placeholder: 'pickup_date',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value for ID',
								placeholder: '1642416311',
							},
						],
					},
				],
			},
		],
	},
];
