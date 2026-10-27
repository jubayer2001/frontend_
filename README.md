# Carewell: the website (frontend)

**Carewell** is a doctor-appointment platform for Bangladesh. Patients find trusted doctors, ask for an appointment and talk
to their doctor online; doctors manage their profile, clinics and requests; administrators verify doctors and run the
platform. The whole website can be switched between **English and Bengali (বাংলা)** with one button.

This repository is **the website** (React + Vite). It talks to the Carewell API, which lives in the **backend repository**
([P10_Backend](https://github.com/ImMirzaShakil/P10_Backend)). You can also run it on its own in **demo mode**, with made-up data
and no backend at all.

## What the website does

- **Patients:** search doctors by specialty, name or area; compare fees, experience and clinics; sign up with an emailed 6-digit
  code; ask for an appointment for yourself or a family member (a request only becomes an appointment when the doctor accepts);
  follow and cancel requests; message the doctor after they accept; rate a doctor after a visit; get notifications.
- **Doctors:** apply to join (account, emailed code, profile, BMDC registration certificate) or accept an administrator's
  invitation; then accept or reject requests, manage availability and profile (with photo), message patients.
- **Administrators** (unlisted sign-in page): review doctor applications, invite and publish doctors, manage clinics,
  specialties, appointments, patients, reviews and support requests.
- **Bengali:** every screen, message and notification, with Bengali numbers and times. **Instant updates** for messages and
  notifications. **Password rules** with a live checklist and a "show password" eye on the patient and doctor sign-in.

## What you need

| Requirement                                  | Version                                  | Check with       |
| -------------------------------------------- | ---------------------------------------- | ---------------- |
| [Node.js](https://nodejs.org) (includes npm) | 20.19 or newer (22 is fine)              | `node --version` |
| [Git](https://git-scm.com/downloads)         | any recent                               | `git --version`  |
| The backend repository, running              | only for "real" mode (not for demo mode) | see step 4       |

## Step by step: run it on your computer

### 1. Download

```sh
git clone https://github.com/jubayer2001/frontend_.git
cd frontend_
```

(No Git? On GitHub click **Code → Download ZIP**, unzip it and open a terminal in the unzipped folder.)

### 2. Install the packages

```sh
npm install
```

This installs everything listed under _Dependencies_ below. It takes about a minute.

### 3. Try it in demo mode (no backend, no accounts)

```sh
npm run dev
```

Open <http://localhost:5173/>. Demo mode uses made-up data kept in the browser (it resets when you reload), and **any email and
password signs in** (use _Doctor sign in_ in the left menu for the doctor side). Nothing is saved anywhere.

To open the administrator side in demo mode, copy `.env.example` to `.env.local`, set `VITE_ADMIN_LOGIN_PATH=/staff-demo`,
restart `npm run dev` and open <http://localhost:5173/#/staff-demo>.

### 4. Run it with the real backend (real accounts and data)

1. Set up and start the backend first. Follow the README of the backend repository
   ([P10_Backend](https://github.com/ImMirzaShakil/P10_Backend)); it should answer at <http://localhost:3000/api/v1/health>.
2. In this folder create the settings file:

   ```sh
   cp .env.example .env.local        # Windows (PowerShell/cmd): copy .env.example .env.local
   ```

3. Open `.env.local` and change these lines:

   ```ini
   VITE_CAREWELL_DATA_MODE=api
   VITE_ADMIN_LOGIN_PATH=/staff-choose-something-hard-to-guess
   ```

   (`VITE_DEV_PROXY_TARGET` is `http://localhost:3000`, where the backend runs. Change it only if the backend uses another port.)

4. Start the website again: `npm run dev`, and open <http://localhost:5173/>.
5. Administrator sign-in: open `http://localhost:5173/#/` followed by your `VITE_ADMIN_LOGIN_PATH`, for example
   `http://localhost:5173/#/staff-choose-something-hard-to-guess`, and sign in with the administrator the backend created
   (`SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` in the backend's `.env.local`).

> The website is only the screens. Without the backend (or in demo mode) there are no real accounts, emails or data.

## Everyday commands

| Command                                   | What it does                                               |
| ----------------------------------------- | ---------------------------------------------------------- |
| `npm run dev`                             | Start the website for development (http://localhost:5173/) |
| `npm test`                                | Run the tests (about 1 minute; they always use demo data)  |
| `npm run lint`                            | Check the code for mistakes                                |
| `npm run format:check` / `npm run format` | Check / fix code formatting                                |
| `npm run build`                           | Build the production website into `dist/`                  |
| `npm run preview`                         | Serve the built website locally to check it                |
| `npm run check`                           | Everything CI runs: lint, format check, tests and a build  |

## Dependencies

All of them are installed by `npm install` (exact versions are locked in `package-lock.json`).

**Runtime (shipped to the browser)**

| Package                         | Version | Used for                                                       |
| ------------------------------- | ------- | -------------------------------------------------------------- |
| `react`, `react-dom`            | ^19.1   | The user interface                                             |
| `react-router-dom`              | ^7.18   | Pages and links (hash routing, so it works on any static host) |
| `framer-motion`                 | ^14.4   | Smooth animations                                              |
| `lucide-react`                  | ^0.468  | Icons                                                          |
| `@fontsource/noto-sans-bengali` | ^5.3    | The Bengali font, bundled so it works offline                  |

**Development only**

| Package                                                                    | Used for                        |
| -------------------------------------------------------------------------- | ------------------------------- |
| `vite`, `@vitejs/plugin-react`                                             | Dev server and production build |
| `vitest`, `jsdom`, `@testing-library/*`                                    | Tests                           |
| `eslint` (+ react, hooks, a11y, prettier plugins), `globals`, `@eslint/js` | Code checks                     |
| `prettier`                                                                 | Code formatting                 |

## How it is organised

```text
src/
  pages/        one file per screen (public, auth, patient, doctor, admin)
  components/   reusable pieces (ui, layout, doctors, discovery, booking, ...)
  hooks/        logic with React state (useResource, useAction, ...)
  context/      shared state (sign-in, language, notifications, booking, ...)
  services/     the ONLY place that talks to the backend, or to the built-in demo data
  i18n/         Bengali: dictionaries and the translator
  utils/        small helpers (dates, passwords, validation)
  styles/       CSS
public/images/  doctor, clinic and landing photos (credits: docs/IMAGE_CREDITS.md)
docs/           ARCHITECTURE.md (start here), API_CONTRACT.md, PRD_TRACEABILITY.md, IMAGE_CREDITS.md, DEPLOYMENT.md
```

A switch (`VITE_CAREWELL_DATA_MODE`) chooses the real API or the in-memory demo; the demo tests double as an executable
specification of the API. Read **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** before adding a feature, and
**[docs/API_CONTRACT.md](docs/API_CONTRACT.md)** for every request the website makes.

## Put it online (Vercel)

Short version (details in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)):

1. Deploy the backend first (see its README) and note its address, for example `https://carewell-api.onrender.com`.
2. In `vercel.json` replace `YOUR-API-NAME.onrender.com` with that address, and push.
3. On [vercel.com](https://vercel.com) choose **Add New → Project**, import this repository (Vercel reads `vercel.json`; no build
   settings to change) and add these **Environment Variables**, then deploy:

   | Name                        | Value                                            |
   | --------------------------- | ------------------------------------------------ |
   | `VITE_CAREWELL_DATA_MODE`   | `api`                                            |
   | `VITE_API_BASE_URL`         | `/api/v1`                                        |
   | `VITE_API_SEND_CREDENTIALS` | `true`                                           |
   | `VITE_ADMIN_LOGIN_PATH`     | your unlisted admin path, e.g. `/staff-xxxxxxxx` |

4. Tell the backend the website's address (its `CLIENT_ORIGINS` and `APP_URL` settings), otherwise every sign-in is refused.

## If something goes wrong

| Problem                                                             | Fix                                                                                                                                     |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install` fails or says the Node version is too old             | Install Node.js 20.19 or newer from <https://nodejs.org>, then run it again                                                             |
| The page is empty or shows errors in "api" mode                     | The backend is not running or `.env.local` is wrong. Check <http://localhost:3000/api/v1/health> and that `VITE_CAREWELL_DATA_MODE=api` |
| Browser console shows `ECONNREFUSED` / proxy errors in the terminal | The backend stopped or restarted. Wait a few seconds, or start it again                                                                 |
| "This request did not come from the Carewell website."              | On a deployed site, the backend's `CLIENT_ORIGINS` must contain the website's exact address                                             |
| _Port 5173 is already in use_                                       | Another copy is running (Vite then uses 5174). Close the other one                                                                      |
| The administrator page says "Page not found"                        | `VITE_ADMIN_LOGIN_PATH` is empty, or you did not restart `npm run dev` after setting it                                                 |
| Links in emails open the wrong address                              | Set `APP_URL` in the backend to this website's address                                                                                  |

## Security notes

- Every `VITE_*` value is **visible to anyone** who opens the website. Never put a password, key or token in this repository
  or in a `VITE_*` variable. `.env.local` is ignored by Git; keep it that way.
- The unlisted administrator address only hides the page. The real protection is on the server (role check, 4-wrong-password
  lock, strong passwords).
- The demo doctors, clinics and patients are **fictional**; photos are stock images (credits in `docs/IMAGE_CREDITS.md`).

## Related repository

- **Backend (API):** <https://github.com/ImMirzaShakil/P10_Backend>
