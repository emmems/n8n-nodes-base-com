export enum Resource {
	ProductCatalog = "productCatalog",
  ExternalStorages = "externalStorages",
	Orders = "orders",
	CourierShipments = "courierShipments"
}

export enum ProductCatalogMethod {
	AddInventoryPriceGroup = "addInventoryPriceGroup",
	DeleteInventoryPriceGroup = "deleteInventoryPriceGroup",
	GetInventoryPriceGroups = "getInventoryPriceGroups",
	AddInventoryWarehouse = "addInventoryWarehouse",
	DeleteInventoryWarehouse = "deleteInventoryWarehouse",
	GetInventoryWarehouses = "getInventoryWarehouses",
	AddInventory = "addInventory",
	DeleteInventory = "deleteInventory",
	GetInventories = "getInventories",
	AddInventoryCategory = "addInventoryCategory",
	DeleteInventoryCategory = "deleteInventoryCategory",
	GetInventoryCategories = "getInventoryCategories",
	AddInventoryManufacturer = "addInventoryManufacturer",
	DeleteInventoryManufacturer = "deleteInventoryManufacturer",
	GetInventoryManufacturers = "getInventoryManufacturers",
	GetInventoryExtraFields = "getInventoryExtraFields",
	GetInventoryIntegrations = "getInventoryIntegrations",
	GetInventoryAvailableTextFieldKeys = "getInventoryAvailableTextFieldKeys",
	AddInventoryProduct = "addInventoryProduct",
	DeleteInventoryProduct = "deleteInventoryProduct",
	GetInventoryProductsData = "getInventoryProductsData",
	GetInventoryProductsList = "getInventoryProductsList",
	GetInventoryProductsStock = "getInventoryProductsStock",
	UpdateInventoryProductsStock = "updateInventoryProductsStock",
	GetInventoryProductsPrices = "getInventoryProductsPrices",
	UpdateInventoryProductsPrices = "updateInventoryProductsPrices",
	GetInventoryProductLogs = "getInventoryProductLogs",
	RunProductMacroTrigger = "runProductMacroTrigger"
}

export enum ExternalStoragesMethod {
	GetExternalStoragesList = "getExternalStoragesList",
	GetExternalStorageCategories = "getExternalStorageCategories",
	GetExternalStorageProductsData = "getExternalStorageProductsData",
	GetExternalStorageProductsList = "getExternalStorageProductsList",
	GetExternalStorageProductsQuantity = "getExternalStorageProductsQuantity",
	GetExternalStorageProductsPrices = "getExternalStorageProductsPrices",
	UpdateExternalStorageProductsQuantity = "updateExternalStorageProductsQuantity"
}

export enum OrdersMethod {
	GetJournalList = "getJournalList",
	AddOrder = "addOrder",
	GetOrderSources = "getOrderSources",
	GetOrderExtraFields = "getOrderExtraFields",
	GetOrders = "getOrders",
	GetOrderTransactionDetails = "getOrderTransactionDetails",
	GetOrdersByEmail = "getOrdersByEmail",
	GetOrdersByPhone = "getOrdersByPhone",
	AddInvoice = "addInvoice",
	GetInvoices = "getInvoices",
	GetSeries = "getSeries",
	GetOrderStatusList = "getOrderStatusList",
	GetOrderPaymentsHistory = "getOrderPaymentsHistory",
	GetNewReceipts = "getNewReceipts",
	GetReceipt = "getReceipt",
	SetOrderFields = "setOrderFields",
	AddOrderProduct = "addOrderProduct",
	SetOrderProductFields = "setOrderProductFields",
	DeleteOrderProduct = "deleteOrderProduct",
	SetOrderPayment = "setOrderPayment",
	SetOrderStatus = "setOrderStatus",
	SetOrderStatuses = "setOrderStatuses",
	SetOrderReceipt = "setOrderReceipt",
	AddOrderInvoiceFile = "addOrderInvoiceFile",
	AddOrderReceiptFile = "addOrderReceiptFile",
	GetInvoiceFile = "getInvoiceFile",
	RunOrderMacroTrigger = "runOrderMacroTrigger"
}

export enum CourierShipmentsMethod {
	CreatePackage = "createPackage",
	CreatePackageManual = "createPackageManual",
	GetCouriersList = "getCouriersList",
	GetCourierFields = "getCourierFields",
	GetCourierServices = "getCourierServices",
	GetCourierAccounts = "getCourierAccounts",
	GetLabel = "getLabel",
	GetProtocol = "getProtocol",
	GetOrderPackages = "getOrderPackages",
	GetCourierPackagesStatusHistory = "getCourierPackagesStatusHistory",
	DeleteCourierPackage = "deleteCourierPackage",
	RequestParcelPickup = "requestParcelPickup",
	GetRequestParcelPickupFields = "getRequestParcelPickupFields"
}
