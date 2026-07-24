import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding rankings data...');

  const models = await prisma.model.findMany();

  if (models.length === 0) {
      console.log("No models found. Please run seed.ts first.");
      return;
  }

  // Create fake rankings
  let rank = 1;
  for (const m of models) {
    const existingRanking = await prisma.ranking.findFirst({ where: { model_id: m.id } });

    if (!existingRanking) {
        await prisma.ranking.create({
            data: {
                model_id: m.id,
                rank: rank,
                score: 1300 - (rank * 10), // fake score
                speed_viz: m.speed_tok_s,
                weekly_change: Math.floor(Math.random() * 20) - 10, // -10 to +10
            }
        });
        console.log(`Created ranking for ${m.name}`);
    }
    rank++;
  }

  console.log('Rankings seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
