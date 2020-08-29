import { parse } from "https://deno.land/std/flags/mod.ts";
import {
	exists,
	existsSync,
	readJson,
	readJsonSync,
	walkSync
} from "https://deno.land/std/fs/mod.ts";

const basePath = '/Users/andyfry/Projects/daily/goals';
const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

async function main() {
	const args = parse(Deno.args);

	if (args._.includes('stats')) {
		displayStats(args);
	} else {
		displayGoals(args);
	}
}

function buildPath(date: Date) {
	const fileName = 'goals.json';

	const year = date.getFullYear();
	const month = monthNames[date.getMonth()];
	const day = date.getDate();

	return `${basePath}/${year}/${month}/${day}/${fileName}`;
}

function displayGoals(args: any) {
	const today = new Date();
	const yesterday = new Date(Date.now() - 86400000);
	const tomorrow = new Date(Date.now() + 86400000);

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

function displayGoal(goal: goal) {
	console.log(`  [${goal.done ? 'X' : ' '}] ${goal.title}`);
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

function formatDate(date: Date): string {
	const today = new Date().toDateString();
	const yesterday = new Date(Date.now() - 86400000).toDateString();
	const tomorrow = new Date(Date.now() + 86400000).toDateString();
	const dateString = date.toDateString();

	if (yesterday === dateString) { return 'Yesterday' }
	if (today === dateString) { return 'Today' }
	if (tomorrow === dateString) { return 'Tomorrow' }

	return date.toDateString();
}


main();

interface goal {
	title: string,
	done: boolean
}
