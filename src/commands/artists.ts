import { createBotCommand } from "@twurple/easy-bot";
import { NewEvents } from "~/repository/NewEvents";

export const artistsCommand = createBotCommand(
  "artists",
  async (_params, { reply }) => {
    const monthlyEvents = await NewEvents.getMonthlyEventCounts();
    const totalUsersCount = await NewEvents.getTotalUsersCount();
    const totalCount = await NewEvents.getTotalCount();

    await reply(
      [
        ...monthlyEvents.map(
          (event) => `${event.month} => ${event.count} artists`,
        ),
        `All time => ${totalUsersCount} people, ${totalCount} artists.`,
        `Music day => Monday, 12 artists`,
        `(use !new when you discover a new artist)`,
      ].join("———————————————————————"),
    );
  },
  // { userCooldown: 30 },
);
