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

// GET /api/dashboard/stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // In a real scenario, this would be tied to req.user.id
    // Here we'll just aggregate across the entire DB or return static realistic DB metrics

    // As per schema, users.current_balance is materialized.
    // We can fetch the first user (or a specific user) as an example.
    const user = await prisma.user.findFirst();
    const balance = user ? `$${Number(user.current_balance).toLocaleString('en-US', {minimumFractionDigits: 2})}` : "$0.00";

    // For other stats, aggregate usage_logs
    const totalRequests = await prisma.usageLog.count();

    const aggregations = await prisma.usageLog.aggregate({
      _sum: {
        cost: true,
        tokens_in: true,
        tokens_out: true,
      }
    });

    const consumption = aggregations._sum.cost ? `$${Number(aggregations._sum.cost).toLocaleString('en-US', {minimumFractionDigits: 2})}` : "$0.00";
    const tokensCount = (aggregations._sum.tokens_in || 0) + (aggregations._sum.tokens_out || 0);
    const tokensFormatted = tokensCount > 1000000 ? (tokensCount / 1000000).toFixed(1) + 'M' : tokensCount.toLocaleString('en-US');
    const reqsFormatted = totalRequests > 1000000 ? (totalRequests / 1000000).toFixed(1) + 'M' : totalRequests.toLocaleString('en-US');

    res.json({
      balance,
      consumption,
      requests: reqsFormatted,
      statisticalCount: totalRequests.toLocaleString('en-US'),
      quota: "$5,000.00",
      tokens: tokensFormatted,
      averageRpm: "4,520",
      averageTpm: "185K"
    });
  } catch (error) {
    handlePrismaError(res, error);
  }
});

// GET /api/dashboard/chart
app.get('/api/dashboard/chart', async (req, res) => {
  try {
    const range = req.query.range || '7d';
    // Simplified logic: Return static but realistic structured data
    // In a real DB, you would group by DAY(created_at) and SUM(cost) grouped by Provider

    const multiplier = range === '24h' ? 0.5 : range === '30d' ? 4 : range === 'all' ? 10 : 1;

    const data = [
      { name: 'Mon', gpt: 4000 * multiplier, claude: 2400 * multiplier, gemini: 2400 * multiplier },
      { name: 'Tue', gpt: 3000 * multiplier, claude: 1398 * multiplier, gemini: 2210 * multiplier },
      { name: 'Wed', gpt: 2000 * multiplier, claude: 9800 * multiplier, gemini: 2290 * multiplier },
      { name: 'Thu', gpt: 2780 * multiplier, claude: 3908 * multiplier, gemini: 2000 * multiplier },
      { name: 'Fri', gpt: 1890 * multiplier, claude: 4800 * multiplier, gemini: 2181 * multiplier },
      { name: 'Sat', gpt: 2390 * multiplier, claude: 3800 * multiplier, gemini: 2500 * multiplier },
      { name: 'Sun', gpt: 3490 * multiplier, claude: 4300 * multiplier, gemini: 2100 * multiplier },
    ];

    res.json(data);
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
