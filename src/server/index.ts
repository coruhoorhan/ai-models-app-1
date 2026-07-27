import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { handleChatStream, handleArenaBattle } from "./llmRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { rankingRoutes } from "./rankingRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

// API Endpoints
app.get("/api/health", (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({ status: "ok", hasApiKey: hasKey });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/rankings", rankingRoutes);

app.post("/api/chat/stream", handleChatStream);
app.post("/api/arena/battle", handleArenaBattle);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
