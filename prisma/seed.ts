import { PrismaClient, SubscriptionTier, ModelCategory, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a dummy User
  const user = await prisma.user.upsert({
    where: { email: 'admin@unorouter.local' },
    update: {},
    create: {
      email: 'admin@unorouter.local',
      password_hash: 'dummy_hash_for_testing',
      username: 'AdminUser',
      subscription_tier: SubscriptionTier.Pro,
      current_balance: 4250.00,
    },
  });
  console.log('User created:', user.email);

  // 2. Create Providers
  const openai = await prisma.provider.upsert({
    where: { name: 'OpenAI' },
    update: {},
    create: { name: 'OpenAI' },
  });

  const anthropic = await prisma.provider.upsert({
    where: { name: 'Anthropic' },
    update: {},
    create: { name: 'Anthropic' },
  });

  const google = await prisma.provider.upsert({
    where: { name: 'Google' },
    update: {},
    create: { name: 'Google' },
  });

  console.log('Providers created.');

  // Delete all existing models before recreating to avoid Unique Constraints if re-running
  await prisma.model.deleteMany();

  // 3. Create Models
  const gpt4 = await prisma.model.create({
    data: {
      provider_id: openai.id,
      name: 'gpt-4-turbo',
      context_size: 128000,
      price_per_1m: 10.0,
      speed_tok_s: 45,
      is_free: false,
      category: ModelCategory.Coding,
      release_tag: 'New Weights',
      popularity_score: 95,
    }
  });

  const claude = await prisma.model.create({
    data: {
      provider_id: anthropic.id,
      name: 'claude-3-opus',
      context_size: 200000,
      price_per_1m: 15.0,
      speed_tok_s: 30,
      is_free: false,
      category: ModelCategory.Chat,
      popularity_score: 90,
    }
  });

  const gemini = await prisma.model.create({
    data: {
      provider_id: google.id,
      name: 'gemini-1.5-pro',
      context_size: 1000000,
      price_per_1m: 7.0,
      speed_tok_s: 60,
      is_free: false,
      category: ModelCategory.Character,
      popularity_score: 85,
    }
  });

  console.log('Models created.');

  // 4. Create an API Key
  const apiKey = await prisma.apiKey.upsert({
    where: { key_hash: 'dummy_hashed_api_key' },
    update: {},
    create: {
      user_id: user.id,
      key_hash: 'dummy_hashed_api_key',
      name: 'Production Key',
    }
  });
  console.log('API Key created.');

  // 5. Create some Usage Logs
  for (let i = 0; i < 10; i++) {
    await prisma.usageLog.create({
      data: {
        user_id: user.id,
        model_id: i % 2 === 0 ? gpt4.id : claude.id,
        api_key_id: apiKey.id,
        tokens_in: Math.floor(Math.random() * 1000) + 100,
        tokens_out: Math.floor(Math.random() * 500) + 50,
        cost: Math.random() * 0.05,
        duration_ms: Math.floor(Math.random() * 2000) + 500,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Random time in last 7 days
      }
    });
  }
  console.log('Usage Logs created.');

  console.log('Database seeding complete.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
