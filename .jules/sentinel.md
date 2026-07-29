## 2026-07-29 - Prevent Information Leakage in API Routes
**Vulnerability:** Detailed error messages (which could contain stack traces or sensitive internal details) were being sent directly to the client in `llmRoutes.ts`.
**Learning:** Returning `error.message` directly in API responses is an anti-pattern that violates the "Fail securely" principle. It can expose internal infrastructure details to end-users.
**Prevention:** Always log the actual error securely on the backend (e.g., using `console.error` or a logging service) and return a generic, safe error message to the client.
