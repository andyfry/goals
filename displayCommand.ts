
import { existsSync, readJsonSync } from "https://deno.land/std/fs/mod.ts";

import { goal} from "./goal.ts";
import { buildPath} from "./common.ts";

const today = new Date();
const yesterday = new Date(Date.now() - 86400000);
const tomorrow = new Date(Date.now() + 86400000);

export function displayCommand(args: any) {
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

export function displayDailyGoals(date: Date) {
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
    console.log(`  ${goal.done ? '✅' : '❌'} ${goal.title}`);
}

function formatDate(date: Date): string {
    const dateString = date.toDateString();

    if (yesterday.toDateString() === dateString) { return 'Yesterday' }
    if (today.toDateString() === dateString) { return 'Today' }
    if (tomorrow.toDateString() === dateString) { return 'Tomorrow' }

    return date.toDateString();
}
