import { db } from "~/db/db";
import { newEventsTable } from "~/db/schema";

const TOTAL_EVENTS = 1000;
const TOTAL_USERS = 15;

// Generate 15 random usernames
const generateUsernames = () => {
  const adjectives = [
    "happy",
    "lucky",
    "crazy",
    "cool",
    "epic",
    "mega",
    "super",
    "ultra",
    "hyper",
    "retro",
  ];
  const nouns = [
    "vinyl",
    "record",
    "groove",
    "beat",
    "disc",
    "track",
    "tune",
    "mix",
    "spin",
    "jam",
  ];

  const usernames: string[] = [];
  while (usernames.length < TOTAL_USERS) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 100);
    const username = `${adj}${noun}${number}`;
    if (!usernames.includes(username)) {
      usernames.push(username);
    }
  }
  return usernames;
};

// Generate a random date within the last 6 months
const getRandomDate = () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  return new Date(
    sixMonthsAgo.getTime() +
      Math.random() * (now.getTime() - sixMonthsAgo.getTime()),
  );
};

export const seed = async () => {
  console.log("🌱 Starting seed process...");

  const usernames = generateUsernames();
  const events: { username: string; createdAt: Date }[] = [];

  // Generate 1000 events
  for (let i = 0; i < TOTAL_EVENTS; i++) {
    const randomIndex = Math.floor(Math.random() * usernames.length);
    const username = usernames[randomIndex]!; // We know this won't be undefined since we're using a valid index
    events.push({
      username,
      createdAt: getRandomDate(),
    });
  }

  // Sort events by createdAt to maintain chronological order
  events.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  try {
    // Insert all events
    await db.insert(newEventsTable).values(events);
    console.log(
      `✅ Successfully seeded ${TOTAL_EVENTS} events from ${TOTAL_USERS} users`,
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
};

// Execute if run directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
