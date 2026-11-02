import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../../types";

export const getCourierPackagesStatusHistoryDefinition: INodeProperties[] = [
	{
		displayName: 'Package IDs',
		name: 'package_ids',
		placeholder: 'Add Package ID',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'An array with a list of parcel IDs',
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
					CourierShipmentsMethod.GetCourierPackagesStatusHistory
				],
			},
		},
	},
];
