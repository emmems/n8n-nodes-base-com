import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../../types";

export const getLabelDefinition: INodeProperties[] = [
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
					CourierShipmentsMethod.GetLabel
				],
			},
		},
		default: '',
		placeholder: 'pkwid',
	},
	{
		displayName: 'Package ID (Optional if Package_number Was Provided)',
		name: 'package_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.GetLabel
				],
			},
		},
		default: 0,
		placeholder: '7323859',
		description: 'Shipment ID, optional if package_number was provided'
	},
	{
		displayName: 'Packing Number (Optional if Package_id Was Provided)',
		name: 'package_number',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
				operation: [
					CourierShipmentsMethod.GetLabel
				],
			},
		},
		default: '',
		description: 'Shipping number (consignment number), optional if package_id was provided'
	},
];
