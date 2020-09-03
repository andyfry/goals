import { Args } from "https://deno.land/std/flags/mod.ts";

import { buildPath } from "./common.ts";
import { displayDailyGoals } from "./displayCommand.ts";

const today = new Date();

export async function watchCommand(args: Args) {
  console.clear();
  displayDailyGoals(today);

  const watcher = Deno.watchFs(buildPath(today));
  for await (const event of watcher) {
    console.clear();
    displayDailyGoals(today);
  }
}
