Create this application to help me get prepared for a trip to thailand. It'll be just my wife and I. We want to learn basic travel translations. The trip is in about a year. 

Sawasdee Trip (สวัสดี ทริป) - Thai Language Learning Platform

Your premium, interactive Thai travel language platform to study, hear, practice, and build retention before your flight.

🌟 High-yield Key Features

Dynamic Tone Switching (Gender-specific Particles):

Thai polite particles change based on the speaker's gender. Selecting Male (🧔) instantly formats everything using "khrap/ครับ", and choosing Female (👩) formats everything using "ka/ค่ะ".

Audio Speech Synthesis:

Uses native window.speechSynthesis configured with the 'th-TH' locale. It sounds out each Thai character and phonetic spelling on demand.

Practice Arena:

High-retention flashcards with active recall testing.

Multiple-choice phrasal quizzes.

Audio-only listening challenges.

AI-powered Translator (Gemini 2.5 Flash):

Enter custom phrases (e.g., food allergies, flight requests) to instantly translate them with male/female variants, romanization phonetics, and usage tips. Includes custom API key support.

Countdown & Progress Tracker:

Set your travel date in the settings to activate the departure countdown. Track your streak and percentage of mastered phrases.


Example things we'd like to be able to say but include anything else you thing would be helpful. I'd also like to be able to add additional phrases later.
Where is ...
Where is the bathroom
Hello/Greetings
Goodbye
Thank you
Very good
Any local customs
I'm alergic to shellfish
Does this have any shellfish
help
My name is ...
How do i get to
How much is this
Will you take (when negotiating)

This should be a web app but also a pwa application.

this app should be able to support 2 people Myself (male) and lynsie (female)

Also create a easy to follow deployment guide.

Here's an example of what google gemini said for the guide

How to Deploy "Sawasdee Trip" 🚀

Since your Thai language platform is built using React (with Tailwind CSS and Lucide Icons) and runs entirely in the browser, you can deploy it online for free using modern static hosting providers.

Option 1: Instant Deployment with Vercel or Netlify (Easiest)

This option automatically builds and hosts your app directly from a GitHub repository, updating it every time you push code.

Step 1: Initialize a Local Project

If you haven't already, set up a standard React + Vite workspace:

# Create a new Vite React project
npm create vite@latest sawasdee-trip -- --template react

# Move into the project directory
cd sawasdee-trip

# Install dependencies (including Lucide icons and Tailwind CSS)
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Step 2: Configure Tailwind

Ensure your tailwind.config.js looks like this to scan your files:

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


Add the Tailwind directives to your src/index.css file:

@tailwind base;
@tailwind components;
@tailwind utilities;


Step 3: Replace App Code

Copy the full content of the generated App.jsx file and replace the contents of your local src/App.jsx with it.

Step 4: Push to GitHub

Create a free account at GitHub.

Create a new, empty repository named sawasdee-trip.

Push your local project to GitHub:

git init
git add .
git commit -m "Initial commit of Sawasdee Trip"
git branch -M main
git remote add origin [https://github.com/YOUR_USERNAME/sawasdee-trip.git](https://github.com/YOUR_USERNAME/sawasdee-trip.git)
git push -u origin main


Step 5: Connect to Hosting

For Vercel: Go to Vercel, click Add New > Project, import your GitHub repository, and click Deploy. Vercel will automatically detect Vite and handle the build process.

For Netlify: Go to Netlify, click Add new site > Import an existing project, link your GitHub, and click Deploy site.

Option 2: Build and Test Locally

To run the application on your computer first to make sure everything looks right:

In your project directory, run:

npm run dev


Open the URL provided in the terminal (usually http://localhost:5173) in your browser.

When you are ready to prepare a production bundle, run:

npm run build


This will create a dist/ folder containing highly optimized, compiled static assets that you can upload to any web hosting server.

Technical Features Note

Speech Engine: The app uses the native HTML5 Web Speech API (window.speechSynthesis). To make sure you hear the Thai voice pronunciation perfectly on mobile, ensure your device has a Thai Voice Package enabled in its system accessibility/text-to-speech settings.

Storage: User progress, favorites, custom phrases, and streaks are securely saved inside your browser's local storage (localStorage). No external database setup is needed to start practicing right away!