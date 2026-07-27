import { Router } from "express";
import { prisma } from "./db.js";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    // Ideally we would fetch stats per user, but for now we'll fetch aggregated stats
    const totalLogs = await prisma.chatLog.count();
    const sumTokens = await prisma.chatLog.aggregate({
      _sum: { tokens: true }
    });

    res.json({
      balance: "$4,250.00", // Hardcoded mock for now
      consumption: "$142.50", 
      requests: totalLogs > 1000 ? `${(totalLogs / 1000).toFixed(1)}k` : totalLogs.toString(),
      statisticalCount: "842,104", 
      quota: "$5,000.00",
      tokens: sumTokens._sum.tokens ? `${(sumTokens._sum.tokens / 1000).toFixed(1)}k` : "0",
      averageRpm: "4,520", 
      averageTpm: "185K",
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.get("/chart", async (req, res) => {
  try {
    const { range } = req.query;
    
    // Simulate real aggregation based on the database
    const multiplier = range === '24h' ? 0.5 : range === '30d' ? 4 : range === 'all' ? 10 : 1;

    // For now, return the mock shape but dynamic based on multiplier
    // A real implementation would group by day and model provider.
    res.json([
      { name: 'Mon', gpt: 4000 * multiplier, claude: 2400 * multiplier, gemini: 2400 * multiplier },
      { name: 'Tue', gpt: 3000 * multiplier, claude: 1398 * multiplier, gemini: 2210 * multiplier },
      { name: 'Wed', gpt: 2000 * multiplier, claude: 9800 * multiplier, gemini: 2290 * multiplier },
      { name: 'Thu', gpt: 2780 * multiplier, claude: 3908 * multiplier, gemini: 2000 * multiplier },
      { name: 'Fri', gpt: 1890 * multiplier, claude: 4800 * multiplier, gemini: 2181 * multiplier },
      { name: 'Sat', gpt: 2390 * multiplier, claude: 3800 * multiplier, gemini: 2500 * multiplier },
      { name: 'Sun', gpt: 3490 * multiplier, claude: 4300 * multiplier, gemini: 2100 * multiplier },
    ]);
  } catch (err) {
    console.error("Dashboard chart error:", err);
    res.status(500).json({ error: "Failed to fetch chart" });
  }
});

export const dashboardRoutes = router;
