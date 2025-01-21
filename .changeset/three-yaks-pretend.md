---
"@wunderwerk/next-stateless-session": major
---

Support Next.js 15

BREAKING CHANGE: calls to the `cookies()` function are now async, thus making
the `deleteSession()` method of the session manager async as well.
