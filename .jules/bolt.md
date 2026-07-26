## 2024-07-26 - [Route Code Splitting]
**Learning:** Vite bundles entire application into a single large chunk by default (`index.js` ~939.65 kB).
**Action:** Applied lazy loading with React.lazy and Suspense for React Router paths to split components per route. This decreased the main chunk size to ~325.27 kB and improved initial loading time.
