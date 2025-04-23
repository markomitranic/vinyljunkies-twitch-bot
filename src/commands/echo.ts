import { createBotCommand } from "@twurple/easy-bot";

export const echoCommand = createBotCommand(
  "echo",
  async (_params, { msg, reply }) => {
    await reply(`You said: "${msg.text}"`);
  },
  { userCooldown: 30 },
);
