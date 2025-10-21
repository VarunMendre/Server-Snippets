import { OAuth2Client } from "google-auth-library";

const clientId =
  "<>";
const clientSecret = "<>";
const redirectUrl = "http://localhost:4000/auth/google/callback";

const client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: redirectUrl,
});

export function generateGoogleAuthUrl() {
  return client.generateAuthUrl({
    scope: ["email", "profile", "openid"],
    // prompt: 'consent',
    // login_hint: "<>@gmail.com"
  });
}

export async function fetchUserFromGoogle(code) {
  console.log("Running fetchIdToken function...");

  const { tokens } = await client.getToken(code);
  console.log(tokens);
  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();

  return userData;
}
