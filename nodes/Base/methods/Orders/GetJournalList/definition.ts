import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const getJournalListDefinition: INodeProperties[] = [
	{
		displayName: 'Last Log ID',
		name: 'last_log_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.GetJournalList
				],
			},
		},
		default: 0,
		placeholder: '654258',
		description: 'Log ID number from which the logs are to be retrieved',
	},
	{
		displayName: 'Logs Types',
		name: 'logs_types',
		placeholder: 'Add Log Type',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'Event ID List',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Event ID',
						name: 'event_id',
						type: 'number',
						default: 0,
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
					OrdersMethod.GetJournalList
				],
			},
		},
	},
	{
		displayName: 'Order ID (Optional)',
		name: 'order_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.GetJournalList
				],
			},
		},
		default: 0,
		description: 'Order ID number',
	},
];
