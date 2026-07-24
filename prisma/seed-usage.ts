import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding usage logs...');

  const models = await prisma.model.findMany();
  const user = await prisma.user.findFirst();

  if (!models.length || !user) {
      console.log("No models or user found.");
      return;
  }

  // Create fake API key
  const apiKey = await prisma.apiKey.create({
    data: {
      user_id: user.id,
      name: 'Test Key',
      key_hash: 'hash_' + Date.now(),
    }
  });

  // Create fake usage logs
  for (let i = 0; i < 45; i++) {
    const randomModel = models[Math.floor(Math.random() * models.length)];
    const tokensIn = Math.floor(Math.random() * 1000) + 10;
    const tokensOut = Math.floor(Math.random() * 500) + 10;
    const cost = (Number(randomModel.price_per_1m) / 1000000) * (tokensIn + tokensOut);

    // Distribute timestamps over the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));

    await prisma.usageLog.create({
      data: {
        user_id: user.id,
        model_id: randomModel.id,
        api_key_id: apiKey.id,
        tokens_in: tokensIn,
        tokens_out: tokensOut,
        cost: cost,
        duration_ms: Math.floor(Math.random() * 2000) + 100,
        created_at: date
      }
    });
  }

  console.log('Usage logs seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
