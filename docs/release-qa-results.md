# Release QA Results

Cyber Math public release candidate final QA log.

## Run

- Date: 2026-06-29
- Environment: Windows local production server, `http://127.0.0.1:3014`
- Build env: `NEXT_PUBLIC_SITE_URL=https://next-gen-cyber-math.vercel.app`
- Lighthouse: `npx lighthouse@13.4.0`
- Browser: Google Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Device profile: Lighthouse mobile default
- Categories: Performance, Accessibility, Best Practices, SEO

Two Lighthouse runs returned a Windows temp-profile cleanup `EPERM` after writing JSON output. The generated reports were still parsed and recorded below.

## Lighthouse Mobile Results

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT | Main warnings |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| `/` | 88 | 100 | 100 | 100 | 3.2 s | 0.005 | 70 ms | Reduce unused JavaScript |
| `/math` | 89 | 100 | 100 | 100 | 3.0 s | 0 | 110 ms | Reduce initial server response time; Reduce unused JavaScript |
| `/common-test` | 85 | 93 | 96 | 100 | 3.3 s | 0.081 | 180 ms | Reduce unused JavaScript |
| `/courses` | 74 | 100 | 100 | 100 | 3.8 s | 0 | 310 ms | Reduce unused JavaScript |
| `/quality` | 90 | 100 | 100 | 100 | 3.0 s | 0 | 40 ms | Reduce unused JavaScript |
| `/common-test/lectures/math-1a-shortcut-formulas` | 37 | 96 | 100 | 100 | 5.5 s | 0 | 2610 ms | Reduce unused JavaScript |
| `/common-test/lectures/quadratic-case-split-intensive` | 40 | 96 | 100 | 100 | 6.0 s | 0 | 8740 ms | Reduce unused JavaScript |
| `/common-test/math-1a/section-2` | 69 | 96 | 100 | 100 | 4.5 s | 0 | 310 ms | Reduce unused JavaScript |

## Lighthouse Interpretation

- Accessibility, Best Practices, and SEO are release-ready on the measured routes after the small A11y fixes.
- Performance remains below target on `/courses`, the two long special lecture pages, and `/common-test/math-1a/section-2`.
- The long lecture pages are dominated by client-side lecture interactions, MathText/KaTeX rendering, and large content blocks. This is not a small final-QA fix.
- LCP is above the 2.5 s target on all measured pages except none; the public gate should treat this as a known performance backlog rather than a blocker if content quality is prioritized for this release.
- CLS is within target for every measured route.
- TBT is within target on the main public pages except `/courses`; the two long lectures exceed target substantially.

## Keyboard And Accessibility QA

Checked routes:

- `/`
- `/math`
- `/common-test`
- `/courses`
- `/quality`
- `/auth/login`
- `/auth/register`
- `/common-test/lectures/math-1a-shortcut-formulas`
- `/common-test/lectures/quadratic-case-split-intensive`
- `/common-test/math-1a/section-2`

Checked results:

- Header icon links now have explicit accessible names on mobile.
- Header links expose visible focus ring classes.
- Login and register inputs have label/input pairs.
- Password reveal controls have meaningful accessible names.
- Special lecture mobile TOC has `aria-expanded` and `aria-controls`.
- Special lecture read toggles have block-specific `aria-label`, `aria-pressed`, and improved contrast.
- Discrimination drill choice buttons now have accessible names even when the visual content is KaTeX-only.
- Common Test mark-sheet input has `aria-label` and helper text association.
- Answer result status uses `role="status"` and `aria-live="polite"`.

The in-app automation could inspect focusable elements and operate key controls, but real Tab traversal is still best verified by a human in Chrome because automated Tab delivery has been inconsistent in this environment.

## Production Smoke

- Desktop routes above: no console errors observed.
- Mobile 390 px routes checked: `/`, `/common-test`, `/quality`, `/common-test/lectures/math-1a-shortcut-formulas`, `/common-test/math-1a/section-2`.
- No page-level horizontal overflow observed.
- No visible `raw TeX`, `NaN`, `undefined`, `null`, or `Invalid Date` found.
- Security headers checked on production server route `/quality`.
- Canonical and `og:url` use `https://next-gen-cyber-math.vercel.app` on smoke routes, including `/auth/login` and `/auth/register` after metadata update.

## Fixes Applied

- Added accessible names and focus-visible rings to mobile header icon links.
- Added canonical, description, and OGP metadata to login/register pages.
- Raised contrast for special lecture read toggle buttons.
- Added accessible labels and pressed state to discrimination drill choices.
- Added `qa:public` checks for auth metadata routes and required QA documents.

## Remaining Release Items

- Human keyboard pass in Chrome: Tab order, focus ring visibility, Enter/Space operation, and Esc behavior where applicable.
- Performance backlog for long special lectures and `/courses`.
- Consider a future code-splitting pass for long lecture interactions and MathText-heavy blocks.
- Consider heading-order cleanup in the Common Test dashboard area; not release-blocking after measured Accessibility scores are above 90.
