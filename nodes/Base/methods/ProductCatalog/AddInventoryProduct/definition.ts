import {INodeProperties} from "n8n-workflow";
import {Resource, ProductCatalogMethod} from "../../types";

export const addInventoryProductDefinition: INodeProperties[] = [
	{
		displayName: 'Inventory ID',
		name: 'inventory_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventoryProduct
				],
			},
		},
		default: '',
		placeholder: '307',
		description:'Catalog ID. The list of identifiers can be retrieved using the method getInventories. (inventory_id field).',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					Resource.ProductCatalog
				],
				operation: [
					ProductCatalogMethod.AddInventoryProduct
				],
			},
		},
		options: [
			{
				displayName: 'Product ID',
				name: 'product_id',
				type: 'string',
				default:'',
				placeholder: '2685',
				description:'Main product identifier, given only during the update. Should be left blank when creating a new product. The new product identifier is returned as a response to this method.',
			},
			{
				displayName: 'Parent ID',
				name: 'parent_id',
				type: 'string',
				default:'',
				placeholder: '',
				description:'Product parent ID. To be provided only if the added/edited product is a variant of another product.',
			},
			{
				displayName: 'Is Bundle',
				name: 'is_bundle',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description:'Is the given product a part of a bundle',
			},
			{
				displayName: 'EAN',
				name: 'ean',
				type: 'string',
				default:'',
				placeholder: '983628103943',
				description:'Product EAN number',
			},
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default:'',
				placeholder: 'EPL-432',
				description:'Product SKU number',
			},
			{
				displayName: 'TAX RATE',
				name: 'tax_rate',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				placeholder: '23',
				description:'VAT tax rate (e.g. "20")',
			},
			{
				displayName: 'Weight',
				name: 'weight',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				placeholder: '0.25',
				description:'Weight in kilograms',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				placeholder: '0.3',
				description:'Product height',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				placeholder: '0.2',
				description:'Product width',
			},
			{
				displayName: 'Length',
				name: 'length',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				placeholder: '0.05',
				description:'Product length',
			},
			{
				displayName: 'Star',
				name: 'star',
				type: 'number',
				default: 0,
				placeholder: '2',
				description:'Product star type. It takes from 0 to 5 values. 0 means no starring.',
			},
			{
				displayName: 'Manufacturer ID',
				name: 'manufacturer_id',
				type: 'number',
				default: 0,
				placeholder: '5',
				description:'Product manufacturer ID. IDs can be retrieved with getInventoryManufacturers method.',
			},
			{
				displayName: 'Category ID',
				name: 'category_id',
				type: 'number',
				default: 0,
				placeholder: '3',
				description:'Product category ID (category must be previously created with addInventoryCategories) method',
			},
			{
				displayName: 'Prices',
				name: 'prices',
				placeholder: 'Add Price',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'A list containing product prices, where the key is the price group ID and value is a product gross price for a given price group. The list of price groups can be retrieved with getInventoryPriceGroups method.',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Price Group ID',
								name: 'name',
								type: 'string',
								default: '',
								description: 'ID of the Price Group',
								placeholder: '105'
							},
							{
								displayName: 'Price Value',
								name: 'value',
								type: 'number',
								typeOptions: {
									numberPrecision: 2,
								},
								default: 0,
								description: 'Value to set for the Price Group ID',
								placeholder: '20.99'
							},
						],
					},
				],
			},
			{
				displayName: 'Stock',
				name: 'stock',
				placeholder: 'Add Stock',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'A list containing product stocks, where the key is the warehouse ID and value is a product stock for a given warehouse. Warehouse ID should have this format: "bl_[ID:int]" (eg. "bl_123").The list of warehouse IDs can be retrieved with getInventoryWarehouses method. Stocks cannot be assigned to the warehouses created automatically for purposes of keeping external stocks (shops, wholesalers, etc.).',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Warehouse ID',
								name: 'name',
								type: 'string',
								default: '',
								description: 'ID of the Warehouse',
								placeholder: 'bl_206'
							},
							{
								displayName: 'Product Stock',
								name: 'value',
								type: 'number',
								default: 0,
								description: 'Value is a product stock for a given warehouse',
								placeholder: '5'
							},
						],
					},
				],
			},
			{
				displayName: 'Locations',
				name: 'locations',
				placeholder: 'Add Location',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'A list containing product locations where the key is the warehouse ID and value is a product location for a given warehouse, eg. "A-5-2". Warehouse ID should have this format: "[type:bl|shop|warehouse]_[ID:int]" (eg. "bl_123"). The list of warehouse IDs can be retrieved with getInventoryWarehouses method.',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Warehouse ID',
								name: 'name',
								type: 'string',
								default: '',
								description: 'ID of the Warehouse',
								placeholder: 'bl_206'
							},
							{
								displayName: 'Product Location',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value is a product location for a given warehouse',
								placeholder: 'A-5-2'
							},
						],
					},
				],
			},
			{
				displayName: 'Text Fields',
				name: 'text_fields',
				placeholder: 'Add Text Field',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: '\tA list containing field text values (names, descriptions, etc.) of a product, where the key is the field text ID and value is the field value. The field text ID consists of the following components separated with the "|" character:\n' +
					'\n' +
					'    [field] - Field name. Accepted field names: "name", "description", "features", "description_extra1", "description_extra2", "description_extra3", "description_extra4", "extra_field_[extra-field-ID]" e.g. "extra_field_75". The list of extra fields IDs can be retrieved with getInventoryExtraFields method.\n' +
					'    [lang] - A two-letter code of language, which gets assigned given value e.g. "en". If this value is not specified, the default catalog language is assigned. The list of languages available for each integration can be retrieved with getInventoryIntegrations method.\n' +
					'    [source_id] - Integration ID provided when the given text field value is to be overwritten only for a specific integration. ID should have a following format: "[type:varchar]_[id:int]", where the type means a kind of integration (e.g. "ebay", "amazon", "google"), and ID is an account identifier for given integration (eg. "ebay_2445").\n' +
					'    If a value is to be overwritten throughout the integration (e.g. for all Amazon accounts), the value "0" should be used as the identifier. (e.g. "amazon_0").\n' +
					'\n' +
					'Examples of text field identifiers:\n' +
					'\n' +
					'    "name" - Default name assigned to the default language.\n' +
					'    "name|de" - Name assigned to a particular language.\n' +
					'    "name|de|amazon_0" - Name assigned to a specific language for all Amazon accounts.\n' +
					'    "name|de|amazon_123" - Name assigned to a specific language for an Amazon account with ID 123.\n' +
					'\n' +
					'The list of all text field identifiers can be retrieved with the getInventoryAvailableTextFieldKeys method.\n' +
					'\n' +
					'In the case of the name and short additional fields, the character limit for the field value is 200. When specifying the value of a product feature (field "features"), provide a list where the key is the name of the parameter (e.g. "Colour") and the value is the value of that parameter (e.g. "White").\n' +
					'\n' +
					'In case of file the following format is expected:\n' +
					'{\n' +
					'    "title": "file.pdf" (varchar(40) - the file name)\n' +
					'    "file": "data:4AAQSkZJRgABA[...]" (binary - the file body limited to 2MB)\n' +
					'}',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Text Field Name (Key)',
								name: 'name',
								type: 'string',
								default: '',
								description: '\tLook at the description of the Text Fields, here is an example:\n' +
									'\n' +
									'"text_fields": { \n' +
									'   "name": "Harry Potter and the Chamber of Secrets",\n' +
									'   "description": "Basic book description",\n' +
									'   "description_extra1": "Additional description, e.g. of the entire product category",\n' +
									'   "description_extra2": "Second additional description - e.g. IMG tags with photos from an external server",\n' +
									'   "name|de": "Harry Potter und die Kammer des Schreckens"\n' +
									'},',
								placeholder: 'See the description for an example'
							},
							{
								displayName: 'Text Field Value (For Key)',
								name: 'value',
								type: 'string',
								default: '',
								description: '\tLook at the description of the Text Fields, here is an example:\n' +
									'\n' +
									'"text_fields": { \n' +
									'   "name": "Harry Potter and the Chamber of Secrets",\n' +
									'   "description": "Basic book description",\n' +
									'   "description_extra1": "Additional description, e.g. of the entire product category",\n' +
									'   "description_extra2": "Second additional description - e.g. IMG tags with photos from an external server",\n' +
									'   "name|de": "Harry Potter und die Kammer des Schreckens"\n' +
									'},',
								placeholder: 'See the description for an example'
							},
						],
					},
				],
			},
			{
				displayName: 'Text Field Features',
				name: 'text_field_features',
				placeholder: 'Add Feature to Text Field - Features',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: '\tA list containing field text values (names, descriptions, etc.) of a product, where the key is the field text ID and value is the field value. The field text ID consists of the following components separated with the "|" character:\n' +
					'\n' +
					'    [field] - Field name. Accepted field names: "name", "description", "features", "description_extra1", "description_extra2", "description_extra3", "description_extra4", "extra_field_[extra-field-ID]" e.g. "extra_field_75". The list of extra fields IDs can be retrieved with getInventoryExtraFields method.\n' +
					'    [lang] - A two-letter code of language, which gets assigned given value e.g. "en". If this value is not specified, the default catalog language is assigned. The list of languages available for each integration can be retrieved with getInventoryIntegrations method.\n' +
					'    [source_id] - Integration ID provided when the given text field value is to be overwritten only for a specific integration. ID should have a following format: "[type:varchar]_[id:int]", where the type means a kind of integration (e.g. "ebay", "amazon", "google"), and ID is an account identifier for given integration (eg. "ebay_2445").\n' +
					'    If a value is to be overwritten throughout the integration (e.g. for all Amazon accounts), the value "0" should be used as the identifier. (e.g. "amazon_0").\n' +
					'\n' +
					'Examples of text field identifiers:\n' +
					'\n' +
					'    "name" - Default name assigned to the default language.\n' +
					'    "name|de" - Name assigned to a particular language.\n' +
					'    "name|de|amazon_0" - Name assigned to a specific language for all Amazon accounts.\n' +
					'    "name|de|amazon_123" - Name assigned to a specific language for an Amazon account with ID 123.\n' +
					'\n' +
					'The list of all text field identifiers can be retrieved with the getInventoryAvailableTextFieldKeys method.\n' +
					'\n' +
					'In the case of the name and short additional fields, the character limit for the field value is 200. When specifying the value of a product feature (field "features"), provide a list where the key is the name of the parameter (e.g. "Colour") and the value is the value of that parameter (e.g. "White").\n' +
					'\n' +
					'In case of file the following format is expected:\n' +
					'{\n' +
					'    "title": "file.pdf" (varchar(40) - the file name)\n' +
					'    "file": "data:4AAQSkZJRgABA[...]" (binary - the file body limited to 2MB)\n' +
					'}',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Text Field Feature Name (Key)',
								name: 'name',
								type: 'string',
								default: '',
								description: '\tLook at the description of the Text Fields, here is an example:\n' +
									'\n' +
									'"text_fields": { \n' +
									'   "features": {\n' +
									'       "Cover":"Hardcover",\n' +
									'       "Pages":"300",\n' +
									'       "Language":"English"\n' +
									'   },\n' +
									'},',
								placeholder: 'See the description for an example'
							},
							{
								displayName: 'Text Field Feature Value',
								name: 'value',
								type: 'string',
								default: '',
								description: '\tLook at the description of the Text Fields, here is an example:\n' +
									'\n' +
									'"text_fields": { \n' +
									'   "features": {\n' +
									'       "Cover":"Hardcover",\n' +
									'       "Pages":"300",\n' +
									'       "Language":"English"\n' +
									'   },\n' +
									'},',
								placeholder: 'See the description for an example'
							},
						],
					},
				],
			},
			{
				displayName: 'Images',
				name: 'images',
				placeholder: 'Add Image',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'A list of product images (maximum 16). Each element of the list is a separate photo where the key is the photo position in the gallery (numbering from 0 to 15). You can delete a photo by sending "" at the selected position. You can submit a photo in binary format, or a link to the photo. In case of binary format, the photo should be coded in base64 and at the very beginning of the photo string the prefix "data:" should be provided. In case of link to the photo, the prefix "url:" must be given before the link. Example:\n' +
					'{\n' +
					'    "0": "url:http://adres.pl/zdjecie.jpg", (url - the photo url limited to 1000 characters length)\n' +
					'    "3": "data:4AAQSkZJRgABA[...]", (binary - the photo content limited to 2MB)\n' +
					'    "5": "", (empty - to delete the photo)\n' +
					'     ...\n' +
					'}',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Photo Position in the Gallery',
								name: 'name',
								type: 'options',
								options: [
									{
										name: '1',
										value: '1',
									},
									{
										name: '2',
										value: '2',
									},
									{
										name: '3',
										value: '3',
									},
									{
										name: '4',
										value: '4',
									},
									{
										name: '5',
										value: '5',
									},
									{
										name: '6',
										value: '6',
									},
									{
										name: '7',
										value: '7',
									},
									{
										name: '8',
										value: '8',
									},
									{
										name: '9',
										value: '9',
									},
									{
										name: '10',
										value: '10',
									},
									{
										name: '11',
										value: '11',
									},
									{
										name: '12',
										value: '12',
									},
									{
										name: '13',
										value: '13',
									},
									{
										name: '14',
										value: '14',
									},
									{
										name: '15',
										value: '15',
									},
								],
								default: '1',
								description: 'The photo position in the gallery (numbering from 0 to 15)',
							},
							{
								displayName: 'Photo Link',
								name: 'value',
								type: 'string',
								default: '',
								description: 'You can submit a photo in binary format, or a link to the photo. In case of binary format, the photo should be coded in base64 and at the very beginning of the photo string the prefix "data:" should be provided. In case of link to the photo, the prefix "URL:" must be given before the link.',
								placeholder: 'url:http://adres.pl/zdjecie.jpg'
							},
						],
					},
				],
			},
			{
				displayName: 'Links',
				name: 'links',
				placeholder: 'Add Link',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'An array containing product links to external warehouses (e.g. shops, wholesalers). Each element of the array is a list in which the key is the identifier of the external warehouse in the format "[type:shop|warehouse]_[ID:int]". (e.g. "shop_2445"). The warehouse identifiers can be retrieved with the getStoragesList method. The value is an array containing the fields listed below.',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'ID of the External Warehouse',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name (key) is the identifier of the external warehouse in the format "[type:shop|warehouse]_[ID:int]". (e.g. "shop_2445").',
								placeholder: 'shop_23'
							},
							{
								displayName: 'Product ID and Variant ID for External Warehouse',
								name: 'value',
								type: 'fixedCollection',
								default: {},
								description: 'The value is an array containing the fields listed below',
								options: [
									{
										name: 'metadataValues',
										displayName: 'Metadata',
										values: [
											{
												displayName: 'Product ID',
												name: 'product_id',
												type: 'number',
												default: 0,
												description: 'Product identifier in external warehouse',
												placeholder: '8'
											},
											{
												displayName: 'Variant ID (Optional)',
												name: 'variant_id',
												type: 'number',
												default: 0,
												description: 'Product variant identifier in the external warehouse. When assigning a link to a main product, this parameter shall be omitted or a value of 0 provided.',
												placeholder: '3'
											},
										]
									}
								]
							},
						],
					},
				],
			},
			{
				displayName: 'Bundle Products',
				name: 'bundle_products',
				placeholder: 'Add Bundle Product',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'A list containing information about the products included in the bundle, where the key is the identifier of the product included in the bundle, and the value is the number of pieces of this product in the bundle.Subproducts can only be defined if the added/edited product is a bundle (is_bundle = true)',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'ID of the Product',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name (key) is the identifier of the product included in the bundle',
								placeholder: ''
							},
							{
								displayName: 'Number of Pieces',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value is the number of pieces of this product in the bundle',
								placeholder: ''
							},
						],
					},
				],
			},
		],
	},
]



