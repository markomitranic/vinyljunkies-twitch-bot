import { type Client } from "tmi.js";
import { type EventArguments } from "~/twitch/EventArguments";
import { ChatCommand } from "../ChatCommand";

export class NewCommand extends ChatCommand {
  public shouldHandle(args: EventArguments): Promise<boolean> {
    const messageContent = args.message.trim().toLowerCase();
    return Promise.resolve(messageContent === "!new");
  }
  public async execute(
    conn: Client,
    { channel, userstate, message }: EventArguments,
  ): Promise<void> {
    console.log("New command executed but is not implemented yet");

    await conn.say(channel, `@${userstate.username}, you said: "${message}"`);

    return Promise.resolve();
  }
}
