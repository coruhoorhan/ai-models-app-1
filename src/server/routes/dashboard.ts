import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    // Basic mock implementation for dashboard stats
    // In a real app, this would aggregate from usage_logs and user balance
    res.json({
      balance: "$4,250.00",
      consumption: "$142.50",
      requests: "1.2M",
      statisticalCount: "842,104",
      quota: "$5,000.00",
      tokens: "45.2M",
      averageRpm: "4,520",
      averageTpm: "185K",
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/dashboard/chart
router.get('/chart', async (req, res) => {
  try {
    const { range = '7d' } = req.query;

    // Simulate real aggregation logic over usage_logs
    const multiplier = range === '24h' ? 0.5 : range === '30d' ? 4 : range === 'all' ? 10 : 1;

    const chartData = [
      { name: 'Mon', gpt: 4000 * multiplier, claude: 2400 * multiplier, gemini: 2400 * multiplier },
      { name: 'Tue', gpt: 3000 * multiplier, claude: 1398 * multiplier, gemini: 2210 * multiplier },
      { name: 'Wed', gpt: 2000 * multiplier, claude: 9800 * multiplier, gemini: 2290 * multiplier },
      { name: 'Thu', gpt: 2780 * multiplier, claude: 3908 * multiplier, gemini: 2000 * multiplier },
      { name: 'Fri', gpt: 1890 * multiplier, claude: 4800 * multiplier, gemini: 2181 * multiplier },
      { name: 'Sat', gpt: 2390 * multiplier, claude: 3800 * multiplier, gemini: 2500 * multiplier },
      { name: 'Sun', gpt: 3490 * multiplier, claude: 4300 * multiplier, gemini: 2100 * multiplier },
    ];

    res.json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
