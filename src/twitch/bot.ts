import { Bot, type BotCommand } from "@twurple/easy-bot";
import { env } from "~/env";
import { getAuthProvider } from "./authProvider";

let bot: Bot;

export async function getBot(commands: BotCommand[]) {
  if (bot) return bot;

  const authProvider = await getAuthProvider();
  bot = new Bot({
    authProvider,
    channels: [env.TWITCH_CHANNEL],
    commands,
  });

  bot.onConnect(() => {
    console.log("Bot connected to Twitch chat");
  });

  bot.onDisconnect((manually: boolean, error?: Error) => {
    console.error(
      "Bot disconnected:",
      manually ? "Manual disconnect" : error?.message || "Unknown error",
    );
  });

  bot.onJoinFailure((event) => {
    console.error(
      "Failed to join channel:",
      event.broadcasterName,
      event.reason,
    );
  });

  // bot.onMessage((message) => {
  //   console.log(
  //     `[${message.broadcasterName}] ${message.userName}: ${message.text}`,
  //   );
  // });

  return bot;
}
