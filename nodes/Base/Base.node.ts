import {IExecuteFunctions,} from 'n8n-workflow';

import {IDataObject, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionTypes,} from 'n8n-workflow';

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
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node -- enum keeps connection values aligned with n8n-workflow 3.x
		inputs: [NodeConnectionTypes.Main],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong -- enum keeps connection values aligned with n8n-workflow 3.x
		outputs: [NodeConnectionTypes.Main],
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

		let responseData: IDataObject[] = [];

		// Execute the selected API operation for each input item
		for (let i = 0; i < items.length; i++) {

			try {
				let result: IDataObject | undefined;
				if (resource === Resource.ProductCatalog) {
					result = await productCatalogExecution(this, operation, resource, i) as IDataObject | undefined;
				} else if (resource === Resource.ExternalStorages) {
					result = await externalStoragesExecution(this, operation, resource, i) as IDataObject | undefined;
				} else if (resource === Resource.Orders) {
					result = await ordersExecution(this, operation, resource, i) as IDataObject | undefined;
				} else if (resource === Resource.CourierShipments) {
					result = await courierShipmentsExecution(this, operation, resource, i) as IDataObject | undefined;
				}
				responseData.push(result ?? {});
			} catch (error) {
				if (!this.continueOnFail()) throw error;
				responseData.push({ error: error instanceof Error ? error.message : String(error) });
			}
			continue;

		}

		// Map data to n8n data structure
		const outputItems = this.helpers.returnJsonArray(responseData);
		return [outputItems.map((outputItem, item) => ({ ...outputItem, pairedItem: { item } }))];
	}
}
