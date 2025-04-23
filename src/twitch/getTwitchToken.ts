import dayjs from "dayjs";
import { env } from "~/env";
import { getConfigValue, setConfigValue } from "~/repository/Config";
import { parseResponse } from "~/utils/parseResponse";

export async function getTwitchToken(): Promise<string> {
  const dbToken = await getConfigValue("twitch_auth_token");
  const tokenExpired = await getConfigValue(
    "twitch_auth_token_expires_at",
  ).then((value) => (value ? dayjs(value).isBefore(dayjs()) : true));

  if (!tokenExpired && dbToken) return dbToken;
  return refreshToken();
}

/**
 * Forcibly creates a new auth token by refreshing the existing one.
 */
export async function refreshToken(): Promise<string> {
  const refreshToken = await getConfigValue("twitch_refresh_token");
  if (!refreshToken) throw new Error("Twitch refresh token not found.");

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: env.APP_CLIENT_ID,
      client_secret: env.APP_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const { data } = await parseResponse<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string[];
    token_type: string;
  }>(response, "https://id.twitch.tv/oauth2/token");

  await setConfigValue("twitch_auth_token", data.access_token);
  await setConfigValue("twitch_refresh_token", data.access_token);
  await setConfigValue(
    "twitch_auth_token_expires_at",
    dayjs().add(data.expires_in, "seconds").toISOString(),
  );

  return data.access_token;
}
