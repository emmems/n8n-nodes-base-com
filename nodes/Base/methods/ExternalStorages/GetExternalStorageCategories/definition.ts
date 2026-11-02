import {INodeProperties} from "n8n-workflow";
import {Resource, ExternalStoragesMethod} from "../../types";

export const getExternalStorageCategoriesDefinition: INodeProperties[] = [
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
					ExternalStoragesMethod.GetExternalStorageCategories
				],
			},
		},
		default: '',
		placeholder: 'shop_2445',
		description: 'Storage ID in format "[type:shop|warehouse]_[ID:int]" (e.g. "shop_2445")',
	},
];
