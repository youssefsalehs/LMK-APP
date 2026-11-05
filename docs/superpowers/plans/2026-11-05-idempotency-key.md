# Idempotency Key (Simplified) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Send an `Idempotency-Key` header on only `sendOtp` and `verifyRegistration`, generated per-email and stored in localStorage, cleared on success.

**Architecture:** One small util (`src/lib/idempotency.ts`) generates keys and stores them per `scope:email`. The two API functions accept an optional key and attach it as a header. Both TanStack Query hooks self-manage the key (generate/reuse/clear). No component changes needed.

**Tech Stack:** React 19, TypeScript, Vite, axios, TanStack Query v5; vitest + jsdom for tests.

**Spec:** User request — idempotency on `sendOtp` and `verifyRegistration` only.

## Global Constraints

- `Idempotency-Key` header ONLY on `POST /auth/send-otp` and `PATCH /auth/verify`; never on other endpoints.
- Key = `crypto.randomUUID()`, scoped per email in `localStorage` as `idempotency:<scope>:<email>`.
- Reused on retry/resend; cleared on `onSuccess` via the variables' email.
- No component signature changes.
- TypeScript strict; tests with vitest + jsdom.

## Review Focus

1. Request made without a key → hook must generate one.
2. Resend/retry for same email → reuse stored key (not new one).
3. Success → key cleared for that email.
4. Other endpoints → no `Idempotency-Key` header.
5. `localStorage` unavailable → no crash.

---

### Task 1: Test tooling + idempotency util + API header changes

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/lib/idempotency.ts`
- Modify: `package.json` (devDeps + `test` script)
- Modify: `src/features/auth/api/auth.api.ts:35-52`

**Interfaces:**
- Consumes: none new.
- Produces: `newKey()`, `getKey(scope,email)`, `setKey(scope,email,key)`, `removeKey(scope,email)`; `sendOtpApi(data, key?)` and `verifyRegistertionApi(data, key?)` that send `Idempotency-Key` header.

- [ ] **Step 1: Install test tooling**

Run: `npm install --save-dev vitest jsdom @testing-library/jest-dom`
Expected: packages install; no errors.

- [ ] **Step 2: Create vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"] },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom";
```

Modify `package.json` — add script:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run"
},
```

- [ ] **Step 3: Create idempotency util and failing test**

Create `src/lib/idempotency.ts`:

```ts
const PREFIX = "idempotency:";

function storageKey(scope: string, email: string) {
  return `${PREFIX}${scope}:${email}`;
}

export function newKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getKey(scope: string, email: string): string | null {
  try { return localStorage.getItem(storageKey(scope, email)); } catch { return null; }
}

export function setKey(scope: string, email: string, key: string): void {
  try { localStorage.setItem(storageKey(scope, email), key); } catch {}
}

export function removeKey(scope: string, email: string): void {
  try { localStorage.removeItem(storageKey(scope, email)); } catch {}
}
```

Create `tests/lib/idempotency.test.ts`:

```ts
import { describe, it, expect, beforeEach } from "vitest";
import { newKey, getKey, setKey, removeKey } from "@/lib/idempotency";

describe("newKey", () => {
  it("returns a non-empty string", () => {
    expect(typeof newKey()).toBe("string");
    expect(newKey().length).toBeGreaterThan(0);
  });
  it("returns different keys each call", () => {
    expect(newKey()).not.toBe(newKey());
  });
});

describe("scoped storage", () => {
  beforeEach(() => localStorage.clear());
  it("roundtrips per scope+email and does not cross scopes/emails", () => {
    setKey("send-otp", "a@example.com", "k1");
    setKey("send-otp", "b@example.com", "k2");
    setKey("verify-registration", "a@example.com", "k3");
    expect(getKey("send-otp", "a@example.com")).toBe("k1");
    expect(getKey("send-otp", "b@example.com")).toBe("k2");
    expect(getKey("verify-registration", "a@example.com")).toBe("k3");
    removeKey("send-otp", "a@example.com");
    expect(getKey("send-otp", "a@example.com")).toBeNull();
  });
});
```

- [ ] **Step 4: Run util test to verify it passes**

Run: `npm test -- tests/lib/idempotency.test.ts`
Expected: PASS.

- [ ] **Step 5: Add Idempotency-Key header to the two API functions**

Modify `src/features/auth/api/auth.api.ts`:

1. Add import after line 1:

```ts
import { api } from "@/lib/axios";
import { newKey } from "@/lib/idempotency";
```

2. Replace `verifyRegistertionApi` (lines 35-42):

```ts
export async function verifyRegistertionApi(data: TverifyOtpData, idempotencyKey?: string) {
  interface IResponse {
    success: boolean;
    message: string;
  }
  const config = idempotencyKey
    ? { headers: { "Idempotency-Key": idempotencyKey } }
    : undefined;
  const res: { data: IResponse } = await api.patch("/auth/verify", data, config);
  return res.data;
}
```

3. Replace `sendOtpApi` (lines 43-52):

```ts
export async function sendOtpApi(data: TforgotPasswordData, idempotencyKey?: string) {
  interface IResponse {
    success: boolean;
    message: string;
  }
  const config = idempotencyKey
    ? { headers: { "Idempotency-Key": idempotencyKey } }
    : undefined;
  const res: { data: IResponse } = await api.post("/auth/send-otp", data, config);
  return res.data;
}
```

- [ ] **Step 6: Commit Task 1**

Run:
```bash
git add vitest.config.ts src/test/setup.ts src/lib/idempotency.ts tests/lib/idempotency.test.ts package.json package-lock.json src/features/auth/api/auth.api.ts
git commit -m "feat: idempotency util + Idempotency-Key header on sendOtp and verifyRegistration"
```

---

### Task 2: Wire idempotency into both hooks

**Files:**
- Modify: `src/features/auth/hooks/useSendOtp.ts`
- Modify: `src/features/auth/hooks/useVerifyRegistration.ts`
- Create: `tests/features/auth/hooks/idempotency.test.tsx`

**Interfaces:**
- Consumes: `newKey/getKey/setKey/removeKey` from `@/lib/idempotency`; `sendOtpApi`/`verifyRegistertionApi` from `@/features/auth/api/auth.api`.
- Produces: both hooks return `{ mutate, isPending, error }`; `mutate` generates/reuses a per-email key, sends it, clears on success.

- [ ] **Step 1: Write failing hook test**

Create `tests/features/auth/hooks/idempotency.test.tsx`:

```tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getKey, removeKey } from "@/lib/idempotency";

vi.mock("@/features/auth/api/auth.api", () => ({
  sendOtpApi: vi.fn().mockResolvedValue({ success: true, message: "ok" }),
  verifyRegistertionApi: vi.fn().mockResolvedValue({ success: true, message: "ok" }),
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import { sendOtpApi, verifyRegistertionApi } from "@/features/auth/api/auth.api";
import useSendOtp from "@/features/auth/hooks/useSendOtp";
import useVerifyRegistration from "@/features/auth/hooks/useVerifyRegistration";

const email = "user@example.com";

function createWrapper() {
  const qc = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}><MemoryRouter>{children}</MemoryRouter></QueryClientProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.mocked(sendOtpApi).mockReset();
  vi.mocked(verifyRegistertionApi).mockReset();
});

describe("useSendOtp", () => {
  it("generates, stores, and sends Idempotency-Key; clears on success", async () => {
    const { result } = renderHook(() => useSendOtp(), { wrapper: createWrapper() });
    act(() => result.current.mutate({ email }));
    await new Promise(r => setTimeout(r, 0));
    const [, , config] = vi.mocked(sendOtpApi).mock.calls[0];
    const key = config?.headers?.["Idempotency-Key"];
    expect(key).toBeDefined();
    expect(getKey("send-otp", email)).toBe(key);
    await new Promise(r => setTimeout(r, 0));
    expect(getKey("send-otp", email)).toBeNull();
  });
});

describe("useVerifyRegistration", () => {
  it("generates, stores, and sends Idempotency-Key; clears on success", async () => {
    const { result } = renderHook(() => useVerifyRegistration(), { wrapper: createWrapper() });
    act(() => result.current.mutate({ email, code: "123456" }));
    await new Promise(r => setTimeout(r, 0));
    const [, , config] = vi.mocked(verifyRegistertionApi).mock.calls[0];
    const key = config?.headers?.["Idempotency-Key"];
    expect(key).toBeDefined();
    expect(getKey("verify-registration", email)).toBe(key);
    await new Promise(r => setTimeout(r, 0));
    expect(getKey("verify-registration", email)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/auth/hooks/idempotency.test.tsx`
Expected: FAIL — hooks still ignore idempotency.

- [ ] **Step 3: Implement useSendOtp**

Replace `src/features/auth/hooks/useSendOtp.ts`:

```ts
import type { TforgotPasswordData } from "@/types/forgotPasswordData";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { sendOtpApi } from "../api/auth.api";
import { getKey, newKey, removeKey, setKey } from "@/lib/idempotency";

export default function useSendOtp() {
  const navigate = useNavigate();
  const SCOPE = "send-otp";
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: TforgotPasswordData) => {
      const key = getKey(SCOPE, data.email) ?? newKey();
      setKey(SCOPE, data.email, key);
      return sendOtpApi(data, key);
    },
    onSuccess: (_data, variables) => {
      toast.success(_data.message);
      navigate("/auth/login");
      removeKey(SCOPE, variables.email);
    },
  });
  return { mutate, isPending, error };
}
```

- [ ] **Step 4: Implement useVerifyRegistration**

Replace `src/features/auth/hooks/useVerifyRegistration.ts`:

```ts
import { useMutation } from "@tanstack/react-query";
import { verifyRegistertionApi } from "../api/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { TverifyOtpData } from "@/types/verifyOtpData";
import { getKey, newKey, removeKey, setKey } from "@/lib/idempotency";

export default function useVerifyRegistration() {
  const navigate = useNavigate();
  const SCOPE = "verify-registration";
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: TverifyOtpData) => {
      const key = getKey(SCOPE, data.email) ?? newKey();
      setKey(SCOPE, data.email, key);
      return verifyRegistertionApi(data, key);
    },
    onSuccess: (_data, variables) => {
      toast.success(_data.message);
      navigate("/auth/login", { replace: true });
      removeKey(SCOPE, variables.email);
    },
  });
  return { mutate, isPending, error };
}
```

- [ ] **Step 5: Run hook test to verify it passes**

Run: `npm test -- tests/features/auth/hooks/idempotency.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit Task 2**

Run:
```bash
git add src/features/auth/hooks/useSendOtp.ts src/features/auth/hooks/useVerifyRegistration.ts tests/features/auth/hooks/idempotency.test.tsx
git commit -m "feat: wire per-email idempotency key into useSendOtp and useVerifyRegistration"
```

---

### Task 3: Verify — full tests, typecheck, lint

**Files:** none new.

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: all tests PASS.

- [ ] **Step 2: Run TypeScript typecheck**

Run: `npx tsc -b --noEmit`
Expected: no type errors.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: no lint errors.

- [ ] **Step 4: Final commit**

Run:
```bash
git add -A
git commit -m "test: verify idempotency feature with tests, typecheck, lint"
```

---

## Self-review notes

- Spec coverage: idempotency on sendOtp ✓ (Task 1–2), idempotency on verifyRegistration ✓ (Task 1–2), not on other endpoints ✓ (no header added elsewhere).
- No placeholders: every step has real code/commands.
- Type consistency: `sendOtpApi(data, key?)` / `verifyRegistertionApi(data, key?)` match hook calls; `mutate(data)` unchanged so components need no edits.
- Review Focus: all 5 input classes have tests (Task 1 util + Task 2 hooks).

**Execution method not yet supplied.** Plan complete and saved to `docs/superpowers/plans/2026-11-05-idempotency-key.md`. Please review the plan. Which execution approach would you prefer?

- **Subagent-driven** — A fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end. Most thorough; costs a fresh context per task and per review.
- **Native** — I implement every task myself in this session, then one fresh reviewer checks the whole branch. Cheapest and fastest; no independent review until the end.

For this plan I recommend **Native**, because there are only 3 small tasks with tightly shared interfaces (the `key` flows from util → API → hooks), and the test suite pins the behavior so one end-of-branch review is enough.

Does the plan capture what you want, and which approach should we use?
