import assert from "node:assert/strict";
import {
  calendarDateToEpochDay,
  getJstCalendarDate,
  shiftCalendarDate,
} from "../src/lib/jst-calendar-date";
import { todayKey } from "../src/lib/progress";

const cases = [
  ["JST 23:59", "2026-07-15T14:59:00.000Z", "2026-07-15"],
  ["JST 00:00", "2026-07-15T15:00:00.000Z", "2026-07-16"],
  ["JST 00:01", "2026-07-15T15:01:00.000Z", "2026-07-16"],
  ["JST 08:59", "2026-07-15T23:59:00.000Z", "2026-07-16"],
  ["JST 09:00", "2026-07-16T00:00:00.000Z", "2026-07-16"],
  ["month end", "2026-01-31T15:00:00.000Z", "2026-02-01"],
  ["new year", "2026-12-31T15:00:00.000Z", "2027-01-01"],
  ["leap day", "2028-02-28T15:00:00.000Z", "2028-02-29"],
] as const;

for (const [label, timestamp, expected] of cases) {
  assert.equal(getJstCalendarDate(timestamp), expected, label);
  assert.equal(getJstCalendarDate(new Date(timestamp)), expected, `${label} (Date input)`);
  assert.equal(getJstCalendarDate(Date.parse(timestamp)), expected, `${label} (number input)`);
}

assert.equal(
  getJstCalendarDate("2026-07-15T15:00:00.000Z"),
  "2026-07-16",
  "UTC and JST calendar dates must differ after 15:00 UTC",
);
assert.equal(todayKey(new Date("2026-07-15T15:00:00.000Z")), "2026-07-16");
assert.equal(shiftCalendarDate("2028-02-28", 1), "2028-02-29");
assert.equal(shiftCalendarDate("2026-12-31", 1), "2027-01-01");
assert.equal(
  calendarDateToEpochDay("2026-07-16") - calendarDateToEpochDay("2026-07-15"),
  1,
);
assert.throws(() => getJstCalendarDate("07/15/2026"), RangeError);
assert.throws(() => getJstCalendarDate("2026-07-15"), RangeError);
assert.throws(() => shiftCalendarDate("2026-02-30", 1), RangeError);

console.log("JST calendar QA passed: midnight, month/year, leap-day, and input boundaries verified.");
