import { Router } from "express";
import { prisma } from "./db.js";
import { Prisma } from "@prisma/client";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { category, sort } = req.query;
    
    const where: Prisma.ModelWhereInput = {};
    if (category && typeof category === 'string' && category !== 'all') {
      where.category = category.toLowerCase();
    }

    let orderBy: Prisma.ModelOrderByWithRelationInput = {};
    if (sort === 'elo_desc') {
      orderBy = { eloScore: 'desc' };
    } else if (sort === 'elo_asc') {
      orderBy = { eloScore: 'asc' };
    } else if (sort === 'price_asc') {
      orderBy = { inputPrice: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { inputPrice: 'desc' };
    } else {
      orderBy = { eloScore: 'desc' }; // default
    }

    const models = await prisma.model.findMany({
      where,
      orderBy,
      include: {
        provider: true
      }
    });

    const formattedRankings = models.map(m => ({
      id: m.id,
      name: m.displayName,
      provider: m.provider.displayName,
      eloScore: m.eloScore,
      parameters: m.parameters,
      inputPrice: m.inputPrice,
      outputPrice: m.outputPrice,
      category: m.category,
    }));

    res.json(formattedRankings);
  } catch (err) {
    console.error("Rankings error:", err);
    res.status(500).json({ error: "Failed to fetch rankings" });
  }
});

export const rankingRoutes = router;
