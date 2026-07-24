import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/rankings
router.get('/', async (req, res) => {
  try {
    const rankings = await prisma.ranking.findMany({
      include: {
        model: {
          include: {
            provider: true
          }
        }
      },
      orderBy: {
        rank: 'asc'
      },
      take: 20
    });

    const formattedRankings = rankings.map(r => ({
      id: r.id,
      rank: r.rank,
      score: r.score,
      speed_viz: r.speed_viz,
      weekly_change: r.weekly_change,
      model: {
        id: r.model.id,
        name: r.model.name,
        category: r.model.category,
        release_tag: r.model.release_tag,
        context_size: r.model.context_size,
        price_per_1m: Number(r.model.price_per_1m),
        speed_tok_s: r.model.speed_tok_s,
        provider: {
          name: r.model.provider.name
        }
      }
    }));

    res.json(formattedRankings);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/rankings/highlights
router.get('/highlights', async (req, res) => {
  try {
    const rankings = await prisma.ranking.findMany({
      include: {
        model: {
          include: {
            provider: true
          }
        }
      }
    });

    // Sort by absolute weekly change to find biggest movers (up or down)
    const sorted = rankings.sort((a, b) => Math.abs(b.weekly_change) - Math.abs(a.weekly_change)).slice(0, 5);

    const formattedHighlights = sorted.map(r => ({
      id: r.id,
      weekly_change: r.weekly_change,
      model: {
        id: r.model.id,
        name: r.model.name,
        context_size: r.model.context_size,
        price_per_1m: Number(r.model.price_per_1m),
        provider: {
          name: r.model.provider.name
        }
      }
    }));

    res.json(formattedHighlights);
  } catch (error) {
    console.error('Error fetching highlights:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
