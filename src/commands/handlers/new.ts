import { type EventArguments } from "~/EventArguments";
import { ChatCommand } from "../ChatCommand";

export class NewCommand extends ChatCommand {
  public shouldHandle(args: EventArguments): Promise<boolean> {
    const messageContent = args.message.trim().toLowerCase();
    return Promise.resolve(messageContent === "!new");
  }
  public execute(_args: EventArguments): Promise<void> {
    console.log("New command executed but is not implemented yet");
    return Promise.resolve();
  }
}
