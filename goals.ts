import { parse } from "https://deno.land/std/flags/mod.ts";

import { helpCommand } from "./helpCommand.ts";
import { statsCommand } from "./statsCommand.ts";
import { addCommand } from "./addCommand.ts";
import { doneCommand } from "./doneCommand.ts";
import { displayCommand } from "./displayCommand.ts";

async function main() {
	const args = parse(Deno.args);

	if (args._.includes('help') || args.h || args.help) {
		helpCommand(args);
		Deno.exit();
	}
	if (args._.includes('stats')) {
		statsCommand(args);
		Deno.exit();
	}
	if (args._.includes('add')) {
		addCommand(args);
		Deno.exit();
	}
	if (args._.includes('done')) {
		doneCommand(args);
		Deno.exit();
	}

	displayCommand(args);
}

main();