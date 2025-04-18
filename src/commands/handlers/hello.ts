import { type EventArguments } from "~/EventArguments";
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
    console.log("HANDLED", message);
    await this.client.say("vinyljunkies", `@${message.split(" ")[0]}, heya!`);
    await this.client.say(
      channel,
      `@${userstate.username}, you said: "${message}"`,
    );
  }
}
