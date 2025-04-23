import tmi, { type Client } from "tmi.js";
import { runCommandChain } from "~/commands/runCommandChain";
import { env } from "~/env";
import { getTwitchToken } from "./getTwitchToken";

let clientSingleton: Client;

export function getClient(): Client {
  if (clientSingleton) return clientSingleton;

  const client = new tmi.client({
    identity: {
      username: env.TWITCH_USERNAME,
      password: getTwitchToken,
    },
    channels: [env.TWITCH_CHANNEL],
  });

  // Register our event handlers
  client.on("connected", (addr, port) =>
    console.log(`* Connected to ${addr}:${port}`),
  );
  client.on("message", (channel, userstate, message, self) => {
    if (self) return; // Ignore echoed messages.
    void runCommandChain(client, { channel, userstate, message, self });
  });

  clientSingleton = client;
  return clientSingleton;
}
