import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/providers
// Returns all providers
router.get('/', async (req, res) => {
  try {
    const providers = await prisma.provider.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    res.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
