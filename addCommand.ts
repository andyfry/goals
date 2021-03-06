import {
  existsSync,
  ensureFileSync,
  readJsonSync,
  writeJsonSync,
} from "https://deno.land/std/fs/mod.ts";
import { Args } from "https://deno.land/std/flags/mod.ts";

import { goal } from "./goal.ts";
import { chooseDate, buildPath } from "./common.ts";
import { displayDailyGoals } from "./displayCommand.ts";

const tomorrow = new Date(Date.now() + 86400000);

export function addCommand(args: Args) {
  const goal = args._[1];
  const day = chooseDate(args, tomorrow);
  const path = buildPath(day);
  let goals: goal[];

  if (!existsSync(path)) {
    goals = [];
  } else {
    goals = readJsonSync(path) as goal[];
  }

  goals.push({ title: goal, done: false });

  ensureFileSync(path);
  writeJsonSync(path, goals);
  displayDailyGoals(day);
}
