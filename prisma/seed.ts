import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // 1. Providers
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

  const meta = await prisma.provider.upsert({
    where: { name: 'Meta' },
    update: {},
    create: { name: 'Meta' },
  });

  // 2. Models
  const models = [
    {
      name: 'GPT-4o',
      provider_id: openai.id,
      context_size: 128000,
      price_per_1m: 5.0,
      speed_tok_s: 300,
      is_free: false,
      category: 'Coding',
      release_tag: '1-Tier',
      popularity_score: 95,
    },
    {
      name: 'GPT-3.5 Turbo',
      provider_id: openai.id,
      context_size: 16384,
      price_per_1m: 0.5,
      speed_tok_s: 150,
      is_free: true,
      category: 'Chat',
      popularity_score: 98,
    },
    {
      name: 'Claude 3.5 Sonnet',
      provider_id: anthropic.id,
      context_size: 200000,
      price_per_1m: 3.0,
      speed_tok_s: 49,
      is_free: false,
      category: 'Coding',
      popularity_score: 92,
    },
    {
      name: 'Claude 3 Haiku',
      provider_id: anthropic.id,
      context_size: 200000,
      price_per_1m: 0.25,
      speed_tok_s: 100,
      is_free: true,
      category: 'Chat',
      popularity_score: 85,
    },
    {
      name: 'Gemini 1.5 Pro (002)',
      provider_id: google.id,
      context_size: 1000000,
      price_per_1m: 1.25,
      speed_tok_s: 44,
      is_free: false,
      category: 'Coding',
      popularity_score: 88,
    },
    {
      name: 'Gemini 1.5 Flash',
      provider_id: google.id,
      context_size: 1000000,
      price_per_1m: 0.075,
      speed_tok_s: 200,
      is_free: true,
      category: 'Chat',
      popularity_score: 90,
    },
    {
      name: 'Llama 3.1 405B Instruct',
      provider_id: meta.id,
      context_size: 128000,
      price_per_1m: 2.5,
      speed_tok_s: 28,
      is_free: false,
      category: 'Chat',
      release_tag: 'New',
      popularity_score: 82,
    },
    {
      name: 'Llama 3 8B Instruct',
      provider_id: meta.id,
      context_size: 8192,
      price_per_1m: 0.2,
      speed_tok_s: 350,
      is_free: true,
      category: 'Chat',
      popularity_score: 89,
    },
  ];

  for (const m of models) {
    await prisma.model.upsert({
      where: { id: m.name.toLowerCase().replace(/ /g, '-') }, // Fake ID for upsert logic, actually Prisma generates UUID. We need to check by name if it exists first.
      update: {},
      create: m as any,
    }).catch(async (e) => {
        // If the 'where' is invalid UUID, let's just findFirst then create/update
        const existing = await prisma.model.findFirst({where: {name: m.name}});
        if (!existing) {
            await prisma.model.create({data: m as any});
        }
    });
  }

  // 3. User
  const user = await prisma.user.upsert({
    where: { email: 'admin@unorouter.com' },
    update: {},
    create: {
      email: 'admin@unorouter.com',
      password_hash: 'hashed_password_placeholder',
      username: 'Admin',
      subscription_tier: 'Pro',
      current_balance: 100.0,
    },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
