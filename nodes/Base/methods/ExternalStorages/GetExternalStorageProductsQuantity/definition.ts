import {INodeProperties} from "n8n-workflow";
import {Resource, ExternalStoragesMethod} from "../../types";

export const getExternalStorageProductsQuantityDefinition: INodeProperties[] = [
	{
		displayName: 'Storage ID',
		name: 'storage_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ExternalStorages
				],
				operation: [
					ExternalStoragesMethod.GetExternalStorageProductsQuantity
				],
			},
		},
		default: '',
		placeholder: 'shop_2445',
		description: 'Storage ID in format "[type:shop|warehouse]_[ID:int]" (e.g. "shop_2445")',
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
					Resource.ExternalStorages
				],
				operation: [
					ExternalStoragesMethod.GetExternalStorageProductsQuantity
				],
			},
		},
		options: [
			{
				displayName: 'Page (Optional)',
				name: 'page',
				type: 'number',
				default: 0,
				description: '(optional) Results paging',
			},
		],
	},
];
