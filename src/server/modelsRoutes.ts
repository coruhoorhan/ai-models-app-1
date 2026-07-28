import { Router } from "express";
import { prisma } from "./db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const dbModels = await prisma.model.findMany({
      include: {
        provider: true,
      },
    });

    const models = dbModels.map((m) => {
      const isFree = m.inputPrice === 0 && m.outputPrice === 0;
      const contextK = m.contextSize > 0 ? `${Math.round(m.contextSize / 1000)}k` : "N/A";
      const priceStr = isFree
        ? "Free"
        : `$${m.inputPrice.toFixed(2)} / $${m.outputPrice.toFixed(2)}`;

      return {
        id: m.id,
        name: m.displayName,
        provider: m.provider.displayName,
        category: [m.category.toUpperCase()],
        context: contextK,
        price: priceStr,
        isFree,
        speed: "45 tok/s",
      };
    });

    res.json(models);
  } catch (err) {
    console.error("Models route error:", err);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

export const modelsRoutes = router;
