import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const clientId ="<>";
const clientSecret = "<>";
const redirectUrl = "http://localhost:4000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret,
      callbackURL: redirectUrl,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
