import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../../types";

export const deleteOrderProductDefinition: INodeProperties[] = [
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.DeleteOrderProduct
				],
			},
		},
		default: 0,
		placeholder: '3754894',
		description: 'Order identifier from the BaseLinker order manager. Field required.',
	},
	{
		displayName: 'Order Product ID',
		name: 'order_product_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
				operation: [
					OrdersMethod.DeleteOrderProduct
				],
			},
		},
		default: 0,
		description: 'Order item ID from BaseLinker order manager. Field required.',
		placeholder: '59157160'
	},
];
