import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../../types";

export const getRequestParcelPickupFieldsDefinition: INodeProperties[] = [
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
					CourierShipmentsMethod.GetRequestParcelPickupFields
				],
			},
		},
		default: '',
		placeholder: 'dpd',
	},
];
