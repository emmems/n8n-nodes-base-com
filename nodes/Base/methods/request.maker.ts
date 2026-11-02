export async function makeBaseRequest(args: {
	apiKey: string;

	methodName: string;

	input?: Record<string,
		string | number | boolean | undefined | null |
		Array< string | number > |
		Array<Array<string | number>> |
		Array<Record<string, string | number>> |
		{ name: string; value: string | number | { name: string } } |
		Record<string, string | number | Record<string, string | number>> |
		Record<string, Record<string, number>>>;
}) {

	const params = new URLSearchParams()
	params.set("method", args.methodName);
	if (args.input != null) {
		params.set("parameters", JSON.stringify(args.input));
	}

	const headers = new Headers();
	headers.set("X-BLToken", args.apiKey);
	headers.set("content-type", "application/x-www-form-urlencoded");

	let response = await fetch('https://api.baselinker.com/connector.php', {
		headers: headers,
		method: 'POST',
		body: params.toString()
	});

	return await response.json();
}
