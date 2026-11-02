import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const getInventoryProductLogsDefinition: INodeProperties[] = [
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.GetInventoryProductLogs
				],
			},
		},
		default: 0,
		placeholder: '2685',
		description:'Product identifier. In case of retrieving logs for a variant, the variant identifier must be provided as the product identifier.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.GetInventoryProductLogs
				],
			},
		},
		options: [
			{
				displayName: 'Date From (Optional)',
				name: 'date_from',
				type: 'number',
				default: 0,
				placeholder: '1592904594',
				description: '(optional) Date from which logs are to be retrieved. Unix time stamp format.',
			},
			{
				displayName: 'Date To (Optional)',
				name: 'date_to',
				type: 'number',
				default: 0,
				placeholder: '',
				description: '(optional) Date up to which logs are to be retrieved. Unix time stamp format.',
			},
			{
				displayName: 'Log Type (Optional)',
				name: 'log_type',
				type: 'number',
				default: 0,
				placeholder: '',
				description: '(optional) List of event types you want to retrieve. Available values:\n' +
					'1 - Change in stock\n' +
					'2 - Price change\n' +
					'3 - Product creation\n' +
					'4 - Product deletion\n' +
					'5 - Text fields modifications\n' +
					'6 - Locations modifications\n' +
					'7 - Modifications of links\n' +
					'8 - Gallery modifications\n' +
					'9 - Variant modifications\n' +
					'10 - Modifications of bundle products',
			},
			{
				displayName: 'Sort (Optional)',
				name: 'sort',
				type: 'number',
				default: 0,
				placeholder: '',
				description: '(optional) Type of log sorting. Possible "ASC" values ( ascending from date), "DESC" (descending after the date). By default the sorting is done in ascending order.',
			},
			{
				displayName: 'Page (Optional)',
				name: 'page',
				type: 'number',
				default: 0,
				placeholder: '2',
				description: '(optional) Results paging (100 product editions per page)',
			},
		],
	},
]



