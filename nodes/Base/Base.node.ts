import {IExecuteFunctions,} from 'n8n-core';

import {IDataObject, INodeExecutionData, INodeType, INodeTypeDescription,} from 'n8n-workflow';

import {Resource, ProductCatalogMethod} from "./methods/types";

import {productCatalogDefinition} from "./methods/ProductCatalog/product.catalog.definition";
import {productCatalogExecution} from "./methods/ProductCatalog/product.catalog.execution";
import {externalStoragesDefinition} from "./methods/ExternalStorages/external.storages.definition";
import {externalStoragesExecution} from "./methods/ExternalStorages/external.storages.execution";
import {ordersDefinition} from "./methods/Orders/orders.definition";
import {ordersExecution} from "./methods/Orders/orders.execution";
import {courierShipmentsDefinition} from "./methods/CourierShipments/courier.shipments.definition";
import {courierShipmentsExecution} from "./methods/CourierShipments/courier.shipments.execution";


export class Base implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Base',
		name: 'base',
		icon: 'file:base.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the Base (formerly BaseLinker) API',
		defaults: {
			name: 'Base',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'baseComApi',
				required: true,
			},
		],
		properties: [
			// Resources and operations will go here
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Product Catalog',
						value: Resource.ProductCatalog,
					},
					{
						name: 'External Storage',
						value: Resource.ExternalStorages,
					},
					{
						name: 'Order',
						value: Resource.Orders,
					},
					{
						name: 'Courier Shipment',
						value: Resource.CourierShipments,
					}
				],
				default: Resource.ProductCatalog.toString(),
				noDataExpression: true,
				required: true,
				description: 'The Base API resource to use',
			},
			// Product Catalog
			...productCatalogDefinition,
			// External storages
			...externalStoragesDefinition,
			// Orders
			...ordersDefinition,
			// Courier shipments
			...courierShipmentsDefinition
		],
	};
	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Handle data coming from previous nodes
		const items = this.getInputData();
		const resource: Resource = this.getNodeParameter('resource', 0) as Resource;
		const operation: ProductCatalogMethod = this.getNodeParameter('operation', 0) as ProductCatalogMethod;

		const credentials = await this.getCredentials('baseComApi') as IDataObject;
		const apiKey = credentials.apiKey as string;
		let responseData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			// All operation for Product Catalog resource
			if (resource === Resource.ProductCatalog) {
				const result = await productCatalogExecution(this, apiKey, operation, resource, i);
				responseData.push(result);
				continue;
			}
			// All operation for External Storages resource
			if (resource === Resource.ExternalStorages) {
				const result = await externalStoragesExecution(this, apiKey, operation, resource, i);
				responseData.push(result);
				continue;
			}
			// All operation for Orders resource
			if (resource === Resource.Orders) {
				const result = await ordersExecution(this, apiKey, operation, resource, i);
				responseData.push(result);
				continue;
			}
			// All operation for Courier Shipments category
			if (resource === Resource.CourierShipments) {
				const result = await courierShipmentsExecution(this, apiKey, operation, resource, i);
				responseData.push(result);
			}
		}

		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(responseData)];
	}
}
