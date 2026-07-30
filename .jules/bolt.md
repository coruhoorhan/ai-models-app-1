## 2025-02-20 - React.memo for Message History in Chat Stream
**Learning:** During active LLM token streaming, the parent chat component rapidly updates state for every token chunk. Without memoization, this causes expensive re-renders of the entire message history list, degrading frontend performance significantly.
**Action:** Always wrap `ChatMessageItem` (or similar list items) in `React.memo` when rendering rapidly changing streams to prevent full list re-rendering.
