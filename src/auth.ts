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
        <h1 class="text-3xl font-bold underline text-clifford">Hello World!</h1>
        <p>
          We use the <a href="https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow" target="_blank">Authorization code grant flow</a> to authenticate with Twitch.
          <br>
          In order to do this, please provide the following credentials:
        </p>
        <form action="/authorize">
          <input type="text" name="client_id" value="${process.env.APP_CLIENT_ID}" />
          <button type="submit">Authorize on Twitch</button>
        </form>
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
          @theme {
            --color-clifford: #da373d;
          }
        </style>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `;
}
