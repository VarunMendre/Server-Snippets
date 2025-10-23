import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { writeFile } from "fs/promises";
import users from "./usersDB.json" with { type: "json" };
import sessions from "./sessionsDB.json" with { type: "json" };
import passport from "passport";
import "./passport.js";

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
    prompt: "consent",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5500/callback.html?error=true",
    session: false,
  }),
  async (req, res) => {
    const { sub, email, name, picture } = req.user._json;
    const existingUser = users.find(({ id }) => id === sub);

    if (existingUser) {
      const existingSessionIndex = sessions.findIndex(
        ({ userId }) => userId === sub
      );

      const sessionId = crypto.randomUUID();

      if (existingSessionIndex === -1) {
        sessions.push({ sessionId, userId: sub });
      } else {
        sessions[existingSessionIndex].sessionId = sessionId;
      }

      await writeFile("sessionsDB.json", JSON.stringify(sessions, null, 2));
      res.redirect(`http://localhost:5500/callback.html?sid=${sessionId}`);
      return res.end();
    }
  }
);

app.get("/session-cookie", async (req, res) => {
  const { sid } = req.query;
  res.cookie("sid", sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.end();
});

app.get("/profile", async (req, res) => {
  const { sid } = req.cookies;
  const existingSession = sessions.find(({ sessionId }) => sid === sessionId);
  if (!existingSession) {
    return res.status(401).json({ error: "Not logged in." });
  }

  const existingUser = users.find(({ id }) => id === existingSession.userId);
  if (!existingUser) {
    return res.status(404).json({ error: "User not found." });
  }

  return res.json(existingUser);
});

app.post("/logout", async (req, res) => {
  const { sid } = req.cookies;
  const sessionIndex = sessions.findIndex(({ sessionId }) => sid === sessionId);
  sessions.splice(sessionIndex, 1);
  await writeFile("sessionsDB.json", JSON.stringify(sessions, null, 2));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// https://accounts.google.com/v3/signin/accountchooser?client_id=341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fgoogle%2Fcallback&response_type=code&scope=profile+email+openid&dsh=S1629202473%3A1761067631019917&o2v=2&service=lso&flowName=GeneralOAuthFlow&opparams=%253F&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANMZRevHojy_X11jHrIK8ctpa9bUCk14cpn-oP8g0h_BYZq8FJr3hyBH009mTjHq3r_OZcrIcbxuef6ZCZIO8jx6w_pJjAbC59aWwTMlifYjRDz4JawUdm1o96jFAWakyjDRHYN8c3xZ_UO-wI2DGgabbqTsAEY0T2jJkhtYCzvd5_RhA_B-UdjzzB3eHnzwPPr8s7wUVwrOYrV0lgXYgE-7rKs8F4fVQH7tM3W5_QtoQhaKVU_WcFaAJBqATaacpvZh0uslyLSM_A7A9PKX9l5LHadjxQnPZPLfsbnkU-a5GnP3q4Fmxbp-cGcA4hQ_rmms6VuZW1fcHddu6rlyBBEdMGX51opWyr3ybUYOuK8eTV-Un3reff8mM4dRAU2AcoQWSe7zI4WBArfsVag2dH3Xvlmz-i0wK_iswrJhJ22ssAdvVRgLJmKwh2vZLgXuuSxDDLD7z3IZzG8yHGkJW8eQ2KPzQ%26flowName%3DGeneralOAuthFlow%26as%3DS1629202473%253A1761067631019917%26client_id%3D341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com%23&app_domain=http%3A%2F%2Flocalhost%3A4000
// https://accounts.google.com/v3/signin/accountchooser?client_id=341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fgoogle%2Fcallback&response_type=code&scope=email+profile+openid&dsh=S1142592935%3A1761067696312984&o2v=2&service=lso&flowName=GeneralOAuthFlow&opparams=%253F&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANDOhNoXLyV29WkUG9e4uys1yAnz-QeWg-e-02-wiOkxCBnLrV9_YZm1LvDnrnabKhYpfZcvHRIykmaNd6hPnCt4nSZbpIyK6dMAUKRJR6qRMMhZDf3ZzEfBn70wCm0eRPihwWl3jlrNLTfL_kAxLTff-my3mDyvJmaxK8qosF76iKbi5xEyP_wVQDOhEQQwXB5zZ7_8uSb8Dw8_hX7IkIUKvmSwXPxZaa1SLBu_BKkbtZuw3hKVr8ei0eD4K5V0yK8m4R-wKWK2biqPPJmk8l9kcs3VzrDXEZnhTG-yJuQOntvus4Oj3lkXMg3-tdYh8kbV4mz5e0sHFwSbaTr4fL1KhiDG89Ai9gOCXX1bquUKP3YqZzLtGZh6U_xKF1owTNVg0VsZFnSk4x6cpb2Kkx5_oeblFEetzn9iAgrH82Of_KxiilEgVcEkJfRHYLhd0o6Zw6gPnBvLmeJ6Jjd9dM1HL40DA%26flowName%3DGeneralOAuthFlow%26as%3DS1142592935%253A1761067696312984%26client_id%3D341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com%23&app_domain=http%3A%2F%2Flocalhost%3A4000
