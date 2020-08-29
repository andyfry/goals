import { parse } from "https://deno.land/std/flags/mod.ts";
import { exists, existsSync, readJson, readJsonSync } from "https://deno.land/std/fs/mod.ts";

const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

async function main() {
	const args = parse(Deno.args);

	const today = new Date();
	const yesterday = new Date(Date.now() - 86400000);
	const tomorrow = new Date(Date.now() + 86400000);

	if (args.yesterday) {
		displayGoals(yesterday);
	}
	if (args.today || (!args.yesterday && !args.tomorrow)) {
		displayGoals(today);
	}
	if (args.tomorrow) {
		displayGoals(tomorrow);
	}
}

function buildPath(date: Date) {

	const basePath = '/Users/andyfry/Projects/daily/goals';
	const fileName = 'goals.json';

	const year = date.getFullYear();
	const month = monthNames[date.getMonth()];
	const day = date.getDate();

	return `${basePath}/${year}/${month}/${day}/${fileName}`;
}

function displayGoals(date: Date) {
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
