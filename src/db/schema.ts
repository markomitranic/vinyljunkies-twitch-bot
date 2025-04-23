import { sql } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  sqliteView,
  text,
} from "drizzle-orm/sqlite-core";

export const configTable = sqliteTable("config", {
  key: text().primaryKey().unique(),
  value: text().notNull(),
  updatedAt: text()
    .default(sql`(CURRENT_DATE)`)
    .$onUpdate(() => sql`(CURRENT_DATE)`)
    .notNull(),
});

export const newEventsTable = sqliteTable(
  "new_events",
  {
    id: integer({ mode: "number" })
      .primaryKey({ autoIncrement: true })
      .unique(),
    username: text().notNull(),
    createdAt: text()
      .default(sql`(CURRENT_DATE)`)
      .notNull(),
  },
  (table) => [index("username_idx").on(table.username)],
);

export const monthlyEventsView = sqliteView("monthly_events").as((qb) =>
  qb
    .select({
      month: sql<string>`strftime('%Y-%m', ${newEventsTable.createdAt})`.as(
        "month",
      ),
      count: sql<number>`count(*)`.as("event_count"),
    })
    .from(newEventsTable)
    .groupBy(sql`strftime('%Y-%m', ${newEventsTable.createdAt})`),
);
