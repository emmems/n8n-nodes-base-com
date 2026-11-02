import {makeBaseRequest} from "../../request.maker";

export async function addInventoryExecution(args: {
	apiKey: string;
	input: {
		"inventory_id"?: number | null,
		"name": string,
		"description": string,
		"languages": Array< string | number >,
		"default_language": string,
		"price_groups": Array< string | number >,
		"default_price_group": number,
		"warehouses": Array< string | number >,
		"default_warehouse": string,
		"reservations": boolean,
	};
}) {
	return await makeBaseRequest({
		apiKey: args.apiKey,
		methodName: 'addInventory',
		input: args.input
	});
}
