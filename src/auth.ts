import "dotenv/config";
import express from "express";
import open from "open";
import z from "zod";

const app = express();

// A homepage that explains the process and prompts the user to authorize the app.
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
              value="${process.env.APP_CLIENT_ID}"
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

// A form-submission route that redirects the user to the Twitch authorization page.
app.get("/authorize", (req, res) => {
  const params = z.object({ client_id: z.string().min(1) }).parse(req.query);
  const url = new URL("https://id.twitch.tv/oauth2/authorize");
  url.searchParams.set("redirect_uri", "http://localhost:3000/callback");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "chat:read chat:edit");
  url.searchParams.set("client_id", params.client_id);
  res.redirect(url.toString());
});

// A route that handles the callback from the Twitch authorization page.
app.get("/callback", (req, res) => {
  // http://localhost:3000/?code=fko8umzkfa4hvv4b96ga2v8ymgrbzg&scope=chat%3Aread+chat%3Aedit
  const { code } = z.object({ code: z.string() }).parse(req.query);
  console.log(code);
  res.send(
    webpage(
      "Twitch Bot Auth",
      `
        <h1 class="text-3xl font-bold underline text-clifford">
          Callback received!
        </h1>
        <p>
          <code>${JSON.stringify(code, null, 2)}</code>
        </p>
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
