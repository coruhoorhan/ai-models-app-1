## 2024-05-14 - React.memo for Chat Streaming Components
**Learning:** During LLM token streaming in chat interfaces, parent components (like the message list) often update rapidly. Without memoizing individual message items, this causes expensive re-renders of the entire historical chat list on every single token chunk received.
**Action:** Always utilize `React.memo` for list item components (e.g., `ChatMessageItem`) in chat interfaces where active streaming state resides in parent components to prevent severe UI blocking and ensure smooth scrolling.
