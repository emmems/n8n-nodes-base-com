import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const setOrderStatusesDefinition: INodeProperties[] = [
	{
		displayName: 'Order IDs',
		name: 'order_ids',
		placeholder: 'Add Order ID',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'Array of Order ID numbers',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Order ID',
						name: 'order_id',
						type: 'number',
						default: 0,
						placeholder: '3754895',
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
					OrdersMethod.SetOrderStatuses
				],
			},
		},
	},
	{
		displayName: 'Status ID',
		name: 'status_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.SetOrderStatuses
				],
			},
		},
		default: 0,
		description: 'Status ID number. The status list can be retrieved using getOrderStatusList.',
		placeholder: '34562'
	},
];
