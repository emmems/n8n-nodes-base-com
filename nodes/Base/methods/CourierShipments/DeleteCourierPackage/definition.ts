import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../../types";

export const deleteCourierPackageDefinition: INodeProperties[] = [
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
					CourierShipmentsMethod.DeleteCourierPackage
				],
			},
		},
		default: '',
		placeholder: 'dhl',
	},
	{
		displayName: 'Package ID (Optional if Package_number Is Provided)',
		name: 'package_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.DeleteCourierPackage
				],
			},
		},
		default: 0,
		placeholder: '77014696',
		description: 'Shipment ID, optional if package_number is provided'
	},
	{
		displayName: 'Package Number (Optional if Package_id Was Provided)',
		name: 'package_number',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.DeleteCourierPackage
				],
			},
		},
		default: '',
		placeholder: '622222044730624327700197',
		description: 'Shipping number (consignment number), optional if package_id was provided'
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
					CourierShipmentsMethod.DeleteCourierPackage
				],
			},
		},
		options: [
			{
				displayName: 'Force Delete (Optional)',
				name: 'force_delete',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: '(optional, false by default) Forcing a shipment to be removed from BaseLinker database in the case of an error with the removal of the shipment in the courier API',
			},
		],
	},
];
