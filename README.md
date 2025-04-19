# Twitch Bot

A simple Twitch chat bot that connects to a channel and listens for the `!new` command.

- Connects to the specified channel's Twitch chat
- Listens for the `!new` command and responds to users who use the command

## Setup

1. Clone this repository
2. Install dependencies `pnpm install`
3. (Optional) if you don't have a `TWITCH_OAUTH_TOKEN` yet, you can:
   1. Create a private Twitch Application at (Twitch Dev Console)[https://dev.twitch.tv/console] with `http://localhost:3000/callback` as a callback.
   2. Start the auth process with `pnpm auth` and follow instructions.
4. Create an empty variables file from our template `cp .env.example .env` and fill out the variables:
   - `TWITCH_OAUTH_TOKEN` - the OAuth authorization token you got in the previous step
   - `TWITCH_USERNAME` - the username of your bot.
   - `TWITCH_CHANNEL` - target channel to join
5. Start the bot with `pnpm start`.

**Pro tip:** If you find yourself doing auth often, for whatever weird reason, you can add `APP_CLIENT_ID` to the `.env` file in order for it to be pre-filled. :)

## Extending the Bot

To add more commands, modify the `onMessageHandler` function in `index.js`.
