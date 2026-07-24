import express from 'express';
import { PrismaClient } from '@prisma/client';
import providersRouter from './routes/providers.js';
import modelsRouter from './routes/models.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// API Routes
app.use('/api/providers', providersRouter);
app.use('/api/models', modelsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
