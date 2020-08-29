import { exists, readJson, readJsonSync } from "https://deno.land/std/fs/mod.ts";

const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

async function main() {
	const date = new Date();
	const path = buildPath(date);

	let goals = readJsonSync(path) as goal[];

	displayGoals(goals, date);
}

function buildPath(date: Date) {

	const basePath = '/Users/andyfry/Projects/daily/goals';
	const fileName = 'goals.json';

	const year = date.getFullYear();
	const month = monthNames[date.getMonth()];
	const day = date.getDate();

	return `${basePath}/${year}/${month}/${day}/${fileName}`;
}

function displayGoals(goals: goal[], date: Date) {
	const numberOfGoals= goals.length;
	let goalsDone = 0;

	console.log("Goals for Today");
	goals.forEach((goal) => 
	{ 
		displayGoal(goal); 
		if(goal.done){
			goalsDone++;
		}
	});
	console.log(`${goalsDone}/${numberOfGoals} Complete`);
}

function displayGoal(goal: goal) {
	console.log(`  [${goal.done ? 'X' : ' '}] ${goal.title}`);
}

main();

interface goal {
	title: string,
	done: boolean
}
