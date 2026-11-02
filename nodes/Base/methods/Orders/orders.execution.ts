import {IExecuteFunctions} from "n8n-core";
import {OrdersMethod} from "../types";
import zod from "zod";

import {getJournalListExecution} from "./GetJournalList/execution";
import {addOrderExecution} from "./AddOrder/execution";
import {getOrderSourcesExecution} from "./GetOrderSources/execution";
import {getOrderExtraFieldsExecution} from "./GetOrderExtraFields/execution";
import {getOrdersExecution} from "./GetOrders/execution";
import {getOrderTransactionDetailsExecution} from "./GetOrderTransactionDetails/execution";
import {getOrdersByEmailExecution} from "./GetOrdersByEmail/execution";
import {getOrdersByPhoneExecution} from "./GetOrdersByPhone/execution";
import {addInvoiceExecution} from "./AddInvoice/execution";
import {getInvoicesExecution} from "./GetInvoices/execution";
import {getSeriesExecution} from "./GetSeries/execution";
import {getOrderStatusListExecution} from "./GetOrderStatusList/execution";
import {getOrderPaymentsHistoryExecution} from "./GetOrderPaymentsHistory/execution";
import {getNewReceiptsExecution} from "./GetNewReceipts/execution";
import {getReceiptExecution} from "./GetReceipt/execution";
import {setOrderFieldsExecution} from "./SetOrderFields/execution";
import {addOrderProductExecution} from "./AddOrderProduct/execution";
import {setOrderProductFieldsExecution} from "./SetOrderProductFields/execution";
import {deleteOrderProductExecution} from "./DeleteOrderProduct/execution";
import {setOrderPaymentExecution} from "./SetOrderPayment/execution";
import {setOrderStatusExecution} from "./SetOrderStatus/execution";
import {setOrderStatusesExecution} from "./SetOrderStatuses/execution";
import {setOrderReceiptExecution} from "./SetOrderReceipt/execution";
import {addOrderInvoiceFileExecution} from "./AddOrderInvoiceFile/execution";
import {addOrderReceiptFileExecution} from "./AddOrderReceiptFile/execution";
import {getInvoiceFileExecution} from "./GetInvoiceFile/execution";
import {runOrderMacroTriggerExecution} from "./RunOrderMacroTrigger/execution";

export async function ordersExecution(
	data: IExecuteFunctions,
	apiKey: string,
	operation: string,
	category: string,
	i: number,
) {
	if (operation === OrdersMethod.GetJournalList) {
		const schema = zod.object({
			last_log_id: zod.number(),
			logs_types: zod.array(
				zod.number()
			),
			order_id: zod.number().nullish()
		});

		const metadataArraySchema = zod.array(zod.object({
			event_id: zod.number(),
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema,
		})

		const logs_types = metadataObjectSchema.parse(data.getNodeParameter('logs_types', i)).metadataValues?.map(el => el.event_id);

		return await getJournalListExecution({
			apiKey: apiKey,
			input: schema.parse({
				last_log_id: data.getNodeParameter('last_log_id', i),
				logs_types,
				order_id: data.getNodeParameter('order_id', i),
			})
		});
	}

	if (operation === OrdersMethod.AddOrder) {
		const schema = zod.object({
			currency: zod.string(),
			email: zod.string().email({message: "🚨 Invalid email address!"}),
			products: zod.array(
				zod.record(zod.string(), zod.union([
					zod.string(), zod.number()
				]))
			),
		});

		const schemaAdditionalFields = zod.object({
			order_status_id: zod.number().nullish(),
			custom_source_id: zod.number().nullish(),
			payment_method: zod.string().nullish(),
			payment_method_cod: zod.boolean().nullish(),
			paid: zod.boolean().nullish(),
			user_comments: zod.string().nullish(),
			admin_comments: zod.string().nullish(),
			phone: zod.string().nullish(),
			user_login: zod.string().nullish(),
			delivery_method: zod.string().nullish(),
			delivery_price: zod.number().nullish(),
			delivery_fullname: zod.string().nullish(),
			delivery_company: zod.string().nullish(),
			delivery_address: zod.string().nullish(),
			delivery_postcode: zod.string().nullish(),
			delivery_city: zod.string().nullish(),
			delivery_state: zod.string().nullish(),
			delivery_country_code: zod.string().nullish(),
			delivery_point_id: zod.string().nullish(),
			delivery_point_name: zod.string().nullish(),
			delivery_point_address: zod.string().nullish(),
			delivery_point_postcode: zod.string().nullish(),
			delivery_point_city: zod.string().nullish(),
			invoice_fullname: zod.string().nullish(),
			invoice_company: zod.string().nullish(),
			invoice_nip: zod.string().nullish(),
			invoice_address: zod.string().nullish(),
			invoice_postcode: zod.string().nullish(),
			invoice_city: zod.string().nullish(),
			invoice_state: zod.string().nullish(),
			invoice_country_code: zod.string().nullish(),
			want_invoice: zod.boolean().nullish(),
			extra_field_1: zod.string().nullish(),
			extra_field_2: zod.string().nullish(),
			custom_extra_fields: zod.record(
				zod.string(), zod.union([
					zod.string(),
					zod.record(zod.string(), zod.string())
				])
			).nullish()
		})

		const metadataArraySchemaOfProducts = zod.array(zod.object({
			storage: zod.string().nullish(),
			storage_id: zod.number().nullish(),
			product_id: zod.string(),
			variant_id: zod.number().nullish(),
			name: zod.string(),
			sku: zod.string().nullish(),
			ean: zod.string().nullish(),
			location: zod.string().nullish(),
			warehouse_id: zod.number().nullish(),
			attributes: zod.string().nullish(),
			price_brutto: zod.number().nonnegative(),
			tax_rate: zod.number().nonnegative(),
			quantity: zod.number().gt(0, {message: '🚨 Quantity is to small!'}),
			weight: zod.number().nullish(),
		}))


		const metadataObjectSchemaOfProducts = zod.object({
			metadataValues: metadataArraySchemaOfProducts,
		})

		const products = metadataObjectSchemaOfProducts.parse(
			data.getNodeParameter('products', i)).metadataValues?.map(el => {
				if (el.tax_rate < 1) {
					el.tax_rate = el.tax_rate *= 100;
				}

				return {
					"storage": el.storage,
					"storage_id": el.storage_id,
					"product_id": el.product_id,
					"variant_id": el.variant_id,
					"name": el.name,
					"sku": el.sku,
					"ean": el.ean,
					"location": el.location,
					"warehouse_id": el.warehouse_id,
					"attributes": el.attributes,
					"price_brutto": el.price_brutto,
					"tax_rate": el.tax_rate,
					"quantity": el.quantity,
					"weight": el.weight,
				}
			}
		);
		console.log(JSON.stringify(products))


		const additionalFields = data.getNodeParameter('additionalFields', i);
		let preparedObjectForCustomExtraFields = undefined;


		const metadataArraySchemaForCustomExtraFields = zod.array(zod.object({
				extra_field_id: zod.string(),
				extra_field_name: zod.string().nullish(),
				extra_field_value: zod.string(),
			})
		)

		const metadataObjectSchemaForCustomExtraFields = zod.object({
			metadataValues: metadataArraySchemaForCustomExtraFields,
		})

		if (additionalFields.custom_extra_fields !== undefined) {
			preparedObjectForCustomExtraFields = metadataObjectSchemaForCustomExtraFields.parse(additionalFields.custom_extra_fields).metadataValues?.reduce((prev, curr) => {
				if (curr.extra_field_name) {
					prev[`extra_field_${curr.extra_field_id}`] = {
						"title": curr.extra_field_name,
						"payload": curr.extra_field_value
					}
					return prev;
				}
				prev[`extra_field_${curr.extra_field_id}`] = curr.extra_field_value
				return prev;
			}, {} as Record<string, string | { [key: string]: string }>)
		}
		console.log(JSON.stringify(preparedObjectForCustomExtraFields));

		return await addOrderExecution({
			apiKey: apiKey,
			input: {
				...schema.parse({
					currency: data.getNodeParameter('currency', i),
					email: data.getNodeParameter('email', i),
					products,
				}),
				...schemaAdditionalFields.parse({
					order_status_id: additionalFields.order_status_id,
					custom_source_id: additionalFields.custom_source_id,
					payment_method: additionalFields.payment_method,
					payment_method_cod: additionalFields.payment_method_cod,
					paid: additionalFields.paid,
					user_comments: additionalFields.user_comments,
					admin_comments: additionalFields.admin_comments,
					phone: additionalFields.phone,
					user_login: additionalFields.user_login,
					delivery_method: additionalFields.delivery_method,
					delivery_price: additionalFields.delivery_price,
					delivery_fullname: additionalFields.delivery_fullname,
					delivery_company: additionalFields.delivery_company,
					delivery_address: additionalFields.delivery_address,
					delivery_postcode: additionalFields.delivery_postcode,
					delivery_city: additionalFields.delivery_city,
					delivery_state: additionalFields.delivery_state,
					delivery_country_code: additionalFields.delivery_country_code,
					delivery_point_id: additionalFields.delivery_point_id,
					delivery_point_name: additionalFields.delivery_point_name,
					delivery_point_address: additionalFields.delivery_point_address,
					delivery_point_postcode: additionalFields.delivery_point_postcode,
					delivery_point_city: additionalFields.delivery_point_city,
					invoice_fullname: additionalFields.invoice_fullname,
					invoice_company: additionalFields.invoice_company,
					invoice_nip: additionalFields.invoice_nip,
					invoice_address: additionalFields.invoice_address,
					invoice_postcode: additionalFields.invoice_postcode,
					invoice_city: additionalFields.invoice_city,
					invoice_state: additionalFields.invoice_state,
					invoice_country_code: additionalFields.invoice_country_code,
					want_invoice: additionalFields.want_invoice,
					extra_field_1: additionalFields.extra_field_1,
					extra_field_2: additionalFields.extra_field_2,
					custom_extra_fields: preparedObjectForCustomExtraFields
				})
			}
		});
	}

	if (operation === OrdersMethod.GetOrderSources) {
		return await getOrderSourcesExecution({
			apiKey: apiKey
		});
	}

	if (operation === OrdersMethod.GetOrderExtraFields) {
		return await getOrderExtraFieldsExecution({
			apiKey: apiKey
		});
	}

	if (operation === OrdersMethod.GetOrders) {
		const schema = zod.object({
			order_id: zod.number().nullish(),
			date_confirmed_from: zod.number().nullish(),
			date_from: zod.number().nullish(),
			id_from: zod.number().nullish(),
			get_unconfirmed_orders: zod.boolean().nullish(),
			include_custom_extra_fields: zod.boolean().nullish(),
			status_id: zod.number().nullish(),
			filter_email: zod.string().nullish(),
			filter_order_source: zod.string().nullish(),
			filter_order_source_id: zod.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getOrdersExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_id: additionalFields.order_id,
				date_confirmed_from: additionalFields.date_confirmed_from,
				date_from: additionalFields.date_from,
				id_from: additionalFields.id_from,
				get_unconfirmed_orders: additionalFields.get_unconfirmed_orders,
				include_custom_extra_fields: additionalFields.include_custom_extra_fields,
				status_id: additionalFields.status_id,
				filter_email: additionalFields.filter_email,
				filter_order_source: additionalFields.filter_order_source,
				filter_order_source_id: additionalFields.filter_order_source_id,
			})
		});
	}

	if (operation === OrdersMethod.GetOrderTransactionDetails) {
		const schema = zod.object({
			order_id: zod.number(),
		});

		return await getOrderTransactionDetailsExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
			})
		});
	}

	if (operation === OrdersMethod.GetOrdersByEmail) {
		const schema = zod.object({
			email: zod.string(),
		});

		return await getOrdersByEmailExecution({
			apiKey: apiKey,
			input: schema.parse({
				email: data.getNodeParameter('email', i),
			})
		});
	}

	if (operation === OrdersMethod.GetOrdersByPhone) {
		const schema = zod.object({
			phone: zod.string(),
		});

		return await getOrdersByPhoneExecution({
			apiKey: apiKey,
			input: schema.parse({
				phone: data.getNodeParameter('phone', i),
			})
		});
	}

	if (operation === OrdersMethod.AddInvoice) {
		const schema = zod.object({
			order_id: zod.number(),
			series_id: zod.number(),
			vat_rate: zod.union([
				zod.string(), zod.number()
			]).nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);
		let preparedVatRateValue = undefined;

		if (additionalFields.vat_rate !== undefined) {
			switch (additionalFields.vat_rate!.toString().toUpperCase()) {
				case 'DEFAULT':
					preparedVatRateValue = 'DEFAULT';
					break;
				case 'ITEM':
					preparedVatRateValue = 'ITEM';
					break;
				case 'EXPT':
					preparedVatRateValue = 'EXPT';
					break;
				case 'ZW':
					preparedVatRateValue = 'ZW';
					break;
				case 'NP':
					preparedVatRateValue = 'NP';
					break;
				case 'OO':
					preparedVatRateValue = 'OO';
					break;
			}

			if (additionalFields.vat_rate! >= 0 && additionalFields.vat_rate! <= 100) {
				preparedVatRateValue = additionalFields.vat_rate;
				if (typeof preparedVatRateValue === "string") {
					parseFloat(preparedVatRateValue)
				}
			}

			if (preparedVatRateValue === undefined) {
				throw new Error('🚨 Invalid value for Vat Rate! See description.');
			}
		}


		return await addInvoiceExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				series_id: data.getNodeParameter('series_id', i),
				vat_rate: preparedVatRateValue,
			})
		});
	}

	if (operation === OrdersMethod.GetInvoices) {
		const schema = zod.object({
			invoice_id: zod.number().nullish(),
			order_id: zod.number().nullish(),
			date_from: zod.number().nullish(),
			id_from: zod.number().nullish(),
			series_id: zod.number().nullish(),
			get_external_invoices: zod.boolean().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getInvoicesExecution({
			apiKey: apiKey,
			input: schema.parse({
				invoice_id: additionalFields.invoice_id,
				order_id: additionalFields.order_id,
				date_from: additionalFields.date_from,
				id_from: additionalFields.id_from,
				series_id: additionalFields.series_id,
				get_external_invoices: additionalFields.get_external_invoices,
			})
		});
	}

	if (operation === OrdersMethod.GetSeries) {
		return await getSeriesExecution({
			apiKey: apiKey
		});
	}

	if (operation === OrdersMethod.GetOrderStatusList) {
		return await getOrderStatusListExecution({
			apiKey: apiKey
		});
	}

	if (operation === OrdersMethod.GetOrderPaymentsHistory) {
		const schema = zod.object({
			order_id: zod.number(),
			show_full_history: zod.boolean().nullish()
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getOrderPaymentsHistoryExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				show_full_history: additionalFields.show_full_history,
			})
		});
	}

	if (operation === OrdersMethod.GetNewReceipts) {
		const schema = zod.object({
			series_id: zod.number().nullish(),
			id_from: zod.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getNewReceiptsExecution({
			apiKey: apiKey,
			input: schema.parse({
				series_id: additionalFields.series_id,
				id_from: additionalFields.id_from,
			})
		});
	}

	if (operation === OrdersMethod.GetReceipt) {
		const schema = zod.object({
			receipt_id: zod.number().nullish(),
			order_id: zod.number().nullish(),
		});

		const receipt_id = data.getNodeParameter('receipt_id', i);
		const order_id = data.getNodeParameter('order_id', i);

		if (!receipt_id && !order_id) {
			throw new Error('🚨 One of the values must be completed! See description.')
		}

		return await getReceiptExecution({
			apiKey: apiKey,
			input: schema.parse({
				receipt_id,
				order_id,
			})
		});
	}

	if (operation === OrdersMethod.SetOrderFields) {
		const schemaAdditionalFields = zod.object({
			admin_comments: zod.string().nullish(),
			user_comments: zod.string().nullish(),
			payment_method: zod.string().nullish(),
			payment_method_cod: zod.boolean().nullish(),
			email: zod.string().nullish(),
			phone: zod.string().nullish(),
			user_login: zod.string().nullish(),
			delivery_method: zod.string().nullish(),
			delivery_price: zod.number().nullish(),
			delivery_fullname: zod.string().nullish(),
			delivery_company: zod.string().nullish(),
			delivery_address: zod.string().nullish(),
			delivery_postcode: zod.string().nullish(),
			delivery_city: zod.string().nullish(),
			delivery_state: zod.string().nullish(),
			delivery_country_code: zod.string().nullish(),
			delivery_point_id: zod.string().nullish(),
			delivery_point_name: zod.string().nullish(),
			delivery_point_address: zod.string().nullish(),
			delivery_point_postcode: zod.string().nullish(),
			delivery_point_city: zod.string().nullish(),
			invoice_fullname: zod.string().nullish(),
			invoice_company: zod.string().nullish(),
			invoice_nip: zod.string().nullish(),
			invoice_address: zod.string().nullish(),
			invoice_postcode: zod.string().nullish(),
			invoice_city: zod.string().nullish(),
			invoice_state: zod.string().nullish(),
			invoice_country_code: zod.string().nullish(),
			want_invoice: zod.boolean().nullish(),
			extra_field_1: zod.string().nullish(),
			extra_field_2: zod.string().nullish(),
			custom_extra_fields: zod.record(
				zod.string(), zod.union([
					zod.string(),
					zod.record(zod.string(), zod.string())
				])
			).nullish(),
			pick_state: zod.number().nullish(),
			pack_state: zod.number().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);
		let preparedObjectForCustomExtraFields = undefined;

		const metadataArraySchemaForCustomExtraFields = zod.array(zod.object({
				extra_field_id: zod.string(),
				extra_field_name: zod.string().nullish(),
				extra_field_value: zod.string(),
			})
		)

		const metadataObjectSchemaForCustomExtraFields = zod.object({
			metadataValues: metadataArraySchemaForCustomExtraFields,
		})

		if (additionalFields.custom_extra_fields !== undefined) {
			preparedObjectForCustomExtraFields = metadataObjectSchemaForCustomExtraFields.parse(additionalFields.custom_extra_fields).metadataValues?.reduce((prev, curr) => {
				if (curr.extra_field_name) {
					prev[`extra_field_${curr.extra_field_id}`] = {
						"title": curr.extra_field_name,
						"payload": curr.extra_field_value
					}
					return prev;
				}
				prev[`extra_field_${curr.extra_field_id}`] = curr.extra_field_value
				return prev;
			}, {} as Record<string, string | { [key: string]: string }>)
		}
		console.log(JSON.stringify(preparedObjectForCustomExtraFields));

		return await setOrderFieldsExecution({
			apiKey: apiKey,
			input: {
				order_id: data.getNodeParameter('order_id', i) as number,
				...schemaAdditionalFields.parse({
					admin_comments: additionalFields.admin_comments,
					user_comments: additionalFields.user_comments,
					payment_method: additionalFields.payment_method,
					payment_method_cod: additionalFields.payment_method_cod,
					email: additionalFields.email,
					phone: additionalFields.phone,
					user_login: additionalFields.user_login,
					delivery_method: additionalFields.delivery_method,
					delivery_price: additionalFields.delivery_price,
					delivery_fullname: additionalFields.delivery_fullname,
					delivery_company: additionalFields.delivery_company,
					delivery_address: additionalFields.delivery_address,
					delivery_postcode: additionalFields.delivery_postcode,
					delivery_city: additionalFields.delivery_city,
					delivery_state: additionalFields.delivery_state,
					delivery_country_code: additionalFields.delivery_country_code,
					delivery_point_id: additionalFields.delivery_point_id,
					delivery_point_name: additionalFields.delivery_point_name,
					delivery_point_address: additionalFields.delivery_point_address,
					delivery_point_postcode: additionalFields.delivery_point_postcode,
					delivery_point_city: additionalFields.delivery_point_city,
					invoice_fullname: additionalFields.invoice_fullname,
					invoice_company: additionalFields.invoice_company,
					invoice_nip: additionalFields.invoice_nip,
					invoice_address: additionalFields.invoice_address,
					invoice_postcode: additionalFields.invoice_postcode,
					invoice_city: additionalFields.invoice_city,
					invoice_state: additionalFields.invoice_state,
					invoice_country_code: additionalFields.invoice_country_code,
					want_invoice: additionalFields.want_invoice,
					extra_field_1: additionalFields.extra_field_1,
					extra_field_2: additionalFields.extra_field_2,
					custom_extra_fields: preparedObjectForCustomExtraFields,
					pick_state: additionalFields.pick_state,
					pack_state: additionalFields.pack_state,
				})
			}
		});
	}

	if (operation === OrdersMethod.AddOrderProduct) {
		const schema = zod.object({
			order_id: zod.number(),
			product_id: zod.string(),
			price_brutto: zod.number().nonnegative(),
			tax_rate: zod.number().nonnegative(),
			quantity: zod.number().gt(0, {message: '🚨 Quantity is to small!'}),
		});

		const schemaAdditionalFields = zod.object({
			storage: zod.string().nullish(),
			storage_id: zod.string().nullish(),
			variant_id: zod.string().nullish(),
			auction_id: zod.string().nullish(),
			name: zod.string().nullish(),
			sku: zod.string().nullish(),
			ean: zod.string().nullish(),
			location: zod.string().nullish(),
			warehouse_id: zod.number().nullish(),
			attributes: zod.string().nullish(),
			weight: zod.number().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);


		return await addOrderProductExecution({
			apiKey: apiKey,
			input: {
				...schema.parse({
					order_id: data.getNodeParameter('order_id', i),
					product_id: data.getNodeParameter('product_id', i),
					price_brutto: data.getNodeParameter('price_brutto', i),
					tax_rate: data.getNodeParameter('tax_rate', i),
					quantity: data.getNodeParameter('quantity', i),
				}),
				...schemaAdditionalFields.parse({
					storage: additionalFields.storage,
					storage_id: additionalFields.storage_id,
					variant_id: additionalFields.variant_id,
					auction_id: additionalFields.auction_id,
					name: additionalFields.name,
					sku: additionalFields.sku,
					ean: additionalFields.ean,
					location: additionalFields.location,
					warehouse_id: additionalFields.warehouse_id,
					attributes: additionalFields.attributes,
					weight: additionalFields.weight,
				})
			}
		});
	}

	if (operation === OrdersMethod.SetOrderProductFields) {
		const schema = zod.object({
			order_id: zod.number(),
			order_product_id: zod.number(),
		});

		const schemaAdditionalFields = zod.object({
			storage: zod.string().nullish(),
			storage_id: zod.string().nullish(),
			product_id: zod.string().nullish(),
			variant_id: zod.string().nullish(),
			auction_id: zod.string().nullish(),
			name: zod.string().nullish(),
			sku: zod.string().nullish(),
			ean: zod.string().nullish(),
			location: zod.string().nullish(),
			warehouse_id: zod.number().nullish(),
			attributes: zod.string().nullish(),
			price_brutto: zod.number().nonnegative().nullish(),
			tax_rate: zod.number().nonnegative().nullish(),
			quantity: zod.number().gt(0, {message: '🚨 Quantity is to small!'}).nullish(),
			weight: zod.number().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await setOrderProductFieldsExecution({
			apiKey: apiKey,
			input: {
				...schema.parse({
					order_id: data.getNodeParameter('order_id', i),
					order_product_id: data.getNodeParameter('order_product_id', i),
				}),
				...schemaAdditionalFields.parse({
					storage: additionalFields.storage,
					storage_id: additionalFields.storage_id,
					product_id: additionalFields.product_id,
					variant_id: additionalFields.variant_id,
					auction_id: additionalFields.auction_id,
					name: additionalFields.name,
					sku: additionalFields.sku,
					ean: additionalFields.ean,
					location: additionalFields.location,
					warehouse_id: additionalFields.warehouse_id,
					attributes: additionalFields.attributes,
					price_brutto: additionalFields.price_brutto,
					tax_rate: additionalFields.tax_rate,
					quantity: additionalFields.quantity,
					weight: additionalFields.weight,
				})
			}
		});
	}

	if (operation === OrdersMethod.DeleteOrderProduct) {
		const schema = zod.object({
			order_id: zod.number(),
			order_product_id: zod.number(),
		});

		return await deleteOrderProductExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				order_product_id: data.getNodeParameter('order_product_id', i),
			}),
		});
	}

	if (operation === OrdersMethod.SetOrderPayment) {
		const schema = zod.object({
			order_id: zod.number(),
			payment_done: zod.number(),
			payment_date: zod.number(),
			payment_comment: zod.string(),
		});

		const schemaAdditionalFields = zod.object({
			external_payment_id: zod.string().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await setOrderPaymentExecution({
			apiKey: apiKey,
			input: {
				...schema.parse({
					order_id: data.getNodeParameter('order_id', i),
					order_product_id: data.getNodeParameter('order_product_id', i),
					payment_date: data.getNodeParameter('payment_date', i),
					payment_comment: data.getNodeParameter('payment_comment', i),
				}),
				...schemaAdditionalFields.parse({
					external_payment_id: additionalFields.external_payment_id,
				})
			}
		});
	}

	if (operation === OrdersMethod.SetOrderStatus) {
		const schema = zod.object({
			order_id: zod.number(),
			status_id: zod.number(),
		});

		return await setOrderStatusExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				status_id: data.getNodeParameter('status_id', i),
			}),
		});
	}

	if (operation === OrdersMethod.SetOrderStatuses) {
		const schema = zod.object({
			order_ids: zod.array(zod.number()),
			status_id: zod.number(),
		});

		const metadataArraySchemaOfOrderIDs = zod.array(zod.object({
			order_id: zod.number(),
		}))

		const metadataObjectSchemaOfOrderIds = zod.object({
			metadataValues: metadataArraySchemaOfOrderIDs,
		})

		const order_ids = metadataObjectSchemaOfOrderIds.parse(
			data.getNodeParameter('order_ids', i)).metadataValues?.map(el => el.order_id);

		return await setOrderStatusesExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_ids,
				status_id: data.getNodeParameter('status_id', i),
			}),
		});
	}

	if (operation === OrdersMethod.SetOrderReceipt) {
		const schema = zod.object({
			receipt_id: zod.number(),
			date: zod.number(),
		});

		const schemaAdditionalFields = zod.object({
			receipt_nr: zod.string().nullish(),
			printer_error: zod.boolean().nullish(),
			printer_name: zod.string().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await setOrderReceiptExecution({
			apiKey: apiKey,
			input: {
				...schema.parse({
					receipt_id: data.getNodeParameter('receipt_id', i),
					date: data.getNodeParameter('date', i),
				}),
				...schemaAdditionalFields.parse({
					receipt_nr: additionalFields.receipt_nr,
					printer_error: additionalFields.printer_error,
					printer_name: additionalFields.printer_name,
				})
			}
		});
	}

	if (operation === OrdersMethod.AddOrderInvoiceFile) {
		const schema = zod.object({
			invoice_id: zod.number(),
			file: zod.string(),
			external_invoice_number: zod.string(),
		});

		let file = data.getNodeParameter('file', i);
		if (!file) {
			throw new Error('🚨 Field \'file\' Cannot be empty!');
		}
		if (!file?.toString().startsWith('data:')) {
			file = `data:${file}`;
		}

		return await addOrderInvoiceFileExecution({
			apiKey: apiKey,
			input: schema.parse({
				invoice_id: data.getNodeParameter('invoice_id', i),
				file,
				external_invoice_number: data.getNodeParameter('external_invoice_number', i),
			}),
		});
	}

	if (operation === OrdersMethod.AddOrderReceiptFile) {
		const schema = zod.object({
			receipt_id: zod.number(),
			file: zod.string(),
			external_receipt_number: zod.string(),
		});

		let file = data.getNodeParameter('file', i);
		if (!file) {
			throw new Error('🚨 Field \'file\' Cannot be empty!');
		}
		if (!file?.toString().startsWith('data:')) {
			file = `data:${file}`;
		}

		return await addOrderReceiptFileExecution({
			apiKey: apiKey,
			input: schema.parse({
				receipt_id: data.getNodeParameter('receipt_id', i),
				file,
				external_receipt_number: data.getNodeParameter('external_receipt_number', i),
			}),
		});
	}

	if (operation === OrdersMethod.GetInvoiceFile) {
		const schema = zod.object({
			invoice_id: zod.number(),
		});

		return await getInvoiceFileExecution({
			apiKey: apiKey,
			input: schema.parse({
				invoice_id: data.getNodeParameter('invoice_id', i),
			}),
		});
	}

	if (operation === OrdersMethod.RunOrderMacroTrigger) {
		const schema = zod.object({
			order_id: zod.number(),
			trigger_id: zod.number(),
		});

		return await runOrderMacroTriggerExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				trigger_id: data.getNodeParameter('trigger_id', i),
			}),
		});
	}
}
