import {IExecuteFunctions} from "n8n-workflow";
import {CourierShipmentsMethod} from "../types";
import validation from "../validation";

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
	operation: string,
	category: string,
	i: number,
) {
	if (operation === CourierShipmentsMethod.CreatePackage) {
		const schema = validation.object({
			order_id: validation.number(),
			courier_code: validation.string(),
			packages: validation.array(
				validation.record(validation.string(), validation.number())
			),
		});

		const schemaAdditionalFields = validation.object({
			account_id: validation.number().nullish(),
			fields: validation.array(
				validation.object({
					id: validation.string(),
					value: validation.string()
				})
			).nullish()
		})

		const metadataArraySchemaForFields = validation.array(validation.object({
			id: validation.string(),
			value: validation.string(),
		}))

		const metadataObjectSchemaForFields = validation.object({
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

		const metadataArraySchemaForPackages = validation.array(validation.object({
			value: validation.object({
				metadataValues: validation.array(validation.object({
					id: validation.string(),
					value: validation.number()
				}))
			})
		}))

		const metadataObjectSchemaForPackages = validation.object({
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
			context: data,
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
		const schema = validation.object({
			order_id: validation.number(),
			courier_code: validation.string(),
			package_number: validation.string(),
			pickup_date: validation.number(),
		});

		const schemaAdditionalFields = validation.object({
			return_shipment: validation.boolean().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		return await createPackageManualExecution({
			context: data,
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
			context: data,
		});
	}

	if (operation === CourierShipmentsMethod.GetCourierFields) {
		const schema = validation.object({
			courier_code: validation.string(),
		});

		return await getCourierFieldsExecution({
			context: data,
			input: schema.parse({
					courier_code: data.getNodeParameter('courier_code', i),
				}),
		});
	}

	if (operation === CourierShipmentsMethod.GetCourierServices) {
		const schema = validation.object({
			order_id: validation.number(),
			courier_code: validation.string(),
		});

		const schemaAdditionalFields = validation.object({
			account_id: validation.number().nullish(),
			fields: validation.array(
				validation.object({
					id: validation.string(),
					value: validation.string()
				})
			).nullish(),
			packages: validation.array(
				validation.record(validation.string(), validation.number())
			).nullish()
		})

		const metadataArraySchemaForFields = validation.array(validation.object({
			id: validation.string(),
			value: validation.string(),
		}))

		const metadataObjectSchemaForFields = validation.object({
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

		const metadataArraySchemaForPackages = validation.array(validation.object({
			value: validation.object({
				metadataValues: validation.array(validation.object({
					id: validation.string(),
					value: validation.number()
				}))
			})
		}))

		const metadataObjectSchemaForPackages = validation.object({
			metadataValues: metadataArraySchemaForPackages,
		})

		let preparedArrayForPackages = undefined;
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
			context: data,
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
		const schema = validation.object({
			courier_code: validation.string(),
		});

		return await getCourierAccountsExecution({
			context: data,
			input: schema.parse({
				courier_code: data.getNodeParameter('courier_code', i),
			}),
		});
	}

	if (operation === CourierShipmentsMethod.GetLabel) {
		const schema = validation.object({
			courier_code: validation.string(),
			package_id: validation.number().nullish(),
			package_number: validation.string().nullish(),
		});

		const package_id = data.getNodeParameter('package_id', i);
		const package_number = data.getNodeParameter('package_number', i);

		if (package_id !== null || package_number !== "") {
			return await getLabelExecution({
			context: data,
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
		const schema = validation.object({
			courier_code: validation.string(),
			package_ids: validation.array(validation.number()).nullish(),
			package_numbers: validation.array(validation.string()).nullish(),
			account_id: validation.number()
		});

		const metadataArraySchema = validation.array(validation.object({
			package_id: validation.number().optional(),
			package_number: validation.string().optional(),
		}))

		const metadataObjectSchema = validation.object({
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
			context: data,
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
		const schema = validation.object({
			order_id: validation.number(),
		});

		return await getOrderPackagesExecution({
			context: data,
			input: schema.parse({
				order_id: data.getNodeParameter('order_id', i),
			}),
		});
	}

	if (operation === CourierShipmentsMethod.GetCourierPackagesStatusHistory) {
		const schema = validation.object({
			package_ids: validation.array(validation.number()),
		});

		const metadataArraySchema = validation.array(validation.object({
			package_id: validation.number().optional(),
		}))

		const metadataObjectSchema = validation.object({
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
			context: data,
			input: schema.parse({
				package_ids: preparedArrayForPackageIDs,
			})
		});
	}

	if (operation === CourierShipmentsMethod.DeleteCourierPackage) {
		const schema = validation.object({
			courier_code: validation.string(),
			package_id: validation.number().nullish(),
			package_number: validation.string().nullish()
		});

		const schemaAdditionalFields = validation.object({
			force_delete: validation.boolean().nullish(),
		})

		const additionalFields = data.getNodeParameter('additionalFields', i);

		const package_id = data.getNodeParameter('package_id', i);
		const package_number = data.getNodeParameter('package_number', i);

		if (package_id !== null || package_number !== "") {
			return await deleteCourierPackageExecution({
			context: data,
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
		const schema = validation.object({
			courier_code: validation.string(),
			package_ids: validation.array(validation.number()).nullish(),
			package_numbers: validation.array(validation.string()).nullish(),
			account_id: validation.number()
		});

		const schemaAdditionalFields = validation.object({
			fields: validation.array(
				validation.object({
					id: validation.string(),
					value: validation.string()
				})
			).nullish()
		})

		const metadataArraySchema = validation.array(validation.object({
			package_id: validation.number().optional(),
			package_number: validation.string().optional(),
		}))

		const metadataObjectSchema = validation.object({
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

		const metadataArraySchemaForFields = validation.array(validation.object({
			id: validation.string(),
			value: validation.string(),
		}))

		const metadataObjectSchemaForFields = validation.object({
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
			context: data,
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
		const schema = validation.object({
			courier_code: validation.string(),
		});

		return await getRequestParcelPickupFieldsExecution({
			context: data,
			input: schema.parse({
				courier_code: data.getNodeParameter('courier_code', i),
			}),
		});
	}
	return undefined;
}
