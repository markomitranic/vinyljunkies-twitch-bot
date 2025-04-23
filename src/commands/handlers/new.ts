import { type Client } from "tmi.js";
import { z } from "zod";
import { db } from "~/db/db";
import { newEventsTable } from "~/db/schema";
import { type EventArguments } from "~/twitch/EventArguments";
import { ChatCommand } from "../ChatCommand";

export class NewCommand extends ChatCommand {
  public shouldHandle(args: EventArguments): Promise<boolean> {
    const messageContent = args.message.trim().toLowerCase();
    return Promise.resolve(messageContent === "!new");
  }
  public async execute(
    conn: Client,
    { channel, userstate }: EventArguments,
  ): Promise<void> {
    const { success, error, data } = z
      .object({ username: z.string().min(1) })
      .safeParse(userstate);
    if (!success || error) {
      console.error("Invalid userstate. Ignoring the event.", error);
      return Promise.resolve();
    }

    await db.insert(newEventsTable).values({ username: data.username });

    await conn.say(
      channel,
      `@${userstate.username} has discovered X new artists thanks to VinylJunkies!`,
    );

    return Promise.resolve();
  }
}
