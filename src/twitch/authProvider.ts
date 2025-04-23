import { RefreshingAuthProvider } from "@twurple/auth";
import dayjs from "dayjs";
import { z } from "zod";
import { env } from "~/env";
import { getConfig, setConfig } from "~/repository/Config";

let authProvider: RefreshingAuthProvider;

export async function getAuthProvider() {
  if (authProvider) return authProvider;

  const tokenConfig = await getConfig("twitch_auth_token");
  if (!tokenConfig || !tokenConfig.value)
    throw new Error("No token data found");

  const tokenData = z
    .object({
      access_token: z.string(),
      refresh_token: z.string(),
      expires_in: z.number(),
      scope: z.array(z.string()),
    })
    .parse(JSON.parse(tokenConfig.value));

  const newAuthProvider = new RefreshingAuthProvider({
    clientId: env.APP_CLIENT_ID,
    clientSecret: env.APP_CLIENT_SECRET,
    appImpliedScopes: ["chat:read", "chat:edit"],
  });

  newAuthProvider.onRefresh((_userId, newTokenData) => {
    console.log("Refreshed the token.");
    void setConfig("twitch_auth_token", JSON.stringify(newTokenData));
  });

  await newAuthProvider.addUserForToken(
    {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      scope: tokenData.scope,
      obtainmentTimestamp: dayjs(tokenConfig.updatedAt).valueOf(),
    },
    ["chat"],
  );

  authProvider = newAuthProvider;
  return authProvider;
}
