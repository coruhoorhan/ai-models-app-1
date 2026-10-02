## 2025-05-18 - Missing Security Headers
**Vulnerability:** The Express server doesn't implement any basic security headers (CSP, X-Frame-Options, X-XSS-Protection, etc.), increasing the risk of XSS, clickjacking, and other client-side attacks.
**Learning:** The default Express setup is completely bare-bones. It's missing `helmet`, which is a standard library to secure Express apps by setting various HTTP headers.
**Prevention:** Always use `helmet` for basic Express application security as a default measure.
