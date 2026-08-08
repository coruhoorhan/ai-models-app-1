## 2024-05-24 - LLM Chat Streaming Render Optimization
**Learning:** In chat interfaces handling active LLM token streaming, parent state updates cause frequent re-renders of the entire message list (O(n) renders where n is the number of messages). This becomes a severe bottleneck as the conversation grows.
**Action:** Heavily utilize `React.memo` for list items (like `ChatMessageItem`) to prevent expensive re-renders of the entire list during rapid parent state updates when the individual message props haven't changed.
