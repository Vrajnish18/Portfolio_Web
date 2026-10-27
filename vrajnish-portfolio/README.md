# Vrajnish Aghera — Portfolio

React + Vite + Tailwind CSS v4 portfolio, built for freelancing.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

Needs Node 18+.

## Edit your content

Everything lives in **`src/data.js`**: name, bio, email, social links, stats,
services, projects, skills, process. Items marked `(placeholder)` are samples.

## What's inside

- **Dark / light theme**: toggle in the navbar, remembered in localStorage.
  Colours are CSS variables at the top of `src/index.css`. Change `--accent` to
  re-colour the whole site and the cursor wave together.
- **Cursor wave**: `src/components/CursorWave.jsx`. A canvas ribbon that follows
  the mouse and uses the accent colour. Disabled on touch devices and when the
  user prefers reduced motion.
- **Avatar**: `src/components/Avatar.jsx`. SVG face whose eyes, head, hair, brows
  and mouth follow the cursor anywhere on the page. Change the hair, skin and
  shirt colours at the top of the file, or swap in your own SVG layers.
- **Fonts**: Poppins (300–600) and JetBrains Mono. No weight above 600 is used.
- **Contact form**: opens the visitor's email app with the details pre-filled.
  For a hosted form, point `onSubmit` in `Contact.jsx` at Formspree or similar.

## Deploy

Push to GitHub and import into Vercel or Netlify (build: `npm run build`, output: `dist`).
