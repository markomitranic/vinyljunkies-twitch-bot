import "dotenv/config";
import { z } from "zod";

export const env = z
  .object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    TWITCH_USERNAME: z.string(),
    TWITCH_CHANNEL: z.string(),
    APP_CLIENT_ID: z.string(),
    APP_CLIENT_SECRET: z.string(),
    TURSO_DATABASE_URL: z.string(),
    TURSO_AUTH_TOKEN: z.string(),
  })
  .parse(process.env);
