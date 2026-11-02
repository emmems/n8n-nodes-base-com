import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../../types";

export const getProtocolDefinition: INodeProperties[] = [
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
					CourierShipmentsMethod.GetProtocol
				],
			},
		},
		default: '',
		placeholder: 'raben',
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
					CourierShipmentsMethod.GetProtocol
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
					CourierShipmentsMethod.GetProtocol
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
					CourierShipmentsMethod.GetProtocol
				],
			},
		},
		default: '',
		placeholder: '33',
		description: 'Courier API account ID for the courier accounts retrieved from the request getCourierAccounts',
	},
];
