import "dotenv/config";
import { artistsCommand } from "./commands/artists";
import { echoCommand } from "./commands/echo";
import { newCommand } from "./commands/new";
import { getBot } from "./twitch/bot";

async function main() {
  await getBot([echoCommand, newCommand, artistsCommand]);
}

void main();
