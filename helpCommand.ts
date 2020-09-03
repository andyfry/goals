import { Args } from "https://deno.land/std/flags/mod.ts";

export function helpCommand(args: Args) {
	console.log('usage: goals [<command>] [args] [--yesterday] [--today] [--tomorrow]');

	console.log('  goals                         View Todays Goals');
	console.log('  goals add "New Goal"          Add a new Goal to Today');
	console.log('  goals done 1                  Marks the first Goal for Today as Done');
	console.log('  goals help                    Displays Help');
}
