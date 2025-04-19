import "dotenv/config";
import { getClient } from "./twitch/client";

async function main() {
  const client = getClient();
  await client.connect();
}

void main();
