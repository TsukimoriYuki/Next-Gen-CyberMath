import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  resolveRegistrationRole,
  validateLoginInput,
  validateRegistrationInput,
} from "../src/lib/auth-input";
import { validateJWTSecret } from "../src/lib/auth";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

const missing = validateRegistrationInput({ name: "", passcode: "" });
assert.equal(missing.ok, false);
if (!missing.ok) assert.equal(missing.code, "MISSING_INPUT");

const badName = validateRegistrationInput({ name: "a", passcode: "abcdefgh" });
assert.equal(badName.ok, false);
if (!badName.ok) assert.equal(badName.code, "INVALID_NAME");

const weak = validateRegistrationInput({ name: "学習者", passcode: "short" });
assert.equal(weak.ok, false);
if (!weak.ok) assert.equal(weak.code, "WEAK_PASSCODE");

const learner = validateRegistrationInput({ name: " 学習者 ", passcode: "study-123" });
assert.equal(learner.ok, true);
if (learner.ok) assert.equal(learner.value.name, "学習者");

assert.deepEqual(resolveRegistrationRole("", undefined), { ok: true, value: "STUDENT" });
assert.deepEqual(resolveRegistrationRole("  Exact-Code  ", "Exact-Code"), {
  ok: true,
  value: "MENTOR",
});
const wrongInvite = resolveRegistrationRole("exact-code", "Exact-Code");
assert.equal(wrongInvite.ok, false);
if (!wrongInvite.ok) assert.equal(wrongInvite.status, 403);
const missingInvite = resolveRegistrationRole("requested", undefined);
assert.equal(missingInvite.ok, false);
if (!missingInvite.ok) assert.equal(missingInvite.status, 503);

const loginMissing = validateLoginInput({ name: "", passcode: "" });
assert.equal(loginMissing.ok, false);
const legacyLogin = validateLoginInput({ name: "既存利用者", passcode: "1234" });
assert.equal(legacyLogin.ok, true, "existing short passcodes must remain login-compatible");

assert.throws(() => validateJWTSecret(undefined, "production"));
assert.throws(() => validateJWTSecret("too-short", "production"));
assert.doesNotThrow(() => validateJWTSecret("x".repeat(32), "production"));

const authSource = read("src/lib/auth.ts");
for (const expected of [
  "httpOnly: true",
  'sameSite: "lax"',
  'path: "/"',
  'process.env.NODE_ENV === "production"',
  "maxAge: EXPIRES_IN",
  "expires:",
  "maxAge: 0",
  "algorithms: [\"HS256\"]",
]) {
  assert(authSource.includes(expected), `auth cookie/JWT policy is missing ${expected}`);
}

const registerSource = read("src/app/api/auth/register/route.ts");
assert(registerSource.includes("hash(passcode, 12)"), "passcodes must be hashed before persistence");
assert(registerSource.includes("passcode: hashed"), "plain passcodes must not be persisted");
assert(registerSource.includes('process.env.MENTOR_PASSCODE'), "existing invite variable must be reused");
assert(!registerSource.includes('console.error("register error:", e)'), "raw registration errors must not be logged");

const loginSource = read("src/app/api/auth/login/route.ts");
assert(loginSource.includes('status: 401'), "invalid credentials must return 401");
assert(!loginSource.includes('console.error("login error:", e)'), "raw login errors must not be logged");

const authUi = [
  read("src/app/auth/login/page.tsx"),
  read("src/app/auth/register/page.tsx"),
  read("src/components/auth/AuthForm.tsx"),
].join("\n");
for (const banned of ["CYBER OS", "MVP build", "道場の門を開く"]) {
  assert(!authUi.includes(banned), `auth UI contains retired wording: ${banned}`);
}
for (const expected of ["aria-describedby", 'role="alert"', "aria-live", "autoComplete", "8〜128文字"]) {
  assert(authUi.includes(expected), `auth UI accessibility/requirement text is missing ${expected}`);
}

console.log("auth QA passed: validation, invite roles, secret policy, cookie policy, hashing, errors, and auth UI verified.");
