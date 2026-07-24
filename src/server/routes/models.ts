import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/models
router.get('/', async (req, res) => {
  try {
    const { search, provider, tier, sort, page = '1', pageSize = '20' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limit = parseInt(pageSize as string, 10) || 20;
    const skip = (pageNum - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.name = {
        contains: search as string,
        mode: 'insensitive',
      };
    }

    if (provider && provider !== 'All') {
      where.provider_id = provider;
    }

    if (tier && tier !== 'All') {
      where.is_free = tier === 'Free';
    }

    // Build orderBy clause
    let orderBy: any = { popularity_score: 'desc' }; // Default sort
    if (sort === 'newest') {
      orderBy = { created_at: 'desc' };
    } else if (sort === 'price') {
      orderBy = { price_per_1m: 'asc' };
    } else if (sort === 'popular') {
      orderBy = { popularity_score: 'desc' };
    }

    const [models, total] = await Promise.all([
      prisma.model.findMany({
        where,
        include: {
          provider: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.model.count({ where }),
    ]);

    // Map Prisma models to the expected API contract format
    const formattedModels = models.map((m) => ({
      id: m.id,
      name: m.name,
      provider: m.provider.name,
      context_length: m.context_size,
      price_per_1m: Number(m.price_per_1m),
      speed: m.speed_tok_s,
      is_free: m.is_free,
      category: m.category,
      release_tag: m.release_tag,
    }));

    res.json({
      data: formattedModels,
      total,
      page: pageNum,
      pageSize: limit,
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/models/stats
router.get('/stats', async (req, res) => {
  try {
    const [totalModels, totalProviders, freeModels, paidModels] = await Promise.all([
      prisma.model.count(),
      prisma.provider.count(),
      prisma.model.count({ where: { is_free: true } }),
      prisma.model.count({ where: { is_free: false } }),
    ]);

    res.json({
      models: totalModels,
      providers: totalProviders,
      free: freeModels,
      paid: paidModels,
    });
  } catch (error) {
    console.error('Error fetching models stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
