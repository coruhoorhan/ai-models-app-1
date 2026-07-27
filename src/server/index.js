import express from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(express.json());

// Mock Auth Middleware
const mockRequireAuth = (req, res, next) => {
  // UUID from our seeder or we'll generate one
  req.userId = '00000000-0000-0000-0000-000000000001';
  next();
};

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/providers', async (req, res) => {
  try {
    const providers = await prisma.provider.findMany({ orderBy: { name: 'asc' } });
    res.json(providers);
  } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
});

app.get('/api/models', async (req, res) => {
  try {
    const { search, provider, tier, sort, page = '1', pageSize = '10' } = req.query;
    const where = {};
    if (search) where.name = { contains: String(search), mode: 'insensitive' };
    if (provider && provider !== 'All') where.provider = { name: String(provider) };
    if (tier && tier !== 'All') where.is_free = tier === 'Free';

    let orderBy = {};
    if (sort === 'Popular') orderBy = { popularity_score: 'desc' };
    else if (sort === 'Newest') orderBy = { created_at: 'desc' };
    else if (sort === 'Price') orderBy = { price_per_1m: 'asc' };
    else orderBy = { created_at: 'desc' };

    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);

    const [total, models] = await Promise.all([
      prisma.model.count({ where }),
      prisma.model.findMany({ where, orderBy, skip, take, include: { provider: true } })
    ]);

    res.json({ data: models, meta: { total, page: Number(page), pageSize: Number(take), totalPages: Math.ceil(total / take) }});
  } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
});

app.get('/api/rankings', async (req, res) => {
  try {
    const rankings = await prisma.ranking.findMany({
      orderBy: { rank: 'asc' }, include: { model: { include: { provider: true } } }, take: 20
    });
    res.json(rankings);
  } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
});

app.get('/api/rankings/highlights', async (req, res) => {
  try {
    const highlights = await prisma.ranking.findMany({
      orderBy: [ { weekly_change: 'desc' } ], include: { model: { include: { provider: true } } }, take: 5
    });
    res.json(highlights);
  } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const stats = {
      balance: 1450.50, consumption: 320.15, requestsCount: 2450000, requestsQuota: 5000000,
      tokensCount: 850000000, tokensQuota: 1000000000, avgRpm: 1250, avgTpm: 34500
    };
    const chartData = [
      { date: '2024-05-01', openai: 45, anthropic: 30, google: 15 },
      { date: '2024-05-02', openai: 52, anthropic: 32, google: 18 },
      { date: '2024-05-03', openai: 48, anthropic: 35, google: 16 },
      { date: '2024-05-04', openai: 60, anthropic: 40, google: 22 },
      { date: '2024-05-05', openai: 55, anthropic: 38, google: 20 },
      { date: '2024-05-06', openai: 65, anthropic: 42, google: 25 },
      { date: '2024-05-07', openai: 70, anthropic: 45, google: 28 },
    ];
    res.json({ stats, chartData });
  } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
});

app.get('/api/usage-logs', async (req, res) => {
  try {
    const { page = '1', pageSize = '10' } = req.query;
    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);

    const [total, logs] = await Promise.all([
      prisma.usageLog.count(),
      prisma.usageLog.findMany({ orderBy: { created_at: 'desc' }, skip, take, include: { model: { include: { provider: true } } } })
    ]);

    if (total === 0) {
      const mockLogs = Array(15).fill(null).map((_, i) => ({
        id: `mock-${i}`, created_at: new Date(Date.now() - i * 3600000).toISOString(),
        model: { name: i % 2 === 0 ? 'gpt-4o' : 'claude-3-5-sonnet', provider: { name: i % 2 === 0 ? 'OpenAI' : 'Anthropic' } },
        tokens_in: Math.floor(Math.random() * 500) + 100, tokens_out: Math.floor(Math.random() * 200) + 50,
        cost: (Math.random() * 0.05).toFixed(4), duration_ms: Math.floor(Math.random() * 800) + 200,
      }));
      return res.json({ data: mockLogs, meta: { total: 15, page: Number(page), pageSize: Number(take), totalPages: Math.ceil(15 / take) }});
    }
    res.json({ data: logs, meta: { total, page: Number(page), pageSize: Number(take), totalPages: Math.ceil(total / take) }});
  } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
});

// GET /api/keys
app.get('/api/keys', mockRequireAuth, async (req, res) => {
  try {
    // If the user doesn't exist, we'll return empty instead of crashing since DB is just seeded
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.json([]);

    const keys = await prisma.apiKey.findMany({
      where: { user_id: req.userId },
      orderBy: { created_at: 'desc' }
    });
    res.json(keys);
  } catch (error) {
    console.error('Error fetching keys:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/keys
app.post('/api/keys', mockRequireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const rawKey = `sk-${crypto.randomBytes(32).toString('hex')}`;
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    let user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: req.userId,
          email: 'admin@unorouter.com',
          password_hash: 'hash',
          username: 'admin'
        }
      });
    }

    const newKey = await prisma.apiKey.create({
      data: {
        user_id: user.id,
        name,
        key_hash: keyHash,
      }
    });

    res.json({ ...newKey, raw_key: rawKey });
  } catch (error) {
    console.error('Error creating key:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/keys/:id
app.delete('/api/keys/:id', mockRequireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.apiKey.deleteMany({
      where: { id, user_id: req.userId }
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting key:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
