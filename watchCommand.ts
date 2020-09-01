import { buildPath } from "./common.ts";
import {displayDailyGoals} from "./displayCommand.ts";

const today = new Date();

export async function watchCommand(args: any) {
    console.clear();
    displayDailyGoals(today);

    const watcher = Deno.watchFs(buildPath(today));
    for await (const event of watcher) {
        console.clear();
        displayDailyGoals(today);
    }
}