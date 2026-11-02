import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../../types";

export const createPackageManualDefinition: INodeProperties[] = [
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
					CourierShipmentsMethod.CreatePackageManual
				],
			},
		},
		default: 0,
		placeholder: '6910995',
		description: 'Order identifier',
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
					CourierShipmentsMethod.CreatePackageManual
				],
			},
		},
		default: '',
		placeholder: 'dhl',
		description: 'Courier code (courier code retrieved with getCourierList or custom courier name)',
	},
	{
		displayName: 'Package Number',
		name: 'package_number',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.CreatePackageManual
				],
			},
		},
		default: '',
		placeholder: '622222044730624327700197',
		description: 'Shipping number (consignment number)',
	},
	{
		displayName: 'Pickup Date',
		name: 'pickup_date',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.CreatePackageManual
				],
			},
		},
		default: 0,
		placeholder: '1487006161',
		description: 'Date of dispatch (unix time format)',
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
					CourierShipmentsMethod.CreatePackageManual
				],
			},
		},
		options: [
			{
				displayName: 'Return Shipment (Optional)',
				name: 'return_shipment',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: '(optional, false by default) Marks package as return shipment',
			},
		],
	},
];
