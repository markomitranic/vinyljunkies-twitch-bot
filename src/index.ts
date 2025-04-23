import "dotenv/config";
import { getBot } from "./twitch/bot";

async function main() {
  await getBot([]);

  // commands: [
  //   createBotCommand("dice", (params, { reply }) => {
  //     const diceRoll = Math.floor(Math.random() * 6) + 1;
  //     reply(`You rolled a ${diceRoll}`);
  //   }),
  //   createBotCommand("slap", (params, { userName, say }) => {
  //     say(
  //       `${userName} slaps ${params.join(" ")} around a bit with a large trout`,
  //     );
  //   }),
  // ],
}

void main();
