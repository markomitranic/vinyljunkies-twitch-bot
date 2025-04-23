import "dotenv/config";
import express from "express";
import open from "open";
import z from "zod";
import { parseResponse } from "./utils/parseResponse";

const env = z
  .object({
    APP_CLIENT_ID: z.string(),
    APP_CLIENT_SECRET: z.string(),
  })
  .parse(process.env);

const app = express();

/**
 * A homepage that explains the process and prompts the user to authorize the app.
 * @see http://localhost:3000
 */
app.get("/", (_req, res) => {
  res.send(
    webpage(
      "Twitch Bot Auth",
      `
        <div class="flex flex-col gap-2 items-start justify-start">
          <h1 class="text-3xl font-bold underline text-clifford mb-6">Create a Twitch OAuth Token!</h1>
          <p>
            We use the
            <a
              href="https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow"
              target="_blank"
              >Authorization code grant flow</a
            >
            to authenticate with Twitch.
            <br />
            In order to do this, please provide the following credentials:
          </p>
          <form action="/authorize" class="flex flex-col gap-2 items-start justify-start">
            <label
              for="client_id"
              class="block text-sm/6 font-medium text-gray-900"
              >App Client ID</label
            >
            <input
              type="text"
              name="client_id"
              value="${env.APP_CLIENT_ID}"
              id="client_id"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="4fulp...4yoki"
              aria-describedby="id-description"
            />
            <p class="mt-2 text-sm text-gray-500" id="id-description">
              We will create a token with <code>chat:read</code> and
              <code>chat:edit</code> scopes.
            </p>
            <button
              type="button"
              class="inline-flex items-center gap-x-1.5 rounded-md bg-[#6441a5] cursor-pointer px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-[#6441a5]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Authorize on Twitch
              <svg
                class="-mr-0.5 size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      `,
    ),
  );
});

/**
 * A form-submission route that redirects the user to the Twitch authorization page.
 * @see http://localhost:3000/authorize?client_id=4fulp...4yoki
 */
app.get("/authorize", (req, res) => {
  const params = z.object({ client_id: z.string().min(1) }).parse(req.query);
  const url = new URL("https://id.twitch.tv/oauth2/authorize");
  url.searchParams.set("redirect_uri", "http://localhost:3000/callback");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "chat:read chat:edit");
  url.searchParams.set("client_id", params.client_id);
  res.redirect(url.toString());
});

/**
 * A route that handles the callback from the Twitch authorization page.
 * @see http://localhost:3000/callback?code=fko8umzkfa4hvv4b96ga2v8ymgrbzg&scope=chat%3Aread+chat%3Aedit
 */
app.get("/callback", async (req, res) => {
  const { code } = z.object({ code: z.string() }).parse(req.query);
  const accessToken = await getToken(code);
  console.log(accessToken);

  res.send(
    webpage(
      "Twitch Bot Auth",
      `
        <div class="flex flex-col gap-2 items-start justify-start">
          <h1 class="text-3xl font-bold underline text-clifford mb-6">
            Your new token is ready!
          </h1>
          <p>
            You have successfully authorized the app. Please copy your token and use it in your <code>.env</code> file to authenticate with Twitch.
          </p>
          <div
            class="flex flex-col gap-2 items-start justify-start"
          >
            <label
              for="client_id"
              class="block text-sm/6 font-medium text-gray-900"
              >App Secret Token</label
            >
            <div class="mt-2 flex">
              <div class="-mr-px grid grow grid-cols-1 focus-within:relative">
                <input
                  type="text"
                  name="query"
                  id="query"
                  value="oauth:${accessToken}"
                  class="col-start-1 bg-gray-100 row-start-1 block w-full rounded-l-md py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
                  placeholder="No token found."
                />
                <svg
                  class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10.9 12.006c.11.542-.348.994-.9.994H2c-.553 0-1.01-.452-.902-.994a5.002 5.002 0 0 1 9.803 0ZM14.002 12h-1.59a2.556 2.556 0 0 0-.04-.29 6.476 6.476 0 0 0-1.167-2.603 3.002 3.002 0 0 1 3.633 1.911c.18.522-.283.982-.836.982ZM12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  />
                </svg>
              </div>
              <button
                type="button"
                onclick="(() => {
                  const code = 'oauth:${accessToken}';
                  navigator.clipboard.writeText(code);
                  const button = event.target;
                  const originalText = button.textContent;
                  button.textContent = 'Copied!';
                  setTimeout(() => {
                    button.textContent = originalText;
                  }, 2000);
                })()"
                class="flex cursor-pointer shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
                <svg
                  class="-ml-0.5 size-4 text-gray-400"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 2.75ZM2 6.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 2 9.75ZM9.22 9.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V8.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Copy
              </button>
            </div>
          </dib>
        </div>
      `,
    ),
  );
});

app.listen(3000, () => {
  console.log(`Auth server running at http://localhost:3000`);
  void open(`http://localhost:3000`);
});

/**
 * A simple function to generate a basic HTML page wrapper.
 */
function webpage(title: string, body: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title.trim()}</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style type="text/tailwindcss">
          @theme {}
        </style>
      </head>
      <body class="bg-gray-100 md:px-20 md:py-10 p-2">
        <div class="mx-auto max-w-7xl px-6 lg:px-8 rounded-lg">
          ${body}
        </div>
      </body>
    </html>
  `;
}

export async function getToken(authorizationCode: string) {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: env.APP_CLIENT_ID,
      client_secret: env.APP_CLIENT_SECRET,
      code: authorizationCode,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/callback",
    }),
  });

  const { data } = await parseResponse<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string[];
    token_type: string;
  }>(response, "https://id.twitch.tv/oauth2/token");

  console.log(data);

  return data.access_token;
}
