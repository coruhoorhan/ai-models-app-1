import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding process is starting...')
  // Clean DB
  await prisma.usageLog.deleteMany()
  await prisma.ranking.deleteMany()
  await prisma.model.deleteMany()
  await prisma.provider.deleteMany()

  // Providers
  const openai = await prisma.provider.create({ data: { name: 'OpenAI' } })
  const anthropic = await prisma.provider.create({ data: { name: 'Anthropic' } })
  const google = await prisma.provider.create({ data: { name: 'Google' } })
  const meta = await prisma.provider.create({ data: { name: 'Meta' } })

  // Models
  const gpt4o = await prisma.model.create({
    data: {
      provider_id: openai.id,
      name: 'GPT-4o (2024-08-06)',
      context_size: 128000,
      price_per_1m: 5.0,
      speed_tok_s: 300,
      category: 'Chat',
      release_tag: '1-Tier',
      popularity_score: 100,
      is_free: false,
    },
  })

  const sonnet35 = await prisma.model.create({
    data: {
      provider_id: anthropic.id,
      name: 'Claude 3.5 Sonnet',
      context_size: 200000,
      price_per_1m: 3.0,
      speed_tok_s: 49,
      category: 'Chat',
      popularity_score: 95,
      is_free: false,
    },
  })

  const gemini15 = await prisma.model.create({
    data: {
      provider_id: google.id,
      name: 'Gemini 1.5 Pro (002)',
      context_size: 1000000,
      price_per_1m: 1.25,
      speed_tok_s: 44,
      category: 'Chat',
      popularity_score: 90,
      is_free: false,
    },
  })

  const llama31 = await prisma.model.create({
    data: {
      provider_id: meta.id,
      name: 'Llama 3.1 405B Instruct',
      context_size: 128000,
      price_per_1m: 0.9,
      speed_tok_s: 28,
      category: 'Chat',
      release_tag: 'New',
      popularity_score: 85,
      is_free: true,
    },
  })

  // Rankings
  await prisma.ranking.createMany({
    data: [
      { model_id: gpt4o.id, rank: 1, score: 1287, speed_viz: 300, weekly_change: 11 },
      { model_id: sonnet35.id, rank: 2, score: 1279, speed_viz: 49, weekly_change: 24 },
      { model_id: gemini15.id, rank: 3, score: 1261, speed_viz: 44, weekly_change: -5 },
      { model_id: llama31.id, rank: 4, score: 1258, speed_viz: 28, weekly_change: 3 },
    ]
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
