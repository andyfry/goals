import { goal } from "./goal.ts";
import { readJsonSync, walkSync } from "https://deno.land/std/fs/mod.ts";

// TODO: Get This from configuration
const basePath = '/Users/andyfry/Projects/daily/goals';

export function statsCommand(args: any) {
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