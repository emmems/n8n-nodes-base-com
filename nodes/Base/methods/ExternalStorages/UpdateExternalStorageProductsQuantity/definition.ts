import {INodeProperties} from "n8n-workflow";
import {Resource, ExternalStoragesMethod} from "../../types";

export const updateExternalStorageProductsQuantityDefinition: INodeProperties[] = [
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
					ExternalStoragesMethod.UpdateExternalStorageProductsQuantity
				],
			},
		},
		default: '',
		placeholder: 'shop_2445',
		description: 'Storage ID in format "[type:shop|warehouse]_[ID:int]" (e.g. "shop_2445")',
	},
	{
		displayName: 'Products',
		name: 'products',
		placeholder: 'Add Product',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'An array of products. Each product is a separate element of the array. The product consists of a 3 element array of components:\n' +
			'0 => product ID number (varchar)\n' +
			'1 => variant ID number (0 if the main product is changed, not the variant) (int)\n' +
			'2 => Stock quantity (int)',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Product ID',
						name: 'product_id',
						type: 'string',
						default: '',
						description: 'Product ID number',
						placeholder: '1081730'
					},
					{
						displayName: 'Variant ID (0 Default)',
						name: 'variant_id',
						type: 'number',
						default: 0,
						description: 'Variant ID number (0 if the main product is changed, not the variant)',
					},
					{
						displayName: 'Stock Quantity',
						name: 'stock_quantity',
						type: 'number',
						default: 0,
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					Resource.ExternalStorages
				],
				operation: [
					ExternalStoragesMethod.UpdateExternalStorageProductsQuantity
				],
			},
		},
	}
];
