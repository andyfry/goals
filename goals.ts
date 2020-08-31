import { parse } from "https://deno.land/std/flags/mod.ts";
import {
	exists,
	existsSync,
	readJson,
	readJsonSync,
	writeJsonSync,
	walkSync,
	ensureFileSync
} from "https://deno.land/std/fs/mod.ts";

const basePath = '/Users/andyfry/Projects/daily/goals';
const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const today = new Date();
const yesterday = new Date(Date.now() - 86400000);
const tomorrow = new Date(Date.now() + 86400000);

async function main() {
	const args = parse(Deno.args);

	if (args._.includes('help') || args.h || args.help) {
		displayHelp(true);
		Deno.exit();
	}
	if (args._.includes('stats')) {
		displayStats(args);
		Deno.exit();
	}
	if (args._.includes('add')) {
		addGoal(args);
		Deno.exit();
	}
	if (args._.includes('done')) {
		markDone(args);
		Deno.exit();
	}

	displayGoals(args);
}

// ****************************************************************************
// Commands
// ****************************************************************************
function addGoal(arg: any) {
	const goal = arg._[1];
	const day =  chooseDate(arg, tomorrow);
	
	const path = buildPath(day);
	let goals: goal[];
	if (!existsSync(path)) {
		goals = [];
	}
	else {
		goals = readJsonSync(path) as goal[];
	}
	
	goals.push({ title: goal, done: false });
	
	ensureFileSync(path);
	writeJsonSync(path, goals);
}

function displayGoals(args: any) {
	if (args.yesterday) {
		displayDailyGoals(yesterday);
	}
	if (args.today || (!args.yesterday && !args.tomorrow)) {
		displayDailyGoals(today);
	}
	if (args.tomorrow) {
		displayDailyGoals(tomorrow);
	}
}

function displayHelp(long: boolean) {
	console.log('usage: goals [<command>] [args] [--yesterday] [--today] [--tomorrow]');
	if (long) {
		console.log('goals                         View Todays Goals');
		console.log('goals add "New Goal"          Add a new Goal to Today');
		console.log('goals done 1                  Marks the first Goal for Today as Done');
		console.log('goals help                    Displays Help');
	}
}

function displayStats(args: any) {
	console.log("Goals Statistics");

	let numberOfDays = 0;
	let numberOfGoals = 0;
	let numberOfGoalsCompleted = 0;
	let numberOfSuccessfulDays = 0;

	for (const entry of walkSync(basePath)) {
		if (entry.name === 'goals.json') {
			let success = true;
			numberOfDays++;
			const goals = readJsonSync(entry.path) as goal[];
			numberOfGoals += goals.length;
			goals.forEach((goal) => {
				if (goal.done) {
					numberOfGoalsCompleted++;
				} else {
					success = false;
				}
			});
			if (success) {
				numberOfSuccessfulDays++;
			}
		}
	}

	console.log('Number of Days: ', numberOfDays);
	console.log(numberOfGoalsCompleted, '/', numberOfGoals);
	console.log('Successful Days: ', numberOfSuccessfulDays);
}

function markDone(arg: any) {
	if (arg._.length < 1) {
		displayError(arg, 'No number given');
	}
	if (arg._.length > 2) {
		displayError(arg, 'Unknown Command');
	}
	const day = chooseDate(arg, today);
	
	const path = buildPath(day);
	let goals = readJsonSync(path) as goal[];
	
	const goalNumber = arg._[1];
	const goal = goals[goalNumber - 1];

	if (goal === undefined) {
		displayError(arg, "Goal not found");
	}

	goal.done = !arg.undo;
	writeJsonSync(path, goals);

	displayGoals(arg);
}

// ****************************************************************************
// Helper Functions
// ****************************************************************************

function buildPath(date: Date) {
	const fileName = 'goals.json';

	const year = date.getFullYear();
	const month = monthNames[date.getMonth()];
	const day = date.getDate();

	return `${basePath}/${year}/${month}/${day}/${fileName}`;
}

function chooseDate(arg: any, defaultDay:Date){
	if(arg.yesterday){
		return yesterday;
	}
	if(arg.today){
		return today;
	}
	if(arg.tomorrow){
		return tomorrow;
	}
	return defaultDay;
}

function displayDailyGoals(date: Date) {
	const path = buildPath(date);

	if (!existsSync(path)) {
		console.log("No Goals Set For", formatDate(date))
	}
	else {
		const goals = readJsonSync(path) as goal[];
		const numberOfGoals = goals.length;
		let goalsDone = 0;
		console.log("Goals for", formatDate(date));

		goals.forEach((goal) => {
			displayGoal(goal);
			if (goal.done) {
				goalsDone++;
			}
		});
		console.log(`${goalsDone}/${numberOfGoals} Complete`);
	}
}

function displayError(arg: any, message?: string) {
	console.log(message);
	console.log('RED Unknown Command RED');
	displayHelp(false);
	console.log('Return Error Code');
	Deno.exit(1);
};

function displayGoal(goal: goal) {
	console.log(`  ${goal.done ? '✅' : '❌'} ${goal.title}`);
}

function formatDate(date: Date): string {
	const dateString = date.toDateString();

	if (yesterday.toDateString() === dateString) { return 'Yesterday' }
	if (today.toDateString() === dateString) { return 'Today' }
	if (tomorrow.toDateString() === dateString) { return 'Tomorrow' }

	return date.toDateString();
}



main();

interface goal {
	title: string,
	done: boolean
}
