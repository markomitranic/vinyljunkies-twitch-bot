import { type EventArguments } from "~/EventArguments";
import { type ChatCommand } from "./ChatCommand";

const commands: ChatCommand[] = [];

export async function runCommandChain(args: EventArguments) {
  for (const cmd of commands) {
    // Break on first match.
    if (await cmd.shouldHandle(args)) {
      await cmd.execute(args);
      console.log(
        `* Handled command ${args.message} by ${cmd.constructor.name} handler.`,
      );
      return true;
    }
  }

  console.log(`* No command handler found for ${args.message}`);
  return false;
}
