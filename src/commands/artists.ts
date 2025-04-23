import { createBotCommand } from "@twurple/easy-bot";
import { NewEvents } from "~/repository/NewEvents";

export const artistsCommand = createBotCommand(
  "artists",
  async (_params, { reply }) => {
    const totalUsersCount = await NewEvents.getTotalUsersCount();
    const totalCount = await NewEvents.getTotalCount();

    await reply(
      [
        `Dec 2024 => 12 artists`,
        `Jan 2025 => 12 artists`,
        `Feb 2025 => 12 artists`,
        `Mar 2025 => 12 artists`,
        `Apr 2025 => 12 artists`,
        `All time => ${totalUsersCount} people, ${totalCount} artists.`,
        `Music day => Monday, 12 artists`,
        `(use !new when you discover a new artist)`,
      ].join("———————————————————————"),
    );
  },
  // { userCooldown: 30 },
);
