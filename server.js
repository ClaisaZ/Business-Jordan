// Express backend for Business-Jordan (COMP 1350)
// Milestone A: serves the built React app behind Nginx
// Milestone B: adds "Sign in with Google" and a login-only /members page
import 'dotenv/config';                        // load secrets from .env
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

// Read port from env so Milestone C can run multiple copies (3000, 3001...)
const PORT = process.env.PORT || 3000;
// Only listen locally - Nginx is the only public-facing service
const HOST = '127.0.0.1';

// Stop right away if a secret is missing, instead of failing later
for (const name of ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_CALLBACK_URL', 'SESSION_SECRET']) {
  if (!process.env[name]) {
    console.error(`Missing ${name} in .env`);
    process.exit(1);
  }
}

// Nginx handles HTTPS, so trust it when it says the request was secure
app.set('trust proxy', 1);

// Sessions: remember who is logged in, saved to files (not memory)
app.use(session({
  store: new FileStore({ path: path.join(__dirname, 'sessions'), retries: 0 }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,                // browser JavaScript can't read the cookie
    secure: true,                  // cookie is only sent over HTTPS
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,   // stay logged in for 1 day
  },
}));

// Google login: only ask for basic profile and email
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    // Keep only what we need
    done(null, {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
    });
  }
));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
app.use(passport.initialize());
app.use(passport.session());

// Blocks a route unless the user is logged in
function requireLogin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

// Make text safe before putting it into HTML
const escapeHtml = (s = '') => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

// Simple page wrapper for the server-made pages
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

// ---------- Login routes ----------
// Step 1: send the user to Google's sign-in page
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2: Google sends the user back here after they sign in (or cancel)
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  (req, res) => res.redirect('/members')
);

// Log out: end the Passport login, delete the session, clear the cookie
app.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

// Shown if the user cancels or Google login fails
app.get('/login-failed', (req, res) => {
  res.status(401).send(page('Login failed', `
    <h1>Login didn't work</h1>
    <p>You may have cancelled the Google sign-in. You can try again.</p>
    <p><a class="button" href="/auth/google">Try again</a> &nbsp; <a href="/">Back to home</a></p>`));
});

// ---------- API routes ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

// Lets the React site check whether someone is logged in
app.get('/api/me', (req, res) => {
  res.json({ loggedIn: req.isAuthenticated(), user: req.user || null });
});

// ---------- Login-only page ----------
app.get('/members', requireLogin, (req, res) => {
  res.send(page('Members', `
    <h1>Welcome, ${escapeHtml(req.user.name)}</h1>
    <p>You're signed in with Google as <strong>${escapeHtml(req.user.email)}</strong>.</p>
    <p>This members area is only visible to logged-in users. The server checks your login before sending this page.</p>
    <p><a class="button" href="/auth/logout">Log out</a> &nbsp; <a href="/">Back to home</a></p>`));
});

// ---------- Privacy page (linked from the Google consent screen) ----------
app.get('/privacy', (req, res) => {
  res.send(page('Privacy', `
    <h1>Privacy policy</h1>
    <p>Business-Jordan uses Google sign-in only to get your name and email address so we can show you the members area.</p>
    <p>This information is kept in a login session for up to one day and is deleted when you log out. We don't sell or share it with anyone.</p>
    <p><a href="/">Back to home</a></p>`));
});

// ---------- React site ----------
// Serve the built React app
app.use(express.static(path.join(__dirname, 'dist')));

// Send index.html for any other route (React handles the page)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
