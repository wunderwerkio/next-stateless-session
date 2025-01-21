# next-stateless-session

## 1.0.0

### Major Changes

- [#9](https://github.com/wunderwerkio/next-stateless-session/pull/9) [`bed6767`](https://github.com/wunderwerkio/next-stateless-session/commit/bed6767a232d3f81859a0df7b6b82b6c60c1f7ea) Thanks [@chfoidl](https://github.com/chfoidl)! - Support Next.js 15

  BREAKING CHANGE: calls to the `cookies()` function are now async, thus making
  the `deleteSession()` method of the session manager async as well.

## 0.1.2

### Patch Changes

- [`5b2a3c0`](https://github.com/wunderwerkio/next-stateless-session/commit/5b2a3c0e5069aa9bb4f8ab2116543b61952713ba) Thanks [@chfoidl](https://github.com/chfoidl)! - Add log

## 0.1.1

### Patch Changes

- [#3](https://github.com/wunderwerkio/next-stateless-session/pull/3) [`2bbed18`](https://github.com/wunderwerkio/next-stateless-session/commit/2bbed187def55b19357adcbd51660988695de434) Thanks [@chfoidl](https://github.com/chfoidl)! - Allow partial override of cookie options when saving a session

## 0.1.0

### Minor Changes

- [`30ef86d`](https://github.com/wunderwerkio/next-stateless-session/commit/30ef86db5fbf583cb958bef7c670bcc8e264d955) Thanks [@chfoidl](https://github.com/chfoidl)! - Initial release
