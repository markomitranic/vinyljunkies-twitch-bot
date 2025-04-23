import { NewEvents } from "./repository/NewEvents";

/**
 * Serves as a development playground.
 * @example
 * ```bash
 * pnpm play
 * ```
 */
async function play() {
  console.log("Playing...");

  const monthlyEvents = await NewEvents.getMonthlyEventCounts();
  console.log("Monthly Events:");
  console.table(monthlyEvents);
}

void play();
