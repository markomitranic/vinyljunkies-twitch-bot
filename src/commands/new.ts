import { createBotCommand } from "@twurple/easy-bot";
import { NewEvents } from "~/repository/NewEvents";

export const newCommand = createBotCommand(
  "new",
  async (_params, { reply, userName, userDisplayName }) => {
    await NewEvents.createNewEvent(userName);
    const personalCount = await NewEvents.getPersonalCount(userName);

    await reply(
      [
        `@${userDisplayName} has just discovered a new artist!!`,
        `Personal record => ${personalCount} artists`,
        `(use !artists for channel stats)`,
        "",
      ].join("———————————————————————"),
    );
  },
  { userCooldown: 30 },
);
