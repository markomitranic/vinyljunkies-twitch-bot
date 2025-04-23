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

  console.log("getTotalCount", await NewEvents.getTotalCount());
  console.log("getTotalUsersCount", await NewEvents.getTotalUsersCount());
}

void play();
