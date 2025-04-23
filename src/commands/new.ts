import { createBotCommand } from "@twurple/easy-bot";

export const newCommand = createBotCommand(
  "new",
  async (_params, { reply, userName, userDisplayName }) => {
    // increase total count - userName
    // get total count
    const totalCount = 30;

    await reply(
      [
        `@${userDisplayName} has just discovered a new artist!`,
        `Body count => ${totalCount} artists`,
        `(Command !artists for all stats)`,
        "",
      ].join("———————————————————————"),
    );
  },
  // { userCooldown: 30 },
);
