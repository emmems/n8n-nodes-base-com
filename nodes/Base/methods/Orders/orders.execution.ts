import {IExecuteFunctions} from "n8n-workflow";
import {OrdersMethod} from "../types";
import validation from "../validation";

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
	operation: string,
	category: string,
	i: number,
) {
	if (operation === OrdersMethod.GetJournalList) {
		const schema = validation.object({
			last_log_id: validation.number(),
			logs_types: validation.array(
				validation.number()
			),
			order_id: validation.number().nullish()
		});

		const metadataArraySchema = validation.array(validation.object({
			event_id: validation.number(),
		}))

		const metadataObjectSchema = validation.object({
			metadataValues: metadataArraySchema,
		})

		const logs_types = metadataObjectSchema.parse(data.getNodeParameter('logs_types', i)).metadataValues?.map(el => el.event_id);

		return await getJournalListExecution({
			context: data,
			input: schema.parse({
				last_log_id: data.getNodeParameter('last_log_id', i),
				logs_types,
				order_id: data.getNodeParameter('order_id', i),
			})
		});
	}

	if (operation === OrdersMethod.AddOrder) {
		const schema = validation.object({
			currency: validation.string(),
			email: validation.string().email({message: "🚨 Invalid email address!"}),
			products: validation.array(
				validation.record(validation.string(), validation.union([
					validation.string(), validation.number()
				]))
			),
		});

		const schemaAdditionalFields = validation.object({
			order_status_id: validation.number().nullish(),
			custom_source_id: validation.number().nullish(),
			payment_method: validation.string().nullish(),
			payment_method_cod: validation.boolean().nullish(),
			paid: validation.boolean().nullish(),
			user_comments: validation.string().nullish(),
			admin_comments: validation.string().nullish(),
			phone: validation.string().nullish(),
			user_login: validation.string().nullish(),
			delivery_method: validation.string().nullish(),
			delivery_price: validation.number().nullish(),
			delivery_fullname: validation.string().nullish(),
			delivery_company: validation.string().nullish(),
			delivery_address: validation.string().nullish(),
			delivery_postcode: validation.string().nullish(),
			delivery_city: validation.string().nullish(),
			delivery_state: validation.string().nullish(),
			delivery_country_code: validation.string().nullish(),
			delivery_point_id: validation.string().nullish(),
			delivery_point_name: validation.string().nullish(),
			delivery_point_address: validation.string().nullish(),
			delivery_point_postcode: validation.string().nullish(),
			delivery_point_city: validation.string().nullish(),
			invoice_fullname: validation.string().nullish(),
			invoice_company: validation.string().nullish(),
			invoice_nip: validation.string().nullish(),
			invoice_address: validation.string().nullish(),
			invoice_postcode: validation.string().nullish(),
			invoice_city: validation.string().nullish(),
			invoice_state: validation.string().nullish(),
			invoice_country_code: validation.string().nullish(),
			want_invoice: validation.boolean().nullish(),
			extra_field_1: validation.string().nullish(),
			extra_field_2: validation.string().nullish(),
			custom_extra_fields: validation.record(
				validation.string(), validation.union([
					validation.string(),
					validation.record(validation.string(), validation.string())
				])
			).nullish()
		})

		const metadataArraySchemaOfProducts = validation.array(validation.object({
			storage: validation.string().nullish(),
			storage_id: validation.number().nullish(),
			product_id: validation.string(),
			variant_id: validation.number().nullish(),
			name: validation.string(),
			sku: validation.string().nullish(),
			ean: validation.string().nullish(),
			location: validation.string().nullish(),
			warehouse_id: validation.number().nullish(),
			attributes: validation.string().nullish(),
			price_brutto: validation.number().nonnegative(),
			tax_rate: validation.number().nonnegative(),
			quantity: validation.number().gt(0, {message: '🚨 Quantity is to small!'}),
			weight: validation.number().nullish(),
		}))


		const metadataObjectSchemaOfProducts = validation.object({
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


		const additionalFields = data.getNodeParameter('additionalFields', i);
		let preparedObjectForCustomExtraFields = undefined;


		const metadataArraySchemaForCustomExtraFields = validation.array(validation.object({
				extra_field_id: validation.string(),
				extra_field_name: validation.string().nullish(),
				extra_field_value: validation.string(),
			})
		)

		const metadataObjectSchemaForCustomExtraFields = validation.object({
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

		return await addOrderExecution({
			context: data,
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
			context: data,
		});
	}

	if (operation === OrdersMethod.GetOrderExtraFields) {
		return await getOrderExtraFieldsExecution({
			context: data,
		});
	}

	if (operation === OrdersMethod.GetOrders) {
		const schema = validation.object({
			order_id: validation.number().nullish(),
			date_confirmed_from: validation.number().nullish(),
			date_from: validation.number().nullish(),
			id_from: validation.number().nullish(),
			get_unconfirmed_orders: validation.boolean().nullish(),
			include_custom_extra_fields: validation.boolean().nullish(),
			status_id: validation.number().nullish(),
			filter_email: validation.string().nullish(),
			filter_order_source: validation.string().nullish(),
			filter_order_source_id: validation.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getOrdersExecution({
			context: data,
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
		const schema = validation.object({
			order_id: validation.number(),
		});

		return await getOrderTransactionDetailsExecution({
			context: data,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
			})
		});
	}

	if (operation === OrdersMethod.GetOrdersByEmail) {
		const schema = validation.object({
			email: validation.string(),
		});

		return await getOrdersByEmailExecution({
			context: data,
			input: schema.parse({
				email: data.getNodeParameter('email', i),
			})
		});
	}

	if (operation === OrdersMethod.GetOrdersByPhone) {
		const schema = validation.object({
			phone: validation.string(),
		});

		return await getOrdersByPhoneExecution({
			context: data,
			input: schema.parse({
				phone: data.getNodeParameter('phone', i),
			})
		});
	}

	if (operation === OrdersMethod.AddInvoice) {
		const schema = validation.object({
			order_id: validation.number(),
			series_id: validation.number(),
			vat_rate: validation.union([
				validation.string(), validation.number()
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

			const vatRate = additionalFields.vat_rate;
			const numericVatRate = typeof vatRate === 'string' && vatRate.trim() !== ''
				? Number(vatRate)
				: vatRate;
			if (typeof numericVatRate === 'number' && Number.isFinite(numericVatRate) && numericVatRate >= 0 && numericVatRate <= 100) {
				preparedVatRateValue = numericVatRate;
			}

			if (preparedVatRateValue === undefined) {
				throw new Error('🚨 Invalid value for Vat Rate! See description.');
			}
		}


		return await addInvoiceExecution({
			context: data,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				series_id: data.getNodeParameter('series_id', i),
				vat_rate: preparedVatRateValue,
			})
		});
	}

	if (operation === OrdersMethod.GetInvoices) {
		const schema = validation.object({
			invoice_id: validation.number().nullish(),
			order_id: validation.number().nullish(),
			date_from: validation.number().nullish(),
			id_from: validation.number().nullish(),
			series_id: validation.number().nullish(),
			get_external_invoices: validation.boolean().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getInvoicesExecution({
			context: data,
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
			context: data,
		});
	}

	if (operation === OrdersMethod.GetOrderStatusList) {
		return await getOrderStatusListExecution({
			context: data,
		});
	}

	if (operation === OrdersMethod.GetOrderPaymentsHistory) {
		const schema = validation.object({
			order_id: validation.number(),
			show_full_history: validation.boolean().nullish()
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getOrderPaymentsHistoryExecution({
			context: data,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				show_full_history: additionalFields.show_full_history,
			})
		});
	}

	if (operation === OrdersMethod.GetNewReceipts) {
		const schema = validation.object({
			series_id: validation.number().nullish(),
			id_from: validation.number().nullish(),
		});

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await getNewReceiptsExecution({
			context: data,
			input: schema.parse({
				series_id: additionalFields.series_id,
				id_from: additionalFields.id_from,
			})
		});
	}

	if (operation === OrdersMethod.GetReceipt) {
		const schema = validation.object({
			receipt_id: validation.number().nullish(),
			order_id: validation.number().nullish(),
		});

		const receipt_id = data.getNodeParameter('receipt_id', i);
		const order_id = data.getNodeParameter('order_id', i);

		if (!receipt_id && !order_id) {
			throw new Error('🚨 One of the values must be completed! See description.')
		}

		return await getReceiptExecution({
			context: data,
			input: schema.parse({
				receipt_id,
				order_id,
			})
		});
	}

	if (operation === OrdersMethod.SetOrderFields) {
		const schemaAdditionalFields = validation.object({
			admin_comments: validation.string().nullish(),
			user_comments: validation.string().nullish(),
			payment_method: validation.string().nullish(),
			payment_method_cod: validation.boolean().nullish(),
			email: validation.string().nullish(),
			phone: validation.string().nullish(),
			user_login: validation.string().nullish(),
			delivery_method: validation.string().nullish(),
			delivery_price: validation.number().nullish(),
			delivery_fullname: validation.string().nullish(),
			delivery_company: validation.string().nullish(),
			delivery_address: validation.string().nullish(),
			delivery_postcode: validation.string().nullish(),
			delivery_city: validation.string().nullish(),
			delivery_state: validation.string().nullish(),
			delivery_country_code: validation.string().nullish(),
			delivery_point_id: validation.string().nullish(),
			delivery_point_name: validation.string().nullish(),
			delivery_point_address: validation.string().nullish(),
			delivery_point_postcode: validation.string().nullish(),
			delivery_point_city: validation.string().nullish(),
			invoice_fullname: validation.string().nullish(),
			invoice_company: validation.string().nullish(),
			invoice_nip: validation.string().nullish(),
			invoice_address: validation.string().nullish(),
			invoice_postcode: validation.string().nullish(),
			invoice_city: validation.string().nullish(),
			invoice_state: validation.string().nullish(),
			invoice_country_code: validation.string().nullish(),
			want_invoice: validation.boolean().nullish(),
			extra_field_1: validation.string().nullish(),
			extra_field_2: validation.string().nullish(),
			custom_extra_fields: validation.record(
				validation.string(), validation.union([
					validation.string(),
					validation.record(validation.string(), validation.string())
				])
			).nullish(),
			pick_state: validation.number().nullish(),
			pack_state: validation.number().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);
		let preparedObjectForCustomExtraFields = undefined;

		const metadataArraySchemaForCustomExtraFields = validation.array(validation.object({
				extra_field_id: validation.string(),
				extra_field_name: validation.string().nullish(),
				extra_field_value: validation.string(),
			})
		)

		const metadataObjectSchemaForCustomExtraFields = validation.object({
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

		return await setOrderFieldsExecution({
			context: data,
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
		const schema = validation.object({
			order_id: validation.number(),
			product_id: validation.string(),
			price_brutto: validation.number().nonnegative(),
			tax_rate: validation.number().nonnegative(),
			quantity: validation.number().gt(0, {message: '🚨 Quantity is to small!'}),
		});

		const schemaAdditionalFields = validation.object({
			storage: validation.string().nullish(),
			storage_id: validation.string().nullish(),
			variant_id: validation.string().nullish(),
			auction_id: validation.string().nullish(),
			name: validation.string().nullish(),
			sku: validation.string().nullish(),
			ean: validation.string().nullish(),
			location: validation.string().nullish(),
			warehouse_id: validation.number().nullish(),
			attributes: validation.string().nullish(),
			weight: validation.number().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);


		return await addOrderProductExecution({
			context: data,
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
		const schema = validation.object({
			order_id: validation.number(),
			order_product_id: validation.number(),
		});

		const schemaAdditionalFields = validation.object({
			storage: validation.string().nullish(),
			storage_id: validation.string().nullish(),
			product_id: validation.string().nullish(),
			variant_id: validation.string().nullish(),
			auction_id: validation.string().nullish(),
			name: validation.string().nullish(),
			sku: validation.string().nullish(),
			ean: validation.string().nullish(),
			location: validation.string().nullish(),
			warehouse_id: validation.number().nullish(),
			attributes: validation.string().nullish(),
			price_brutto: validation.number().nonnegative().nullish(),
			tax_rate: validation.number().nonnegative().nullish(),
			quantity: validation.number().gt(0, {message: '🚨 Quantity is to small!'}).nullish(),
			weight: validation.number().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await setOrderProductFieldsExecution({
			context: data,
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
		const schema = validation.object({
			order_id: validation.number(),
			order_product_id: validation.number(),
		});

		return await deleteOrderProductExecution({
			context: data,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				order_product_id: data.getNodeParameter('order_product_id', i),
			}),
		});
	}

	if (operation === OrdersMethod.SetOrderPayment) {
		const schema = validation.object({
			order_id: validation.number(),
			payment_done: validation.number(),
			payment_date: validation.number(),
			payment_comment: validation.string(),
		});

		const schemaAdditionalFields = validation.object({
			external_payment_id: validation.string().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await setOrderPaymentExecution({
			context: data,
			input: {
				...schema.parse({
					order_id: data.getNodeParameter('order_id', i),
					payment_done: data.getNodeParameter('payment_done', i),
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
		const schema = validation.object({
			order_id: validation.number(),
			status_id: validation.number(),
		});

		return await setOrderStatusExecution({
			context: data,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				status_id: data.getNodeParameter('status_id', i),
			}),
		});
	}

	if (operation === OrdersMethod.SetOrderStatuses) {
		const schema = validation.object({
			order_ids: validation.array(validation.number()),
			status_id: validation.number(),
		});

		const metadataArraySchemaOfOrderIDs = validation.array(validation.object({
			order_id: validation.number(),
		}))

		const metadataObjectSchemaOfOrderIds = validation.object({
			metadataValues: metadataArraySchemaOfOrderIDs,
		})

		const order_ids = metadataObjectSchemaOfOrderIds.parse(
			data.getNodeParameter('order_ids', i)).metadataValues?.map(el => el.order_id);

		return await setOrderStatusesExecution({
			context: data,
			input: schema.parse({
				order_ids,
				status_id: data.getNodeParameter('status_id', i),
			}),
		});
	}

	if (operation === OrdersMethod.SetOrderReceipt) {
		const schema = validation.object({
			receipt_id: validation.number(),
			date: validation.number(),
		});

		const schemaAdditionalFields = validation.object({
			receipt_nr: validation.string().nullish(),
			printer_error: validation.boolean().nullish(),
			printer_name: validation.string().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await setOrderReceiptExecution({
			context: data,
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
		const schema = validation.object({
			invoice_id: validation.number(),
			file: validation.string(),
			external_invoice_number: validation.string(),
		});

		let file = data.getNodeParameter('file', i);
		if (!file) {
			throw new Error('🚨 Field \'file\' Cannot be empty!');
		}
		if (!file?.toString().startsWith('data:')) {
			file = `data:${file}`;
		}

		return await addOrderInvoiceFileExecution({
			context: data,
			input: schema.parse({
				invoice_id: data.getNodeParameter('invoice_id', i),
				file,
				external_invoice_number: data.getNodeParameter('external_invoice_number', i),
			}),
		});
	}

	if (operation === OrdersMethod.AddOrderReceiptFile) {
		const schema = validation.object({
			receipt_id: validation.number(),
			file: validation.string(),
			external_receipt_number: validation.string(),
		});

		let file = data.getNodeParameter('file', i);
		if (!file) {
			throw new Error('🚨 Field \'file\' Cannot be empty!');
		}
		if (!file?.toString().startsWith('data:')) {
			file = `data:${file}`;
		}

		return await addOrderReceiptFileExecution({
			context: data,
			input: schema.parse({
				receipt_id: data.getNodeParameter('receipt_id', i),
				file,
				external_receipt_number: data.getNodeParameter('external_receipt_number', i),
			}),
		});
	}

	if (operation === OrdersMethod.GetInvoiceFile) {
		const schema = validation.object({
			invoice_id: validation.number(),
		});

		return await getInvoiceFileExecution({
			context: data,
			input: schema.parse({
				invoice_id: data.getNodeParameter('invoice_id', i),
			}),
		});
	}

	if (operation === OrdersMethod.RunOrderMacroTrigger) {
		const schema = validation.object({
			order_id: validation.number(),
			trigger_id: validation.number(),
		});

		return await runOrderMacroTriggerExecution({
			context: data,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
				trigger_id: data.getNodeParameter('trigger_id', i),
			}),
		});
	}
	return undefined;
}
