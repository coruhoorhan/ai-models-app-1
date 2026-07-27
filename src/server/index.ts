import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all models
app.get('/api/models', async (req, res) => {
  try {
    const models = await prisma.models.findMany({
      include: {
        providers: true,
      },
    });
    res.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all providers
app.get('/api/providers', async (req, res) => {
  try {
    const providers = await prisma.providers.findMany();
    res.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [totalModels, totalProviders, totalUsageLogs] = await Promise.all([
      prisma.models.count(),
      prisma.providers.count(),
      prisma.usage_logs.count(),
    ]);

    res.json({
      totalModels,
      totalProviders,
      totalUsageLogs,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
