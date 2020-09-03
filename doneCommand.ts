import { readJsonSync, writeJsonSync } from "https://deno.land/std/fs/mod.ts";
import { Args } from "https://deno.land/std/flags/mod.ts";
import { red, bold } from "https://deno.land/std/fmt/colors.ts";

import { goal } from "./goal.ts";
import { chooseDate, buildPath } from "./common.ts";
import { displayCommand } from "./displayCommand.ts";
import { helpCommand } from "./helpCommand.ts";

const today = new Date();

export function doneCommand(args: Args) {
  if (args._.length < 1) {
    displayError(args, "No number given");
  }
  if (args._.length > 2) {
    displayError(args, "Unknown Command");
  }

  const day = chooseDate(args, today);
  const path = buildPath(day);
  let goals = readJsonSync(path) as goal[];

  const goalNumber = +args._[1];
  const goal = goals[goalNumber - 1];

  if (goal === undefined) {
    displayError(args, "Goal not found");
  }

  goal.done = !args.undo;
  writeJsonSync(path, goals);

  displayCommand(args);
}

function displayError(args: Args, message: string) {
  console.log(red(bold(message)));
  helpCommand(args);
  Deno.exit(1);
}
