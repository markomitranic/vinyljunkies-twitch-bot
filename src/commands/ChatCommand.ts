import { type Client } from "tmi.js";
import { type EventArguments } from "~/EventArguments";

export abstract class ChatCommand {
  protected readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public abstract shouldHandle(args: EventArguments): Promise<boolean>;
  public abstract execute(args: EventArguments): Promise<void>;
}
