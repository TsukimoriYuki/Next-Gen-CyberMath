const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const ISO_TIMESTAMP_WITH_ZONE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;
const CALENDAR_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export type TimestampInput = Date | number | string;

function timestampMs(input: TimestampInput): number {
  if (typeof input === "string" && !ISO_TIMESTAMP_WITH_ZONE.test(input)) {
    throw new RangeError("timestamp strings must be ISO 8601 values with an explicit timezone");
  }
  const value =
    input instanceof Date
      ? input.getTime()
      : typeof input === "number"
        ? input
        : Date.parse(input);
  if (!Number.isFinite(value)) throw new RangeError("invalid timestamp");
  return value;
}

/** Returns the Asia/Tokyo calendar date for an instant as YYYY-MM-DD. */
export function getJstCalendarDate(now: TimestampInput = Date.now()): string {
  return new Date(timestampMs(now) + JST_OFFSET_MS).toISOString().slice(0, 10);
}

function parseCalendarDate(date: string): number {
  const match = CALENDAR_DATE.exec(date);
  if (!match) throw new RangeError("calendar date must use YYYY-MM-DD");
  const value = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (new Date(value).toISOString().slice(0, 10) !== date) {
    throw new RangeError("invalid calendar date");
  }
  return value;
}

/** Shifts a calendar date without depending on the host timezone or locale. */
export function shiftCalendarDate(date: string, days: number): string {
  if (!Number.isInteger(days)) throw new RangeError("days must be an integer");
  return new Date(parseCalendarDate(date) + days * DAY_MS).toISOString().slice(0, 10);
}

export function calendarDateToEpochDay(date: string): number {
  return Math.floor(parseCalendarDate(date) / DAY_MS);
}
