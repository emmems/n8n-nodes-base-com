import {INodeProperties} from "n8n-workflow";
import {Resource, OrdersMethod} from "../types";

import {getJournalListDefinition} from "./GetJournalList/definition";
import {addOrderDefinition} from "./AddOrder/definition";
import {getOrderSourcesDefinition} from "./GetOrderSources/definition";
import {getOrderExtraFieldsDefinition} from "./GetOrderExtraFields/definition";
import {getOrdersDefinition} from "./GetOrders/definition";
import {getOrderTransactionDetailsDefinition} from "./GetOrderTransactionDetails/definition";
import {getOrdersByEmailDefinition} from "./GetOrdersByEmail/definition";
import {getOrdersByPhoneDefinition} from "./GetOrdersByPhone/definition";
import {addInvoiceDefinition} from "./AddInvoice/definition";
import {getInvoicesDefinition} from "./GetInvoices/definition";
import {getSeriesDefinition} from "./GetSeries/definition";
import {getOrderStatusListDefinition} from "./GetOrderStatusList/definition";
import {getOrderPaymentsHistoryDefinition} from "./GetOrderPaymentsHistory/definition";
import {getNewReceiptsDefinition} from "./GetNewReceipts/definition";
import {getReceiptDefinition} from "./GetReceipt/definition";
import {setOrderFieldsDefinition} from "./SetOrderFields/definition";
import {addOrderProductDefinition} from "./AddOrderProduct/definition";
import {setOrderProductFieldsDefinition} from "./SetOrderProductFields/definition";
import {deleteOrderProductDefinition} from "./DeleteOrderProduct/definition";
import {setOrderPaymentDefinition} from "./SetOrderPayment/definition";
import {setOrderStatusDefinition} from "./SetOrderStatus/definition";
import {setOrderStatusesDefinition} from "./SetOrderStatuses/definition";
import {setOrderReceiptDefinition} from "./SetOrderReceipt/definition";
import {addOrderInvoiceFileDefinition} from "./AddOrderInvoiceFile/definition";
import {addOrderReceiptFileDefinition} from "./AddOrderReceiptFile/definition";
import {getInvoiceFileDefinition} from "./GetInvoiceFile/definition";
import {runOrderMacroTriggerDefinition} from "./RunOrderMacroTrigger/definition";

export const ordersDefinition: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					Resource.Orders
				],
			},
		},
		options: [
			// Orders
			{
				name: 'Get Journal List',
				value: OrdersMethod.GetJournalList,
				description: 'The method allows you to download a list of order events from the last 3 days',
				action: 'Gets journal list',
			},
			{
				name: 'Add Order',
				value: OrdersMethod.AddOrder,
				description: 'The method allows adding a new order to the BaseLinker order manager',
				action: 'Add order',
			},
			{
				name: 'Get Order Sources',
				value: OrdersMethod.GetOrderSources,
				description: 'The method returns types of order sources along with their IDs. Order sources are grouped by their type that corresponds to a field order_source from the getOrders method. Available source types are "personal", "shop" or "marketplace_code" e.g. "ebay", "amazon", "ceneo", "emag", "allegro", etc.',
				action: 'Gets types of order sources along with their IDS',
			},
			{
				name: 'Get Order Extra Fields',
				value: OrdersMethod.GetOrderExtraFields,
				description: 'The method returns extra fields defined for the orders. Values of those fields can be set with method setOrderFields. In order to retrieve values of those fields set parameter include_custom_extra_fields in method getOrders',
				action: 'Gets extra fields defined for the orders',
			},
			{
				name: 'Get Orders',
				value: OrdersMethod.GetOrders,
				description: 'The method allows you to download orders from a specific date from the BaseLinker order manager. The order list can be limited using the filters described in the method parameters. A maximum of 100 orders are returned at a time.\n' +
					'\n' +
					'It is recommended to download only confirmed orders (get_unconfirmed_orders = false). Unconfirmed orders may be incomplete. The user may be, for example, in the process of creating an order - it already exists in the database, but not all information is completed. Unconfirmed orders may contain only a partial list of products and may be changed soon. Confirmed orders usually do not change anymore and can be safely downloaded to an external system.\n' +
					'\n' +
					'The best way to download the ongoing orders is:\n' +
					'Collecting new order identifiers using getJournalList.\n' +
					'\n' +
					'Or, using this method:\n' +
					'1. Setting the starting date and specifying it in the date_confirmed_from field\n' +
					'2. Processing of all received orders. If 100 orders are received, there may be even more to download.\n' +
					'3. Downloading the next package of orders by entering the value of the date_confirmed field from last downloaded order in the date_confirmed_from field. In order to avoid downloading the same orders value of date_confirmed should be increased by 1 second. This operation is repeated until you receive a package with less than 100 orders (this means that there are no more orders left to download).\n' +
					'4. Saving the date_confirmed last processed order. You can download orders from this date onwards so that you do not download the same order twice. It is not possible for an order to \'jump\' into the database with an earlier confirmation date. This way you can be sure that all confirmed orders have been downloaded. ',
				action: 'Get orders from a specific date from the order manager',
			},
			{
				name: 'Get Order Transaction Details',
				value: OrdersMethod.GetOrderTransactionDetails,
				description: 'The method allows you to retrieve transaction details for a selected order (it now works only for orders from Amazon)',
				action: 'Gets transaction details for a selected order',
			},
			{
				name: 'Get Orders By Email',
				value: OrdersMethod.GetOrdersByEmail,
				description: 'The method allows to search for orders related to the given e-mail address. This function is designed to be used in plugins for mail clients (Thunderbird, Outlook, etc.).',
				action: 'Gets orders related to the given email address',
			},
			{
				name: 'Get Orders By Phone',
				value: OrdersMethod.GetOrdersByPhone,
				description: 'The method allows you to search for orders related to the given phone number. This function is intended for use in caller recognition programs.',
				action: 'Gets orders related to the given phone number',
			},
			{
				name: 'Add Invoice',
				value: OrdersMethod.AddInvoice,
				description: 'The method allows to issue an order invoice',
				action: 'Add an order invoice',
			},
			{
				name: 'Get Invoices',
				value: OrdersMethod.GetInvoices,
				description: 'The method allows you to download invoices issued from the BaseLinker order manager. The list of invoices can be limited using filters described in the method parameters. Maximum 100 invoices are returned at a time.',
				action: 'Gets invoices from the order manager',
			},
			{
				name: 'Get Series',
				value: OrdersMethod.GetSeries,
				description: 'The method allows to download a series of invoice/receipt numbering',
				action: 'Gets series of invoice and receipt numbering',
			},
			{
				name: 'Get Order Status List',
				value: OrdersMethod.GetOrderStatusList,
				description: 'The method allows you to download order statuses created by the customer in the BaseLinker order manager',
				action: 'Gets order statues created by the customer in order manager',
			},
			{
				name: 'Get Order Payment History',
				value: OrdersMethod.GetOrderPaymentsHistory,
				description: 'The method allows you to retrieve payment history for a selected order, including an external payment identifier from the payment gateway. One order can have multiple payment history entries, caused by surcharges, order value changes, manual payment editing.',
				action: 'Gets payment history for a selected order',
			},
			{
				name: 'Get New Receipts',
				value: OrdersMethod.GetNewReceipts,
				description: 'The method allows you to retrieve receipts waiting to be issued. This method should be used in creating integration with a fiscal printer. The method can be requested for new receipts every e.g. 10 seconds. If any receipts appear in response, they should be confirmed by the setOrderReceipt method after printing to disappear from the waiting list.',
				action: 'Gets receipts waiting to be issued',
			},
			{
				name: 'Get Receipt',
				value: OrdersMethod.GetReceipt,
				description: 'The method allows you to retrieve a single receipt from the BaseLinker order manager. To retrieve a list of new receipts (when integrating a fiscal printer), use the getNewReceipts method.',
				action: 'Gets a single receipt from order manager',
			},
			{
				name: 'Set Order Fields',
				value: OrdersMethod.SetOrderFields,
				description: 'The method allows you to edit selected fields (e.g. address data, notes, etc.) of a specific order. Only the fields that you want to edit should be given, other fields can be omitted in the request.',
				action: 'Edit selected fields of a specific order',
			},
			{
				name: 'Add Order Product',
				value: OrdersMethod.AddOrderProduct,
				description: 'The method allows you to add a new product to your order',
				action: 'Add a new product to order',
			},
			{
				name: 'Set Order Product Fields',
				value: OrdersMethod.SetOrderProductFields,
				description: 'The method allows you to edit the data of selected items (e.g. prices, quantities etc.) of a specific order. Only the fields that you want to edit should be given, the remaining fields can be omitted in the request.',
				action: 'Edit selected items of a specific order',
			},
			{
				name: 'Delete Order Product',
				value: OrdersMethod.DeleteOrderProduct,
				description: 'The method allows you to remove a specific product from the order',
				action: 'Remove a specific product from the order',
			},
			{
				name: 'Set Order Payment',
				value: OrdersMethod.SetOrderPayment,
				description: 'The method allows you to add a payment to the order',
				action: 'Add a payment to the order',
			},
			{
				name: 'Set Order Status',
				value: OrdersMethod.SetOrderStatus,
				description: 'The method allows you to change order status',
				action: 'Change order status',
			},
			{
				name: 'Set Order Statuses',
				value: OrdersMethod.SetOrderStatuses,
				description: 'The method allows you to batch set orders statuses',
				action: 'Change orders statuses',
			},
			{
				name: 'Set Order Receipt',
				value: OrdersMethod.SetOrderReceipt,
				description: 'The method allows you to mark orders with a receipt already issued',
				action: 'Mark orders with a receipt already issued',
			},
			{
				name: 'Add Order Invoice File',
				value: OrdersMethod.AddOrderInvoiceFile,
				description: 'The method allows you to add an external PDF file to an invoice previously issued from BaseLinker. It enables replacing a standard invoice from BaseLinker with an invoice issued e.g. in an ERP program.',
				action: 'Add an external pdf file to an invoice previously issued from base linker',
			},
			{
				name: 'Add Order Receipt File',
				value: OrdersMethod.AddOrderReceiptFile,
				description: 'The method allows you to add an external PDF file to a receipt previously issued from BaseLinker. It enables replacing a standard receipt from BaseLinker with a receipt issued e.g. in an ERP program.',
				action: 'Add an external pdf file to a receipt previously issued from base linker',
			},
			{
				name: 'Get Invoice File',
				value: OrdersMethod.GetInvoiceFile,
				description: 'The method allows you to get the invoice file from BaseLinker',
				action: 'Gets the invoice file',
			},
			{
				name: 'Run Order Macro Trigger',
				value: OrdersMethod.RunOrderMacroTrigger,
				description: 'The method allows you to run personal trigger for orders automatic actions',
				action: 'Run personal trigger for orders automatic actions',
			},
		],
		// default: OrdersMethod.GetOrders.toString(),
		default: '',
		noDataExpression: true,
	},
	...getJournalListDefinition,
	...addOrderDefinition,
	...getOrderSourcesDefinition,
	...getOrderExtraFieldsDefinition,
	...getOrdersDefinition,
	...getOrderTransactionDetailsDefinition,
	...getOrdersByEmailDefinition,
	...getOrdersByPhoneDefinition,
	...addInvoiceDefinition,
	...getInvoicesDefinition,
	...getSeriesDefinition,
	...getOrderStatusListDefinition,
	...getOrderPaymentsHistoryDefinition,
	...getNewReceiptsDefinition,
	...getReceiptDefinition,
	...setOrderFieldsDefinition,
	...addOrderProductDefinition,
	...setOrderProductFieldsDefinition,
	...deleteOrderProductDefinition,
	...setOrderPaymentDefinition,
	...setOrderStatusDefinition,
	...setOrderStatusesDefinition,
	...setOrderReceiptDefinition,
	...addOrderInvoiceFileDefinition,
	...addOrderReceiptFileDefinition,
	...getInvoiceFileDefinition,
	...runOrderMacroTriggerDefinition,
];
