# Deploying the website (Vercel)

```text
Browser ──▶ Vercel (this website, plus a rewrite of /api/*) ──▶ the Carewell API (backend repository, e.g. on Render) ──▶ Neon
```

The browser only talks to Vercel. Vercel serves the website and forwards every `/api/...` request to the API (`vercel.json`),
so the login cookie stays on one address and there is no cross-site cookie trouble.

## Before you start

- The backend must already be online. Note its address (for example `https://carewell-api.onrender.com`) and check
  `https://<that address>/api/v1/health` answers `{"status":"ok", ...}`. The backend repository explains how to deploy it.
- A free account on [vercel.com](https://vercel.com), connected to GitHub.

## Steps

1. **Edit `vercel.json`:** replace `YOUR-API-NAME.onrender.com` in the first rewrite with your API's address, then commit and push.
   If the API's address ever changes, change it here again.
2. **Vercel → Add New → Project**, import this repository. Vercel reads `vercel.json` (Vite, `npm ci`, `npm run build`, output
   `dist`), so the build settings need no changes.
3. Add these **Environment Variables** (Settings → Environment Variables). They are baked in when the site is built, so
   **redeploy after changing any of them**. Never put a secret here: everything in `VITE_*` is public.

   | Variable                    | Value                                                      |
   | --------------------------- | ---------------------------------------------------------- |
   | `VITE_CAREWELL_DATA_MODE`   | `api` (without it the site shows made-up demo data)        |
   | `VITE_API_BASE_URL`         | `/api/v1`                                                  |
   | `VITE_API_SEND_CREDENTIALS` | `true`                                                     |
   | `VITE_ADMIN_LOGIN_PATH`     | the unlisted admin path, path only, e.g. `/staff-xxxxxxxx` |

4. Deploy. The site uses hash links, so pages look like `https://<your-site>.vercel.app/#/doctors`.
5. **Tell the backend the website's address:** in the backend settings set `CLIENT_ORIGINS=https://<your-site>.vercel.app`
   (exact, no trailing slash) and `APP_URL=https://<your-site>.vercel.app/` (with the trailing slash). Without `CLIENT_ORIGINS`
   every sign-in fails with "This request did not come from the Carewell website."; without `APP_URL` the links in emails are wrong.

## Check that it works

1. Open the Vercel address: doctors and clinics appear.
2. Create a patient account: the verification email arrives (needs email set up on the backend).
3. Open `https://<your-site>.vercel.app/#<your admin path>` and sign in as the administrator.

## Other hosts

Any static host works: build with `npm run build` and publish the `dist/` folder, with a fallback to `index.html` and a rule that
forwards `/api/*` to the backend. If the site lives in a sub-folder (for example GitHub Pages), build with `VITE_BASE_PATH=/folder/`.
Do not publish a build with `VITE_CAREWELL_DATA_MODE=demo` as the real site: it contains no real data.
