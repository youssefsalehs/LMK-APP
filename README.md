# LMK — Anonymous Messaging App

LMK (Let Me Know) is a full-stack-style frontend for sending and receiving anonymous messages. Users can create an account, verify their identity, build a profile, send anonymous messages to others, receive messages, and manage connection requests — all with dark/light theme support.

Live backend: `https://let-me-know-backend.vercel.app` (configured via `VITE_API_URL`).

---

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Framework | [React](https://react.dev/) | `^19.3.1` | UI library |
| Language | [TypeScript](https://www.typescriptlang.org/) | `~6.0.3` | Type safety |
| Build tool / dev server | [Vite](https://vite.dev/) | `^8.3.4` | Bundling, HMR |
| React plugin | [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) | `^6.1.2` | React + React Compiler via Babel (`babel-plugin-react-compiler`) |
| Routing | [React Router](https://reactrouter.com/) | `^8.5.0` | File-less browser router (`createBrowserRouter`) |
| Server state | [TanStack Query](https://tanstack.com/query/v5) | `^5.105.3` | Data fetching, caching, mutations |
| HTTP client | [Axios](https://axios-http.com/) | `^1.21.0` | API client with automatic access-token refresh |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.3` | Utility-first CSS (Vite plugin) |
| UI primitives | [shadcn/ui](https://ui.shadcn.com/) (`base-nova`) | Local copy in `src/components/ui` | Accessible, unstyled components (button, input, dialog, select, sonner, etc.) |
| Icons | [Lucide React](https://lucide.dev/) | `^1.61.0` | Icon library |
| Animations | [Motion](https://motion.dev/) (Framer Motion) | `^14.6.0` | Layout and page animations |
| Forms | [React Hook Form](https://react-hook-form.com/) | `^7.91.0` | Form state |
| Form validation | [Zod](https://zod.dev/) + [`@hookform/resolvers`](https://github.com/react-hook-form/resolvers) | `^4.6.7` / `^6.0.1` | Schema validation |
| Toasts | [Sonner](https://sonner.emilkowal.ski/) | `^2.0.8` | Toast notifications |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) | `^0.4.6` | Dark/light mode |
| Font | [Geist Variable](https://vercel.com/font) via [`@fontsource-variable/geist`](https://fontsource.org/) | `^5.3.0` | Variable font |
| Utilities | `cn`, `class-variance-authority` | `^0.5.0` / `^0.7.1` | Class merging + component variants |
| OTP inputs | [`input-otp`](https://input-otp.netlify.app/) | `^1.5.0` | One-time password inputs |
| Deploy | [Vercel](https://vercel.com/) | `vercel.json` | SPA fallback rewrite |

### Tooling
- **Linting:** ESLint (`eslint` `^10.13.0`) with `typescript-eslint` and React hooks refresh plugins
- **Formatting:** ESLint stylistic rules via `eslint.config.js`
- **Type checking:** `tsc -b` (project references: `tsconfig.app.json` + `tsconfig.node.json`)
- **Environment:** `.env` (gitignored) with `VITE_API_URL`, `VITE_DEFAULT_PP`, `VITE_DEFAULT_COVER`

---

## Folder Structure

```
NGL-APP/
├── public/                 # Static assets
│   ├── lmk.png             # Favicon / app icon
│   ├── selfie1.jpg
│   └── selfie2.avif
├── src/                    # Application source
│   ├── main.tsx            # Entry point: QueryClient, AuthProvider, ThemeProvider, StrictMode
│   ├── App.tsx             # Router configuration (createBrowserRouter with all routes)
│   ├── index.css           # Tailwind imports, CSS variables (theme), global utilities
│   ├── env                 # (gitignored) VITE_API_URL, VITE_DEFAULT_PP, VITE_DEFAULT_COVER
│   │
│   ├── components/ui/      # shadcn/ui base components (button, input, dialog, sonner, toast, …)
│   ├── context/            # React context providers (ThemeContext.tsx)
│   ├── hooks/              # Global hooks (useCloseMenu.ts)
│   ├── lib/                # api client (axios.ts with token-refresh interceptor), utils (cn)
│   ├── schemas/            # Zod validation schemas (auth.schema.ts, user.schema.ts)
│   ├── types/              # TypeScript models (authModel, messageModel, requestModel, userModel, baseResponse, theme)
│   │
│   ├── features/           # Feature-based modules (domain-driven)
│   │   ├── auth/           # auth.api.ts, hooks (useLogin, useRegister, useVerify…, use2FA…), context/authContext, pages (login, register, forgot-password, reset-password, verification)
│   │   ├── message/        # message.api.ts, hooks (useSendMsg, useGetAllMsgs…), pages (messages, msgPage)
│   │   ├── request/        # request.api.ts, hooks (useMakeRequest, useAcceptRequest…), pages (incomingRequests, sentRequests)
│   │   └── user/           # user.api.ts, hooks (useGetUsersProfile, useUpdateProfile…), pages (myProfile, update-password, enable-2fa)
│   │
│   ├── layouts/            # Route layouts: AuthLayout, DashboardLayout, MainLayout
│   └── shared/             # Cross-feature UI
│       ├── components/     # footer, logo, navbar, pagination, sidebar, theme (ThemeBtn), home sections (hero, movingSection, msgCard, questionsSection, showcase)
│       ├── pages/          # home, notfound
│       └── utils/          # formatDate, idempotency, queryKeys
│
├── index.html              # HTML entry (loads /src/main.tsx)
├── vite.config.ts          # Vite config: React + React Compiler + Tailwind + path alias "@"
├── components.json         # shadcn config (base-nova, Geist, lucide, aliases @/*)
├── tsconfig.json           # Root TS config (project references)
├── tsconfig.app.json       # App TS config (strict, noEmit, jsx react-jsx)
├── tsconfig.node.json      # Node TS config for Vite tooling
├── eslint.config.js        # ESLint flat config
├── vercel.json             # Vercel SPA rewrite (all routes → index.html)
├── package.json            # Scripts + dependencies
└── README.md
```

**Alias:** `@/*` → `./src/*` (configured in `vite.config.ts` and tsconfig paths)

---

## Routes

| Path | Layout | Pages |
|------|--------|-------|
| `/` | `MainLayout` | Home (index), `/messages`, `/sent-requests` |
| `/profile` | `DashboardLayout` | Profile (index), `update-password`, `enable-2fa`, `incoming-requests` |
| `/:username` | — | `MsgPage` — send an anonymous message to a user |
| `/auth` | `AuthLayout` | `login`, `forgot-password`, `reset-password`, `register`, `verification-email`, `verification-login` |

---

## Getting Started

### Prerequisites
- Node.js (recommended via [nvm](https://github.com/nvm-sh/nvm))
- npm / pnpm / yarn

### Install

```bash
# Clone the repo
git clone <your-repo-url>
cd NGL-APP

# Install dependencies
npm install
```

### Environment variables

Create a `.env` file in the project root (it is gitignored):

```env
VITE_API_URL=https://let-me-know-backend.vercel.app
VITE_DEFAULT_PP=https://...default-profile.jpg
VITE_DEFAULT_COVER=https://...default-cover.jpg
```

### Scripts

```bash
npm run dev      # Start Vite dev server (HMR)
npm run build    # Type-check (tsc -b) then Vite production build
npm run preview  # Serve the production build locally
npm run lint     # Run ESLint
```

---

## Key Architecture Notes

- **API client:** `src/lib/axios.ts` creates an axios instance with `withCredentials: true`. It auto-refreshes the access token on 401 responses and dispatches a `window` event `auth:logout` when refresh fails.
- **Server state:** TanStack Query is bootstrapped in `main.tsx` with a `QueryClient` wrapped in `QueryClientProvider`. Shared query keys live in `src/shared/utils/queryKeys.ts`.
- **Auth:** `AuthProvider` (`src/features/auth/context/authContext.tsx`) manages session state across the app.
- **Theming:** `ThemeProvider` (`src/context/ThemeContext.tsx`) with `next-themes`; toggle via `ThemeBtn` in `src/shared/components/theme/`. CSS variables are defined in `src/index.css` for both light and dark modes (oklch colors).
- **Forms:** React Hook Form + Zod schemas (`src/schemas/`) for validation on auth and user forms.
- **Deploy:** `vercel.json` rewrites every path to `index.html` so React Router works on refresh (SPA fallback).

---

## Contributing

1. Create a feature branch from `main`.
2. Make your changes (prefer feature-based folders under `src/features/`).
3. Run `npm run lint` and `npm run build` before pushing.
4. Open a pull request.

---

## License

MIT