import { count, countDistinct, eq } from "drizzle-orm";
import { db } from "~/db/db";
import { newEventsTable } from "~/db/schema";
import { takeUniqueOrThrow } from "~/db/takeUniqueOrThrow";

export async function getPersonalCount(username: string) {
  const result = await db
    .select({ count: count() })
    .from(newEventsTable)
    .where(eq(newEventsTable.username, username))
    .then(takeUniqueOrThrow);
  return result?.count ?? 0;
}

export async function getTotalCount() {
  const result = await db
    .select({ count: count() })
    .from(newEventsTable)
    .then(takeUniqueOrThrow);
  return result?.count ?? 0;
}

export async function getTotalUsersCount() {
  const result = await db
    .select({ count: countDistinct(newEventsTable.username) })
    .from(newEventsTable)
    .then(takeUniqueOrThrow);
  return result?.count ?? 0;
}

export function createNewEvent(username: string) {
  return db.insert(newEventsTable).values({ username });
}

export const NewEvents = {
  getPersonalCount: getPersonalCount,
  getTotalCount: getTotalCount,
  getTotalUsersCount: getTotalUsersCount,
  createNewEvent: createNewEvent,
};
