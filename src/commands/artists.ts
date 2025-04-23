import { createBotCommand } from "@twurple/easy-bot";

export const artistsCommand = createBotCommand(
  "artists",
  async (_params, { reply, userName, userDisplayName }) => {
    // increase total count - userName
    // get total count
    const totalCount = 30;

    await reply(
      [
        `Dec 2024 => 12 artists`,
        `Jan 2025 => 12 artists`,
        `Feb 2025 => 12 artists`,
        `Mar 2025 => 12 artists`,
        `Apr 2025 => 12 artists`,
        `All time => 162 people, 17772 artists.`,
        `Most active day => 12 artists on 22. March 2025`,
        `Best day => Monday, 12 artists`,
      ].join("———————————————————————"),
    );
  },
  // { userCooldown: 30 },
);
