import express from 'express';
import { PrismaClient } from '@prisma/client';
import providersRouter from './src/server/routes/providers.js';
import modelsRouter from './src/server/routes/models.js';
import rankingsRouter from './src/server/routes/rankings.js';
import dashboardRouter from './src/server/routes/dashboard.js';
import usageRouter from './src/server/routes/usage.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// API Routes
app.use('/api/providers', providersRouter);
app.use('/api/models', modelsRouter);
app.use('/api/rankings', rankingsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/usage-logs', usageRouter);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}`);
});
