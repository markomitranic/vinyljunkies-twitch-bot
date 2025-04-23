import { count, countDistinct, eq, sql } from "drizzle-orm";
import { db } from "~/db/db";
import { monthlyEventsView, newEventsTable } from "~/db/schema";
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

export async function getMonthlyEventCounts() {
  const result = await db
    .select()
    .from(monthlyEventsView)
    .where(
      sql`${monthlyEventsView.month} >= strftime('%Y-%m', date('now', '-5 months', 'start of month'))`,
    )
    .orderBy(sql`${monthlyEventsView.month}`);

  return result.map((row) => ({
    month: new Date(row.month + "-01").toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    count: row.count,
  }));
}

export const NewEvents = {
  getPersonalCount: getPersonalCount,
  getTotalCount: getTotalCount,
  getTotalUsersCount: getTotalUsersCount,
  createNewEvent: createNewEvent,
  getMonthlyEventCounts: getMonthlyEventCounts,
};
