import { type EventArguments } from "~/twitch/EventArguments";
import { ChatCommand } from "../ChatCommand";

export class HelloCommand extends ChatCommand {
  async shouldHandle(args: EventArguments): Promise<boolean> {
    const messageContent = args.message.trim().toLowerCase();
    return Promise.resolve(messageContent === "!hello");
  }

  async execute({
    channel,
    userstate,
    message,
  }: EventArguments): Promise<void> {
    await this.client.say(
      channel,
      `@${userstate.username}, you said: "${message}"`,
    );
  }
}
