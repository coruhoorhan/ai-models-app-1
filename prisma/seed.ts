import { prisma } from '../src/server/db.js';

async function main() {
  console.log('Seeding database...');

  // 1. Create Providers
  const openai = await prisma.provider.upsert({
    where: { name: 'openai' },
    update: {},
    create: {
      name: 'openai',
      displayName: 'OpenAI',
      isActive: true,
    },
  });

  const anthropic = await prisma.provider.upsert({
    where: { name: 'anthropic' },
    update: {},
    create: {
      name: 'anthropic',
      displayName: 'Anthropic',
      isActive: true,
    },
  });

  const google = await prisma.provider.upsert({
    where: { name: 'google' },
    update: {},
    create: {
      name: 'google',
      displayName: 'Google',
      isActive: true,
    },
  });

  const xai = await prisma.provider.upsert({
    where: { name: 'xai' },
    update: {},
    create: {
      name: 'xai',
      displayName: 'xAI',
      isActive: true,
    },
  });

  // 2. Create Models
  const models = [
    {
      name: 'gpt-4o',
      displayName: 'GPT-4o',
      providerId: openai.id,
      contextSize: 128000,
      inputPrice: 5.0,
      outputPrice: 15.0,
      eloScore: 1287,
      category: 'llm',
      parameters: 'Unknown',
    },
    {
      name: 'gpt-4-turbo',
      displayName: 'GPT-4 Turbo',
      providerId: openai.id,
      contextSize: 128000,
      inputPrice: 10.0,
      outputPrice: 30.0,
      eloScore: 1253,
      category: 'llm',
      parameters: 'Unknown',
    },
    {
      name: 'claude-3-5-sonnet',
      displayName: 'Claude 3.5 Sonnet',
      providerId: anthropic.id,
      contextSize: 200000,
      inputPrice: 3.0,
      outputPrice: 15.0,
      eloScore: 1271,
      category: 'llm',
      parameters: 'Unknown',
    },
    {
      name: 'claude-3-opus',
      displayName: 'Claude 3 Opus',
      providerId: anthropic.id,
      contextSize: 200000,
      inputPrice: 15.0,
      outputPrice: 75.0,
      eloScore: 1248,
      category: 'llm',
      parameters: 'Unknown',
    },
    {
      name: 'gemini-1-5-pro',
      displayName: 'Gemini 1.5 Pro',
      providerId: google.id,
      contextSize: 2000000,
      inputPrice: 3.5,
      outputPrice: 10.5,
      eloScore: 1261,
      category: 'llm',
      parameters: 'Unknown',
    },
    {
      name: 'gemini-1-5-flash',
      displayName: 'Gemini 1.5 Flash',
      providerId: google.id,
      contextSize: 1000000,
      inputPrice: 0.35,
      outputPrice: 1.05,
      eloScore: 1222,
      category: 'llm',
      parameters: 'Unknown',
    },
    {
      name: 'grok-1-5',
      displayName: 'Grok 1.5',
      providerId: xai.id,
      contextSize: 128000,
      inputPrice: 5.0,
      outputPrice: 15.0,
      eloScore: 1190,
      category: 'llm',
      parameters: '314B',
    },
    {
      name: 'dall-e-3',
      displayName: 'DALL-E 3',
      providerId: openai.id,
      contextSize: 0,
      inputPrice: 40.0,
      outputPrice: 40.0,
      eloScore: 1150,
      category: 'image',
      parameters: 'Unknown',
    },
    {
      name: 'stable-diffusion-3',
      displayName: 'Stable Diffusion 3',
      providerId: openai.id, // Using existing provider just for mock
      contextSize: 0,
      inputPrice: 2.0,
      outputPrice: 2.0,
      eloScore: 1180,
      category: 'image',
      parameters: '8B',
    }
  ];

  for (const m of models) {
    await prisma.model.upsert({
      where: { name: m.name },
      update: m,
      create: m,
    });
  }

  // 3. Create a User and ChatLogs for dashboard stats
  const user = await prisma.user.upsert({
    where: { email: 'admin@aimodels.app' },
    update: {},
    create: {
      email: 'admin@aimodels.app',
      name: 'Admin User',
    },
  });

  // Check if we already have chat logs
  const logCount = await prisma.chatLog.count({
    where: { userId: user.id }
  });

  if (logCount === 0) {
    console.log('Generating dummy chat logs for dashboard stats...');
    // Create some logs spanning the last 7 days
    const now = new Date();
    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * 7);
      const randomModel = models[Math.floor(Math.random() * models.length)];
      
      const logDate = new Date(now);
      logDate.setDate(logDate.getDate() - daysAgo);

      await prisma.chatLog.create({
        data: {
          userId: user.id,
          modelId: randomModel.name, // Usually we link to ID, but using name here for simplicity
          provider: randomModel.providerId, // using provider ID
          prompt: `Mock prompt ${i}`,
          response: `Mock response ${i}`,
          tokens: Math.floor(Math.random() * 1000) + 100,
          duration: Math.floor(Math.random() * 2000) + 500,
          createdAt: logDate,
        }
      });
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
