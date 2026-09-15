## 2025-03-09 - Type Validation in Express
**Vulnerability:** Unhandled TypeError when `.toLowerCase()` is called on a number/object in Express routes, causing uncaught exception and server DoS.
**Learning:** Native Express 4 doesn't enforce schema typing out-of-the-box on `req.body` or `req.query`, meaning non-string JSON primitives slip through.
**Prevention:** Always enforce explicit casting (e.g., `String(val)`) or robust schema validation (Zod) on incoming payload values before applying type-specific methods.
