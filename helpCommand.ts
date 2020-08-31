export function helpCommand(args: any) {
	console.log('usage: goals [<command>] [args] [--yesterday] [--today] [--tomorrow]');

	console.log('goals                         View Todays Goals');
	console.log('goals add "New Goal"          Add a new Goal to Today');
	console.log('goals done 1                  Marks the first Goal for Today as Done');
	console.log('goals help                    Displays Help');
}
