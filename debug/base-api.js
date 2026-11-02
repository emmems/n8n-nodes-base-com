// Quick manual check of the Base API outside n8n.
// Usage: BASE_API_TOKEN=xxxx node debug/base-api.js
const apiKey = process.env.BASE_API_TOKEN;
if (!apiKey) {
	console.error('Set BASE_API_TOKEN to your Base API token');
	process.exit(1);
}

async function makeBaseRequest(methodName, input) {
	const params = new URLSearchParams();
	params.set('method', methodName);
	if (input != null) params.set('parameters', JSON.stringify(input));

	const response = await fetch('https://api.baselinker.com/connector.php', {
		method: 'POST',
		headers: {
			'X-BLToken': apiKey,
			'content-type': 'application/x-www-form-urlencoded',
		},
		body: params.toString(),
	});
	return response.json();
}

(async () => {
	const inventories = await makeBaseRequest('getInventories');
	console.log(JSON.stringify(inventories, null, 2));
	const first = inventories.inventories?.[0];
	if (first) {
		const products = await makeBaseRequest('getInventoryProductsList', { inventory_id: first.inventory_id });
		console.log(JSON.stringify(products, null, 2));
	}
})();
