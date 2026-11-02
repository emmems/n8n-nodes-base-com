import {INodeProperties} from "n8n-workflow";
import {Resource, CourierShipmentsMethod} from "../types";

import {createPackageDefinition} from "./CreatePackage/definition";
import {createPackageManualDefinition} from "./CreatePackageManual/definition";
import {getCouriersListDefinition} from "./GetCouriersList/definition";
import {getCourierFieldsDefinition} from "./GetCourierFields/definition";
import {getCourierServicesDefinition} from "./GetCourierServices/definition";
import {getCourierAccountsDefinition} from "./GetCourierAccounts/definition";
import {getLabelDefinition} from "./GetLabel/definition";
import {getProtocolDefinition} from "./GetProtocol/definition";
import {getOrderPackagesDefinition} from "./GetOrderPackages/definition";
import {getCourierPackagesStatusHistoryDefinition} from "./GetCourierPackagesStatusHistory/definition";
import {deleteCourierPackageDefinition} from "./DeleteCourierPackage/definition";
import {requestParcelPickupDefinition} from "./RequestParcelPickup/definition";
import {getRequestParcelPickupFieldsDefinition} from "./GetRequestParcelPickupFields/definition";

export const courierShipmentsDefinition: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					Resource.CourierShipments
				],
			},
		},
		options: [
			// Courier Shipments
			{
				name: 'Create Package',
				value: CourierShipmentsMethod.CreatePackage,
				description: 'The method allows you to create a shipment in the system of the selected courier',
				action: 'Create a shipment in the system of the selected courier',
			},
			{
				name: 'Create Package Manual',
				value: CourierShipmentsMethod.CreatePackageManual,
				description: 'The method allows you to enter the shipping number and the name of the courier to the order (function used only to add shipments created outside BaseLinker)',
				action: 'Add the shipping number and the name of the courier to the order',
			},
			{
				name: 'Get Couriers List',
				value: CourierShipmentsMethod.GetCouriersList,
				description: 'The method allows you to retrieve a list of available couriers',
				action: 'Gets a list of available couriers',
			},
			{
				name: 'Get Courier Fields',
				value: CourierShipmentsMethod.GetCourierFields,
				description: 'The method allows you to retrieve the form fields for creating shipments for the selected courier',
				action: 'Gets the form fields for creating shipments for the selected courier',
			},
			{
				name: 'Get Courier Services',
				value: CourierShipmentsMethod.GetCourierServices,
				description: 'The method allows you to retrieve additional courier services, which depend on other shipment settings. Used only for X-press, BrokerSystem, Wysyłam z Allegro, ErliPRO couriers. Not applicable to other couriers whose forms have fixed options. The details of the package should be sent with the method (the format as in createPackage) in order to receive a list of additional services',
				action: 'Gets additional courier services which depend on other shipment settings',
			},
			{
				name: 'Get Courier Accounts',
				value: CourierShipmentsMethod.GetCourierAccounts,
				description: 'The method allows you to retrieve the list of accounts connected to a given courier',
				action: 'Gets the list of accounts connected to a given courier',
			},
			{
				name: 'Get Label',
				value: CourierShipmentsMethod.GetLabel,
				description: 'The method allows you to download a shipping label (consignment) for a selected shipment',
				action: 'Gets a shipping label for a selected shipment',
			},
			{
				name: 'Get Protocol',
				value: CourierShipmentsMethod.GetProtocol,
				description: 'The method allows you to download a parcel protocol for selected shipments if the protocol is available for chosen courier',
				action: 'Gets a parcel protocol for selected shipments',
			},
			{
				name: 'Get Order Packages',
				value: CourierShipmentsMethod.GetOrderPackages,
				description: 'The method allows you to download shipments previously created for the selected order',
				action: 'Gets shipments previously created for the selected order',
			},
			{
				name: 'Get Courier Packages Status History',
				value: CourierShipmentsMethod.GetCourierPackagesStatusHistory,
				description: 'The method allows you to retrieve the history of the status list of the given shipments. Maximum 100 shipments at a time.',
				action: 'Gets history of the status list of the given shipments',
			},
			{
				name: 'Delete Courier Package',
				value: CourierShipmentsMethod.DeleteCourierPackage,
				description: 'The method allows you to delete a previously created shipment. The method removes the shipment from the BaseLinker system and from the courier system if the courier API allows it.',
				action: 'Remove a previously created shipment',
			},
			{
				name: 'Request Parcel Pickup',
				value: CourierShipmentsMethod.RequestParcelPickup,
				description: 'The method allows you to request a parcel pickup for previously created shipments. The method sends a parcel pickup request to courier API if the courier API allows it.',
				action: 'Request a parcel pickup for previously created shipments',
			},
			{
				name: 'Get Request Parcel Pickup Fields',
				value: CourierShipmentsMethod.GetRequestParcelPickupFields,
				description: 'The method allows you to retrieve additional fields for a parcel pickup request',
				action: 'Gets additional fields for a parcel pickup request',
			},
		],
		// default: OrdersMethod.GetOrders.toString(),
		default: '',
		noDataExpression: true,
	},
	...createPackageDefinition,
	...createPackageManualDefinition,
	...getCouriersListDefinition,
	...getCourierFieldsDefinition,
	...getCourierServicesDefinition,
	...getCourierAccountsDefinition,
	...getLabelDefinition,
	...getProtocolDefinition,
	...getOrderPackagesDefinition,
	...getCourierPackagesStatusHistoryDefinition,
	...deleteCourierPackageDefinition,
	...requestParcelPickupDefinition,
	...getRequestParcelPickupFieldsDefinition,
];
