import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Helper for generic errors
const handlePrismaError = (res, error) => {
  console.error("Prisma Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

// GET /api/rankings
app.get('/api/rankings', async (req, res) => {
  try {
    const rankings = await prisma.ranking.findMany({
      orderBy: { rank: 'asc' },
      include: {
        model: {
          include: {
            provider: true
          }
        }
      }
    });

    // Map to the shape expected by the frontend
    const mapped = rankings.map(r => ({
      id: r.id,
      rank: r.rank,
      name: r.model.name,
      developer: r.model.provider.name,
      context: `${r.model.context_size >= 1000 ? (r.model.context_size / 1000) + 'k' : r.model.context_size} Context`,
      score: r.score,
      speed: r.speed_viz,
      releaseTag: r.model.release_tag || undefined
    }));

    res.json(mapped);
  } catch (error) {
    handlePrismaError(res, error);
  }
});

// GET /api/rankings/highlights
app.get('/api/rankings/highlights', async (req, res) => {
  try {
    const rankings = await prisma.ranking.findMany({
      orderBy: {
        // Find ones with largest absolute change? Prisma doesn't support absolute value order by directly
        // So let's just get top 3 highest increases and 1 highest drop (or fetch all and sort in memory for this demo)
      },
      include: {
        model: {
          include: {
            provider: true
          }
        }
      }
    });

    const sortedByAbsChange = [...rankings].sort((a, b) => Math.abs(b.weekly_change) - Math.abs(a.weekly_change));
    const topHighlights = sortedByAbsChange.slice(0, 3).map(r => ({
      id: r.id,
      modelName: r.model.name,
      developerInfo: `${r.model.provider.name} · ${r.model.context_size >= 1000 ? (r.model.context_size / 1000) + 'k' : r.model.context_size} Context`,
      delta: r.weekly_change,
      price: `$${Number(r.model.price_per_1m).toFixed(2)} /1M`
    }));

    res.json(topHighlights);
  } catch (error) {
    handlePrismaError(res, error);
  }
});

// GET /api/rankings/scatter
app.get('/api/rankings/scatter', async (req, res) => {
  try {
    const models = await prisma.model.findMany({
      include: {
        provider: true
      }
    });

    // Map category to chart colors as per DESIGN.md
    const categoryToColor = (category) => {
      switch (category) {
        case 'Coding': return 'var(--color-chart-green)';
        case 'Chat': return 'var(--color-chart-blue)';
        case 'Character': return 'var(--color-chart-pink)';
        default: return 'var(--color-chart-teal)';
      }
    };

    const scatterData = models.map(m => ({
      id: m.id,
      name: m.name,
      x: Number(m.price_per_1m),
      y: m.speed_tok_s,
      color: categoryToColor(m.category)
    }));

    res.json(scatterData);
  } catch (error) {
    handlePrismaError(res, error);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
