## 2024-11-20 - Memoization of ChatMessageItem
**Learning:** During rapid LLM token streaming updates, the parent component updates state very frequently. List items like `ChatMessageItem` that are not memoized will re-render unnecessarily, blocking the main thread and causing jank during streaming.
**Action:** Always heavily utilize `React.memo` for list items in components handling active LLM token streaming (e.g., chat interfaces).
