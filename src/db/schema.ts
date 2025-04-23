import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const configTable = sqliteTable("config", {
  key: text().primaryKey().unique(),
  value: text("value").notNull(),
});

export const newEventsTable = sqliteTable("new_events", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }).unique(),
  username: text().notNull(),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});
