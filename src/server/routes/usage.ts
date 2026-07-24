import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/usage-logs
router.get('/', async (req, res) => {
  try {
    const { page = '1', pageSize = '20' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limit = parseInt(pageSize as string, 10) || 20;
    const skip = (pageNum - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.usageLog.findMany({
        include: {
          model: true,
        },
        orderBy: {
          created_at: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.usageLog.count(),
    ]);

    const formattedLogs = logs.map(l => ({
      id: l.id,
      timestamp: l.created_at.toISOString(),
      model: l.model.name,
      tokens_in: l.tokens_in,
      tokens_out: l.tokens_out,
      duration: `${l.duration_ms}ms`,
      cost: `$${Number(l.cost).toFixed(4)}`
    }));

    res.json({
      data: formattedLogs,
      total,
      page: pageNum,
      pageSize: limit
    });
  } catch (error) {
    console.error('Error fetching usage logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
