import {IExecuteFunctions} from "n8n-workflow";
import {makeBaseRequest} from "../../request.maker";

export async function addInventoryExecution(args: {
	context: IExecuteFunctions;
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
		context: args.context,
		methodName: 'addInventory',
		input: args.input
	});
}
