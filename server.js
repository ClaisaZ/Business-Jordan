import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import session from 'express-session';
import FileStoreFactory from 'session-file-store';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const FileStore = FileStoreFactory(session);

const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

for (const name of ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_CALLBACK_URL', 'SESSION_SECRET']) {
  if (!process.env[name]) {
    console.error(`Missing ${name} in .env`);
    process.exit(1);
  }
}

app.set('trust proxy', 1);

app.use(session({
  store: new FileStore({ path: path.join(__dirname, 'sessions'), retries: 0 }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

// Tell Passport to log users in with their Google account
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  // Runs after Google confirms the user and keeps only their id name and email
  (accessToken, refreshToken, profile, done) => {
    done(null, {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
    });
  }
));

// Save the user into the session after they log in
passport.serializeUser((user, done) => done(null, user));

// Read the user back out of the session on every request
passport.deserializeUser((user, done) => done(null, user));

// Start Passport and connect it to the session
app.use(passport.initialize());
app.use(passport.session());

// Only let logged in users through and send everyone else to Google login
function requireLogin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

const escapeHtml = (s = '') => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

function page(title, body) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Business-Jordan</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 640px; margin: 48px auto; padding: 0 16px; line-height: 1.6; }
  a.button { display: inline-block; padding: 8px 16px; border: 1px solid currentColor; border-radius: 6px; text-decoration: none; color: inherit; }
</style>
</head><body>${body}</body></html>`;
}

// Send the user to Google to sign in and ask for their profile and email
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google sends the user back here and Passport finishes the login
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  (req, res) => res.redirect('/members')
);

// Log the user out of Passport and delete their session
app.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

app.get('/login-failed', (req, res) => {
  res.status(401).send(page('Login failed', `
    <h1>Login didn't work</h1>
    <p>You may have cancelled the Google sign-in. You can try again.</p>
    <p><a class="button" href="/auth/google">Try again</a> &nbsp; <a href="/">Back to home</a></p>`));
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

app.get('/api/me', (req, res) => {
  res.json({ loggedIn: req.isAuthenticated(), user: req.user || null });
});

app.get('/members', requireLogin, (req, res) => {
  res.send(page('Members', `
    <h1>Welcome, ${escapeHtml(req.user.name)}</h1>
    <p>You're signed in with Google as <strong>${escapeHtml(req.user.email)}</strong>.</p>
    <p>This members area is only visible to logged-in users. The server checks your login before sending this page.</p>
    <p><a class="button" href="/auth/logout">Log out</a> &nbsp; <a href="/">Back to home</a></p>`));
});

app.get('/privacy', (req, res) => {
  res.send(page('Privacy', `
    <h1>Privacy policy</h1>
    <p>Business-Jordan uses Google sign-in only to get your name and email address so we can show you the members area.</p>
    <p>This information is kept in a login session for up to one day and is deleted when you log out. We don't sell or share it with anyone.</p>
    <p><a href="/">Back to home</a></p>`));
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
