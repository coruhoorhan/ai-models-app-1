## 2024-05-20 - React.memo on Streaming Lists
**Learning:** During active LLM token streaming in chat interfaces, re-rendering the entire message list for each token update causes severe performance degradation and UI stuttering.
**Action:** Always wrap list items (like `ChatMessageItem`) that represent individual messages in `React.memo` to ensure only the currently streaming message or newly added messages trigger a re-render. Make sure explanatory comments are added alongside optimization.
