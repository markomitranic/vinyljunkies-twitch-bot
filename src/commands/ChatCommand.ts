import { type Client } from "tmi.js";
import { type EventArguments } from "~/twitch/EventArguments";

export abstract class ChatCommand {
  public abstract shouldHandle(args: EventArguments): Promise<boolean>;
  public abstract execute(conn: Client, args: EventArguments): Promise<void>;
}
