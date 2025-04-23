import { eq } from "drizzle-orm";
import { db } from "~/db/db";
import { configTable } from "~/db/schema";
import { takeUniqueOrThrow } from "~/db/takeUniqueOrThrow";

export type ConfigKey =
  | "twitch_auth_token"
  | "twitch_refresh_token"
  | "twitch_auth_token_expires_at";

export function getConfigValue(key: ConfigKey): Promise<string | undefined> {
  return db
    .select()
    .from(configTable)
    .where(eq(configTable.key, key))
    .then(takeUniqueOrThrow)
    .then((value) => value?.value);
}

export function setConfigValue(key: ConfigKey, value: string) {
  return db
    .insert(configTable)
    .values({ key, value })
    .onConflictDoUpdate({ target: configTable.key, set: { value } });
}
