import { eq } from "drizzle-orm";
import { db } from "~/db/db";
import { configTable } from "~/db/schema";
import { takeUniqueOrThrow } from "~/db/takeUniqueOrThrow";

export type ConfigKey = "twitch_auth_token";

export function getConfig(key: ConfigKey) {
  return db
    .select()
    .from(configTable)
    .where(eq(configTable.key, key))
    .then(takeUniqueOrThrow);
}

export function setConfig(key: ConfigKey, value: string) {
  return db
    .insert(configTable)
    .values({ key, value })
    .onConflictDoUpdate({ target: configTable.key, set: { value } });
}
