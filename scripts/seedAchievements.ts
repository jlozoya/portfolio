import { RULES } from '@/lib/achievements';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (const rule of RULES) {
    await prisma.achievement.upsert({
      where: { slug: rule.slug },
      update: {
        title: rule.title,
        description: rule.description,
        icon: rule.icon,
        goalNumber: rule.goalNumber ?? null,
      },
      create: {
        slug: rule.slug,
        title: rule.title,
        description: rule.description,
        icon: rule.icon,
        goalNumber: rule.goalNumber ?? null,
      },
    });
  }

  console.log('✅ Achievements uploaded or updated:', RULES.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
