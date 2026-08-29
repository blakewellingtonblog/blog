# Rally Forward Foundation — website

A nonprofit site for badminton and para-badminton in the United States: athlete
pathway grants, adaptive court sports for veterans, youth access, and coach
development.

## Two things live here

**`rally-forward.html`** — the whole site as one self-contained page. Open it in
a browser, or drop it on any host. No build step, no dependencies.

**Everything else** — the same site as a React + Vite app (multi-page, with a
working contact form), for when it outgrows a single file. Run it with:

```
npm install
npm run dev
```

## Before this goes live

- **The organization name is a placeholder.** "Rally Forward Foundation" was
  invented for this draft. Replace it — in `rally-forward.html`, and in
  `src/config/site.js` for the React version.
- **Fill in the bracketed values**: EIN, email, phone, mailing address. They are
  marked in dashed outlines on the page so they cannot be missed.
- **Confirm Steve Kearney's biography with him** before publishing. It is
  drafted from public sources (USA Badminton, the National Senior Games
  Association, Military Adaptive Court Sports) and he has not reviewed it.
- **Point the donate links** at a real payment processor.
- **The numbers band cites facts about the sport, not results of the
  foundation.** Keep it that way until there are audited figures to publish.

## Deploying

`netlify.toml` is configured for the React build. For the single-file version,
any static host works — upload `rally-forward.html` as `index.html`.

The contact form in the React version uses Netlify Forms; the hidden stub in
`index.html` is what registers it at deploy time. To host elsewhere, change
`ENDPOINT` in `src/pages/ContactPage.jsx`.
