## 2025-02-14 - Fix Express DoS via unhandled TypeError in model routing
**Vulnerability:** Unvalidated `req.body.model` parameter (e.g. array, object, number) causes `TypeError: modelId.toLowerCase is not a function` in Express async routes, crashing the Node process and leading to a Denial of Service (DoS).
**Learning:** In Express backend routes (Node 22+ / Express 4), always enforce strict input type validation or explicitly cast JSON payloads before applying type-specific methods like `.toLowerCase()`. Unhandled `TypeError`s in async routes cause unhandled promise rejections that crash the entire Node process.
**Prevention:** Use explicit casting `String(val).toLowerCase()` or robust type validation (e.g. Zod) on `req.body` and `req.query` payload fields before interacting with them.
