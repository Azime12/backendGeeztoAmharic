const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "218799703403-tch5m5019pb8unfogir19vif3veukrht.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://geeztoamharic.onrender.com/api/users/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("inside authorization return");
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
