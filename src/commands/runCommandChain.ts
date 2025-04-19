import { type Client } from "tmi.js";
import { type EventArguments } from "~/twitch/EventArguments";
import { type ChatCommand } from "./ChatCommand";
import { NewCommand } from "./handlers/new";

let commands: ChatCommand[] | undefined;

export function prepareCommandChain(client: Client): ChatCommand[] {
  if (commands) return commands;

  commands = [
    new NewCommand(client),
    // new HelloCommand(client),
  ];

  return commands;
}

export async function runCommandChain(args: EventArguments) {
  // Ignore messages that don't start with "!".
  if (!args.message.startsWith("!")) return false;

  for (const cmd of commands ?? []) {
    // Break on first match.
    if (await cmd.shouldHandle(args)) {
      await cmd.execute(args);
      console.log(
        `* Handled command ${args.message} by ${cmd.constructor.name} handler.`,
      );
      return true;
    }
  }

  // console.log(`* No command handler found for ${args.message}`);
  return false;
}
