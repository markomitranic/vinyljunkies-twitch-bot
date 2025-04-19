import tmi, { type Client } from "tmi.js";
import z from "zod";
import {
  prepareCommandChain,
  runCommandChain,
} from "~/commands/runCommandChain";

let clientSingleton: Client;

export function getClient(): Client {
  if (clientSingleton) return clientSingleton;

  const env = z
    .object({
      TWITCH_USERNAME: z.string(),
      TWITCH_OAUTH_TOKEN: z.string(),
      TWITCH_CHANNEL: z.string(),
    })
    .parse(process.env);

  const client = new tmi.client({
    identity: {
      username: env.TWITCH_USERNAME,
      password: env.TWITCH_OAUTH_TOKEN,
    },
    channels: [env.TWITCH_CHANNEL],
  });

  // Prepare the command chain.
  prepareCommandChain(client);

  // Register our event handlers
  client.on("connected", (addr, port) =>
    console.log(`* Connected to ${addr}:${port}`),
  );
  client.on("message", (channel, userstate, message, self) => {
    if (self) return; // Ignore echoed messages.
    void runCommandChain({ channel, userstate, message, self });
  });

  clientSingleton = client;
  return clientSingleton;
}
