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
    console.log("Bot connected to channel", env.TWITCH_CHANNEL);
  });

  return bot;
}
