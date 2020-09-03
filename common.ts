import { Args } from "https://deno.land/std/flags/mod.ts";

import { months } from "./months.ts";

const today = new Date();
const yesterday = new Date(Date.now() - 86400000);
const tomorrow = new Date(Date.now() + 86400000);

// TODO: Get from configuration
const basePath = "/Users/andyfry/Projects/goals";

export function chooseDate(args: Args, defaultDay: Date) {
  if (args.yesterday) {
    return yesterday;
  }
  if (args.today) {
    return today;
  }
  if (args.tomorrow) {
    return tomorrow;
  }

  return defaultDay;
}

export function buildPath(date: Date) {
  const fileName = "goals.json";

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${basePath}/${year}/${month}/${day}/${fileName}`;
}
