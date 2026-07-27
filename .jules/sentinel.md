## 2024-07-27 - Weak API Key Generation
**Vulnerability:** API keys were generated using `Math.random()` which is not cryptographically secure and can be predicted.
**Learning:** `Math.random()` should never be used for security-critical values like API keys, secrets, or tokens.
**Prevention:** Always use `crypto.getRandomValues()` or a proven cryptography library for generating secure random numbers in the browser.
