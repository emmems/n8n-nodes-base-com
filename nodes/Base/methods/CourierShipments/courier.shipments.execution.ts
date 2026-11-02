import {IExecuteFunctions} from "n8n-core";
import {CourierShipmentsMethod} from "../types";
import zod from "zod";

import {createPackageExecution} from "./CreatePackage/execution";
import {createPackageManualExecution} from "./CreatePackageManual/execution";
import {getCouriersListExecution} from "./GetCouriersList/execution";
import {getCourierFieldsExecution} from "./GetCourierFields/execution";
import {getCourierServicesExecution} from "./GetCourierServices/execution";
import {getCourierAccountsExecution} from "./GetCourierAccounts/execution";
import {getLabelExecution} from "./GetLabel/execution";
import {getProtocolExecution} from "./GetProtocol/execution";
import {getOrderPackagesExecution} from "./GetOrderPackages/execution";
import {getCourierPackagesStatusHistoryExecution} from "./GetCourierPackagesStatusHistory/execution";
import {deleteCourierPackageExecution} from "./DeleteCourierPackage/execution";
import {requestParcelPickupExecution} from "./RequestParcelPickup/execution";
import {getRequestParcelPickupFieldsExecution} from "./GetRequestParcelPickupFields/execution";

export async function courierShipmentsExecution(
	data: IExecuteFunctions,
	apiKey: string,
	operation: string,
	category: string,
	i: number,
) {
	if (operation === CourierShipmentsMethod.CreatePackage) {
		const schema = zod.object({
			order_id: zod.number(),
			courier_code: zod.string(),
			packages: zod.array(
				zod.record(zod.string(), zod.number())
			),
		});

		const schemaAdditionalFields = zod.object({
			account_id: zod.number().nullish(),
			fields: zod.array(
				zod.object({
					id: zod.string(),
					value: zod.string()
				})
			).nullish()
		})

		const metadataArraySchemaForFields = zod.array(zod.object({
			id: zod.string(),
			value: zod.string(),
		}))

		const metadataObjectSchemaForFields = zod.object({
			metadataValues: metadataArraySchemaForFields,
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		let preparedArrayForFields = undefined;
		if (additionalFields.fields !== undefined) {
			preparedArrayForFields = metadataObjectSchemaForFields.parse(additionalFields.fields).
			metadataValues?.map(el => {
					return {
						"id": el.id,
						"value": el.value,
					}
				}
			);
		}

		const metadataArraySchemaForPackages = zod.array(zod.object({
			value: zod.object({
				metadataValues: zod.array(zod.object({
					id: zod.string(),
					value: zod.number()
				}))
			})
		}))

		const metadataObjectSchemaForPackages = zod.object({
			metadataValues: metadataArraySchemaForPackages,
		})

		let preparedArrayForPackages = undefined;
		if (Object.getOwnPropertyNames(data.getNodeParameter('packages', i)).length > 0) {
			preparedArrayForPackages = metadataObjectSchemaForPackages.parse(data.getNodeParameter('packages', i)).metadataValues.
			reduce((prev, curr) => {
				const reducedMetadataValues = curr.value.metadataValues.reduce((prev2, curr2) => {
					prev2[curr2.id] = curr2.value;
					return prev2;
				}, {} as Record<string, number>)
				prev.push(reducedMetadataValues);
				return prev;
			}, [] as Array<Record<string, number>>)
		} else {
			throw new Error('🚨 Weight of at least one shipment required! \n' +
				'Add Package -> Choose...')
		}

		return await createPackageExecution({
			apiKey: apiKey,
			input: {
				...schema.parse({
					order_id: data.getNodeParameter('order_id', i),
					courier_code: data.getNodeParameter('courier_code', i),
					packages: preparedArrayForPackages,
				}),
				...schemaAdditionalFields.parse({
					account_id: additionalFields.account_id,
					fields: preparedArrayForFields,
				})
			}
		});
	}

	if (operation === CourierShipmentsMethod.CreatePackageManual) {
		const schema = zod.object({
			order_id: zod.number(),
			courier_code: zod.string(),
			package_number: zod.string(),
			pickup_date: zod.number(),
		});

		const schemaAdditionalFields = zod.object({
			return_shipment: zod.boolean().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await createPackageManualExecution({
			apiKey: apiKey,
			input: {
				...schema.parse({
					order_id: data.getNodeParameter('order_id', i),
					courier_code: data.getNodeParameter('courier_code', i),
					package_number: data.getNodeParameter('package_number', i),
					pickup_date: data.getNodeParameter('pickup_date', i),
				}),
				...schemaAdditionalFields.parse({
					return_shipment: additionalFields.return_shipment,
				})
			}
		});
	}

	if (operation === CourierShipmentsMethod.GetCouriersList) {
		return await getCouriersListExecution({
			apiKey: apiKey,
		});
	}

	if (operation === CourierShipmentsMethod.GetCourierFields) {
		const schema = zod.object({
			courier_code: zod.string(),
		});

		return await getCourierFieldsExecution({
			apiKey: apiKey,
			input: schema.parse({
					courier_code: data.getNodeParameter('courier_code', i),
				}),
		});
	}

	if (operation === CourierShipmentsMethod.GetCourierServices) {
		const schema = zod.object({
			order_id: zod.number(),
			courier_code: zod.string(),
		});

		const schemaAdditionalFields = zod.object({
			account_id: zod.number().nullish(),
			fields: zod.array(
				zod.object({
					id: zod.string(),
					value: zod.string()
				})
			).nullish(),
			packages: zod.array(
				zod.record(zod.string(), zod.number())
			).nullish()
		})

		const metadataArraySchemaForFields = zod.array(zod.object({
			id: zod.string(),
			value: zod.string(),
		}))

		const metadataObjectSchemaForFields = zod.object({
			metadataValues: metadataArraySchemaForFields,
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		let preparedArrayForFields = undefined;
		console.log(JSON.stringify(additionalFields.fields))
		if (additionalFields.fields !== undefined) {
			preparedArrayForFields = metadataObjectSchemaForFields.parse(additionalFields.fields).
			metadataValues?.map(el => {
					return {
						"id": el.id,
						"value": el.value,
					}
				}
			);
		}

		const metadataArraySchemaForPackages = zod.array(zod.object({
			value: zod.object({
				metadataValues: zod.array(zod.object({
					id: zod.string(),
					value: zod.number()
				}))
			})
		}))

		const metadataObjectSchemaForPackages = zod.object({
			metadataValues: metadataArraySchemaForPackages,
		})

		let preparedArrayForPackages = undefined;
		console.log(JSON.stringify(additionalFields.fields))
		if (additionalFields.packages !== undefined) {
			if (Object.getOwnPropertyNames(additionalFields.packages).length > 0) {
				preparedArrayForPackages = metadataObjectSchemaForPackages.parse(additionalFields.packages).metadataValues.
				reduce((prev, curr) => {
					const reducedMetadataValues = curr.value.metadataValues.reduce((prev2, curr2) => {
						prev2[curr2.id] = curr2.value;
						return prev2;
					}, {} as Record<string, number>)
					prev.push(reducedMetadataValues);
					return prev;
				}, [] as Array<Record<string, number>>)
			} else {
				throw new Error('🚨 Weight of at least one shipment required! \n' +
					'Add Package -> Choose...')
			}
		}

		return await getCourierServicesExecution({
			apiKey: apiKey,
			input: {
				...schema.parse({
					order_id: data.getNodeParameter('order_id', i),
					courier_code: data.getNodeParameter('courier_code', i),
				}),
				...schemaAdditionalFields.parse({
					account_id: additionalFields.account_id,
					fields: preparedArrayForFields,
					packages: preparedArrayForPackages,
				})
			}
		});
	}

	if (operation === CourierShipmentsMethod.GetCourierAccounts) {
		const schema = zod.object({
			courier_code: zod.string(),
		});

		return await getCourierAccountsExecution({
			apiKey: apiKey,
			input: schema.parse({
				courier_code: data.getNodeParameter('courier_code', i),
			}),
		});
	}

	if (operation === CourierShipmentsMethod.GetLabel) {
		const schema = zod.object({
			courier_code: zod.string(),
			package_id: zod.number().nullish(),
			package_number: zod.string().nullish(),
		});

		const package_id = data.getNodeParameter('package_id', i);
		const package_number = data.getNodeParameter('package_number', i);

		if (package_id !== null || package_number !== "") {
			return await getLabelExecution({
				apiKey: apiKey,
				input: schema.parse({
					courier_code: data.getNodeParameter('courier_code', i),
					package_id: data.getNodeParameter('package_id', i),
					package_number: data.getNodeParameter('package_number', i),
				}),
			});
		} else {
			throw new Error('🚨 One of optional fields (package_id or package_number) is required!')
		}
	}

	if (operation === CourierShipmentsMethod.GetProtocol) {
		const schema = zod.object({
			courier_code: zod.string(),
			package_ids: zod.array(zod.number()).nullish(),
			package_numbers: zod.array(zod.string()).nullish(),
			account_id: zod.number()
		});

		const metadataArraySchema = zod.array(zod.object({
			package_id: zod.number().optional(),
			package_number: zod.string().optional(),
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema,
		})

		let preparedArrayForPackageIDs = undefined;
		if (Object.getOwnPropertyNames(data.getNodeParameter('package_ids', i)).length > 0) {
			preparedArrayForPackageIDs = metadataObjectSchema.parse(data.getNodeParameter('package_ids', i)).
				metadataValues.map(el => el.package_id);
		}

		let preparedArrayForPackageNumbers = undefined;
		if (Object.getOwnPropertyNames(data.getNodeParameter('package_numbers', i)).length > 0) {
			preparedArrayForPackageNumbers = metadataObjectSchema.parse(data.getNodeParameter('package_numbers', i)).
			metadataValues.map(el => el.package_number);
		}

		if (preparedArrayForPackageIDs !== undefined || preparedArrayForPackageNumbers !== undefined) {
			return await getProtocolExecution({
				apiKey: apiKey,
				input: schema.parse({
					courier_code: data.getNodeParameter('courier_code', i),
					package_ids: preparedArrayForPackageIDs,
					package_numbers: preparedArrayForPackageNumbers,
					account_id: data.getNodeParameter('account_id', i)
				})
			});
		} else {
			throw new Error("🚨 One of optional fields (Package IDs, Package Numbers) is required!");
		}
	}

	if (operation === CourierShipmentsMethod.GetOrderPackages) {
		const schema = zod.object({
			order_id: zod.number(),
		});

		return await getOrderPackagesExecution({
			apiKey: apiKey,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
			}),
		});
	}

	if (operation === CourierShipmentsMethod.GetCourierPackagesStatusHistory) {
		const schema = zod.object({
			package_ids: zod.array(zod.number()),
		});

		const metadataArraySchema = zod.array(zod.object({
			package_id: zod.number().optional(),
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema,
		})

		let preparedArrayForPackageIDs = undefined;
		if (Object.getOwnPropertyNames(data.getNodeParameter('package_ids', i)).length > 0) {
			preparedArrayForPackageIDs = metadataObjectSchema.parse(data.getNodeParameter('package_ids', i)).
			metadataValues.map(el => el.package_id);
		}

		if (preparedArrayForPackageIDs === undefined) {
			throw new Error('🚨 package_ids is required (Add Package ID)')
		}

		return await getCourierPackagesStatusHistoryExecution({
			apiKey: apiKey,
			input: schema.parse({
				package_ids: preparedArrayForPackageIDs,
			})
		});
	}

	if (operation === CourierShipmentsMethod.DeleteCourierPackage) {
		const schema = zod.object({
			courier_code: zod.string(),
			package_id: zod.number().nullish(),
			package_number: zod.string().nullish()
		});

		const schemaAdditionalFields = zod.object({
			force_delete: zod.boolean().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		const package_id = data.getNodeParameter('package_id', i);
		const package_number = data.getNodeParameter('package_number', i);

		if (package_id !== null || package_number !== "") {
			return await deleteCourierPackageExecution({
				apiKey: apiKey,
				input: {
					...schema.parse({
						courier_code: data.getNodeParameter('courier_code', i),
						package_id: data.getNodeParameter('package_id', i),
						package_number: data.getNodeParameter('package_number', i),
					}),
					...schemaAdditionalFields.parse({
						force_delete: additionalFields.force_delete,
					})
				}
			});
		} else {
			throw new Error('🚨 One of optional fields (package_id or package_number) is required!')
		}
	}

	if (operation === CourierShipmentsMethod.RequestParcelPickup) {
		const schema = zod.object({
			courier_code: zod.string(),
			package_ids: zod.array(zod.number()).nullish(),
			package_numbers: zod.array(zod.string()).nullish(),
			account_id: zod.number()
		});

		const schemaAdditionalFields = zod.object({
			fields: zod.array(
				zod.object({
					id: zod.string(),
					value: zod.string()
				})
			).nullish()
		})

		const metadataArraySchema = zod.array(zod.object({
			package_id: zod.number().optional(),
			package_number: zod.string().optional(),
		}))

		const metadataObjectSchema = zod.object({
			metadataValues: metadataArraySchema,
		})

		let preparedArrayForPackageIDs = undefined;
		if (Object.getOwnPropertyNames(data.getNodeParameter('package_ids', i)).length > 0) {
			preparedArrayForPackageIDs = metadataObjectSchema.parse(data.getNodeParameter('package_ids', i)).
			metadataValues.map(el => el.package_id);
		}

		let preparedArrayForPackageNumbers = undefined;
		if (Object.getOwnPropertyNames(data.getNodeParameter('package_numbers', i)).length > 0) {
			preparedArrayForPackageNumbers = metadataObjectSchema.parse(data.getNodeParameter('package_numbers', i)).
			metadataValues.map(el => el.package_number);
		}

		const metadataArraySchemaForFields = zod.array(zod.object({
			id: zod.string(),
			value: zod.string(),
		}))

		const metadataObjectSchemaForFields = zod.object({
			metadataValues: metadataArraySchemaForFields,
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		let preparedArrayForFields = undefined;
		if (additionalFields.fields !== undefined) {
			preparedArrayForFields = metadataObjectSchemaForFields.parse(additionalFields.fields).
			metadataValues?.map(el => {
					return {
						"id": el.id,
						"value": el.value,
					}
				}
			);
		}

		if (preparedArrayForPackageIDs !== undefined || preparedArrayForPackageNumbers !== undefined) {
			return await requestParcelPickupExecution({
				apiKey: apiKey,
				input: {
					...schema.parse({
						courier_code: data.getNodeParameter('courier_code', i),
						package_ids: preparedArrayForPackageIDs,
						package_numbers: preparedArrayForPackageNumbers,
						account_id: data.getNodeParameter('account_id', i)
					}),
					...schemaAdditionalFields.parse({
						fields: preparedArrayForFields,
					})
				}
			});
		} else {
			throw new Error("🚨 One of optional fields (Package IDs, Package Numbers) is required!");
		}
	}

	if (operation === CourierShipmentsMethod.GetRequestParcelPickupFields) {
		const schema = zod.object({
			courier_code: zod.string(),
		});

		return await getRequestParcelPickupFieldsExecution({
			apiKey: apiKey,
			input: schema.parse({
				courier_code: data.getNodeParameter('courier_code', i),
			}),
		});
	}
}
