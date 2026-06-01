# Sawasdee Trip 🇹🇭 — Deployment Guide

A step-by-step guide to get your Thai language app running locally and live on the internet for free.

---

## What You Have

- **React + Vite** single-page app with Tailwind CSS
- **PWA support** (installable on phone home screen, works offline)
- **AI Translator** powered by Google Gemini 2.5 Flash (requires a free API key)
- Tested on Chrome, Safari (iOS), and Firefox

---

## Step 1 — Install Node.js

If you don't have Node.js installed:

1. Go to **https://nodejs.org** and download the **LTS** version
2. Run the installer (all defaults are fine)
3. Confirm installation by opening a terminal and typing:

```
node --version
npm --version
```

Both commands should print a version number (e.g. `v20.x.x`).

---

## Step 2 — Set Up the Project Locally

Open a terminal in the project folder (the folder containing `package.json`):

```bash
# Install all dependencies
npm install

# Start the development server
npm run dev
```

Open your browser to **http://localhost:5173** — your app is running!

> **Tip:** The dev server has hot-reload — any edits you save appear instantly in the browser.

---

## Step 3 — Add a Gemini API Key (for AI Translator)

The AI Translator tab needs a free Google Gemini API key stored in a local environment file:

1. Go to **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account and click **Create API key**
3. Copy the key
4. Open the `.env` file in the project root (create it from `.env.example` if it doesn't exist)
5. Replace the placeholder value:

```
VITE_GEMINI_API_KEY=paste_your_key_here
```

6. Save the file and restart `npm run dev` — the AI Translator will show a green checkmark when the key is loaded

> **Security:** `.env` is listed in `.gitignore` and will never be committed to Git. The `.env.example` file (no real key) is safe to commit as a template.

---

## Step 4 — Test the Production Build Locally

Before deploying, verify the production bundle works:

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

Open **http://localhost:4173** to confirm everything looks correct.

---

## Step 5A — Deploy to Vercel (Easiest — Recommended)

Vercel gives you a live HTTPS URL in under 2 minutes and redeploys automatically when you push code.

### 5A.1 — Push the project to GitHub

1. Create a free account at **https://github.com**
2. Create a new empty repository named `sawasdee-trip`
3. In your project folder, run:

```bash
git init
git add .
git commit -m "Initial commit — Sawasdee Trip"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sawasdee-trip.git
git push -u origin main
```

### 5A.2 — Connect Vercel

1. Go to **https://vercel.com** and sign in with your GitHub account
2. Click **Add New → Project**
3. Find and import your `sawasdee-trip` repository
4. Vercel automatically detects Vite — leave all settings as default
5. Before clicking Deploy, click **Environment Variables** and add:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** your Gemini API key
   - Leave the environment checkboxes as-is (Production / Preview / Development)
6. Click **Deploy**

Your app will be live at a URL like `https://sawasdee-trip.vercel.app` within a minute!

> **To update the key later:** Vercel dashboard → your project → Settings → Environment Variables.

**Every time you push code to GitHub, Vercel automatically redeploys.** No manual steps needed.

---

## Step 5B — Deploy to Netlify (Alternative)

1. Go to **https://netlify.com** and sign in with GitHub
2. Click **Add new site → Import an existing project**
3. Select your `sawasdee-trip` GitHub repository
4. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Before deploying, go to **Site configuration → Environment variables** and add:
   - **Key:** `VITE_GEMINI_API_KEY` — **Value:** your Gemini API key
6. Click **Deploy site**

> **To update the key later:** Netlify dashboard → your site → Site configuration → Environment variables.

---

## Step 5C — Deploy Manually (Upload Files)

If you prefer not to use GitHub:

```bash
npm run build
```

This creates a `dist/` folder. Upload the entire contents of `dist/` to any static web host:
- **Cloudflare Pages** (free) → drag-and-drop `dist/` at dash.cloudflare.com
- **GitHub Pages** (free)
- **Any shared web hosting** (FTP the `dist/` folder to `public_html/`)

---

## Adding PWA Icons (Optional but Recommended for iOS)

For the best PWA experience, especially on **iPhone (iOS Safari)**, generate PNG icons from the SVG:

1. Install the icon generator (one-time):

```bash
npm install -D @vite-pwa/assets-generator
```

2. Add this script to `package.json` under `"scripts"`:

```json
"generate-icons": "pwa-assets-generator --preset minimal public/logo.svg"
```

3. Run it:

```bash
npm run generate-icons
```

This creates `public/pwa-192.png` and `public/pwa-512.png` which are referenced in `vite.config.js`.

---

## Enabling Thai Voice on Your Devices

The **Speak** buttons use the native device text-to-speech engine. For the best pronunciation:

### iPhone / iPad
1. Settings → Accessibility → Spoken Content → Voices
2. Tap **Thai** and download a voice package

### Android
1. Settings → General Management → Language & Input → Text-to-Speech
2. Select **Google Text-to-Speech** → Install Thai language data

### Windows
1. Settings → Time & Language → Language
2. Add **Thai** and install the language pack (includes TTS)

### Mac
1. System Settings → Accessibility → Spoken Content → System Voice
2. Click **Manage Voices**, scroll to **Thai**, and download

---

## How to Add Custom Phrases

You have two ways to expand the phrasebook:

### Option A — AI Translator (in the app)
1. Make sure `VITE_GEMINI_API_KEY` is set in your `.env` file (see Step 3)
2. Open the **AI Translator** tab — it will show a green checkmark if the key is loaded
3. Type any phrase in English (e.g., "I need a wheelchair")
4. Click **Translate**
5. Review the result and click **Save to Phrasebook**

### Option B — Edit the source code
Open `src/App.jsx` and add a new object to the `INITIAL_PHRASES` array following this pattern:

```js
{
  id: 'unique_id',
  english: 'Your phrase in English',
  thaiBase: 'Thai script without particle',
  phoneticMale: 'Romanized + khrap',
  phoneticFemale: 'Romanized + ka',
  thaiMale: 'Thai script + ครับ',
  thaiFemale: 'Thai script + ค่ะ',
  category: 'Essentials', // or: Food & Dining / Directions & Travel / Shopping & Numbers / Social & Culture
  literal: 'Word-by-word English breakdown',
  tip: 'Cultural or practical usage tip',
},
```

Save the file, and the phrase will appear immediately in development or after your next build/deploy.

---

## Updating the Trip Date

1. Open the app
2. Go to **Trip Settings** (gear icon)
3. Pick your departure date in the **Departure Date** field

The countdown on the sidebar will update instantly.

---

## Updating the App

After making changes to source files:

```bash
# If using Vercel/Netlify with GitHub:
git add .
git commit -m "Updated phrases / fixed bug"
git push

# Vercel/Netlify automatically redeploys within ~60 seconds.

# If deploying manually:
npm run build
# Then re-upload the new dist/ folder
```

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `npm install` fails | Make sure Node.js is installed. Try `npm install --legacy-peer-deps` |
| Voice not working | Install a Thai voice package on your device (see section above) |
| AI Translator says "failed" | Check that `VITE_GEMINI_API_KEY` is set correctly in `.env` (or in your host's env var settings). Make sure you have free quota remaining at aistudio.google.com. |
| App looks broken after deploy | Run `npm run build` locally first to catch errors before pushing |
| iOS "Add to Home Screen" doesn't show | Open the site in **Safari** (not Chrome) on iOS, then tap the Share button |

---

## Quick Reference Commands

```bash
npm install       # Install / update dependencies
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Create production build in dist/
npm run preview   # Preview production build locally (http://localhost:4173)
```

---

*สวัสดี — Have an amazing trip to Thailand! 🐘🌺✈️*
