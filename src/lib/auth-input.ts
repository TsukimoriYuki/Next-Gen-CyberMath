import { createHash, timingSafeEqual } from "node:crypto";

export type AuthInputError = Readonly<{
  ok: false;
  status: 400 | 403 | 503;
  code:
    | "MISSING_INPUT"
    | "INVALID_NAME"
    | "WEAK_PASSCODE"
    | "INVITE_CODE_INVALID"
    | "INVITE_CODE_UNAVAILABLE";
  error: string;
}>;

export type AuthInputSuccess<T> = Readonly<{ ok: true; value: T }>;

const NAME_PATTERN = /^[\p{L}\p{N}](?:[\p{L}\p{N} ._・-]*[\p{L}\p{N}])?$/u;

export function validateRegistrationInput(
  input: unknown,
): AuthInputSuccess<{ name: string; passcode: string; mentorCode: string }> | AuthInputError {
  if (!input || typeof input !== "object") {
    return missingInput();
  }
  const { name, passcode, mentorCode } = input as Record<string, unknown>;
  if (typeof name !== "string" || typeof passcode !== "string" || !name.trim() || !passcode) {
    return missingInput();
  }
  const normalizedName = name.trim();
  if (
    normalizedName.length < 2 ||
    normalizedName.length > 40 ||
    !NAME_PATTERN.test(normalizedName)
  ) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_NAME",
      error: "名前は2〜40文字の文字・数字・空白・一部の記号で入力してください",
    };
  }
  if (passcode.length < 8 || passcode.length > 128 || !passcode.trim()) {
    return {
      ok: false,
      status: 400,
      code: "WEAK_PASSCODE",
      error: "パスコードは8〜128文字で入力してください",
    };
  }
  if (mentorCode != null && typeof mentorCode !== "string") {
    return {
      ok: false,
      status: 400,
      code: "INVITE_CODE_INVALID",
      error: "指導者向け招待コードの形式が正しくありません",
    };
  }
  return {
    ok: true,
    value: {
      name: normalizedName,
      passcode,
      mentorCode: typeof mentorCode === "string" ? mentorCode.trim() : "",
    },
  };
}

export function validateLoginInput(
  input: unknown,
): AuthInputSuccess<{ name: string; passcode: string }> | AuthInputError {
  if (!input || typeof input !== "object") return missingInput();
  const { name, passcode } = input as Record<string, unknown>;
  if (typeof name !== "string" || typeof passcode !== "string" || !name.trim() || !passcode) {
    return missingInput();
  }
  return {
    ok: true,
    value: { name: name.trim(), passcode },
  };
}

export function resolveRegistrationRole(
  mentorCode: string,
  mentorSecret: string | undefined,
): AuthInputSuccess<"MENTOR" | "STUDENT"> | AuthInputError {
  const normalizedMentorCode = mentorCode.trim();
  if (!normalizedMentorCode) return { ok: true, value: "STUDENT" };

  const normalizedSecret = mentorSecret?.trim();
  if (!normalizedSecret) {
    return {
      ok: false,
      status: 503,
      code: "INVITE_CODE_UNAVAILABLE",
      error: "現在、指導者アカウントを登録できません",
    };
  }

  const suppliedDigest = createHash("sha256").update(normalizedMentorCode).digest();
  const expectedDigest = createHash("sha256").update(normalizedSecret).digest();
  if (!timingSafeEqual(suppliedDigest, expectedDigest)) {
    return {
      ok: false,
      status: 403,
      code: "INVITE_CODE_INVALID",
      error: "指導者向け招待コードが正しくありません",
    };
  }
  return { ok: true, value: "MENTOR" };
}

function missingInput(): AuthInputError {
  return {
    ok: false,
    status: 400,
    code: "MISSING_INPUT",
    error: "名前とパスコードを入力してください",
  };
}
