import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const configTable = sqliteTable("config", {
  key: text().primaryKey().unique(),
  value: text().notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const newEventsTable = sqliteTable("new_events", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }).unique(),
  username: text().notNull(),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});
