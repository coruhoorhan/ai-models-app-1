## 2026-09-13 - [Server Crash on Invalid Model ID]
**Vulnerability:** Sending a non-string model ID (like a number) to `/api/chat/stream` or `/api/arena/battle` causes a complete Express server crash because `modelId.toLowerCase()` throws a TypeError synchronously, preventing the error from being caught by error handlers.
**Learning:** In Express, unhandled synchronous errors or unhandled promise rejections without a try/catch can crash the Node process, leading to Denial of Service (DoS) for all users. Input types must be strictly validated before invoking string-specific methods.
**Prevention:** Ensure types are checked (`typeof modelId !== 'string'`) before calling string methods, or cast them explicitly (`String(modelId)`).
