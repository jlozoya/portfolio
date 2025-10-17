import { prisma } from '@/lib/prisma';
import { RULES } from './achievements';

export async function getOrInitStats(visitorId: number) {
  let stats = await prisma.visitorStats.findUnique({ where: { visitorId } });
  if (!stats) {
    stats = await prisma.visitorStats.create({ data: { visitorId } });
  }
  return stats;
}

/** Evaluate rules and persist any newly unlocked achievements. */
export async function evaluateAndAward(visitorId: number) {
  const stats = await getOrInitStats(visitorId);

  // Ensure all Achievement rows exist (seed-on-demand)
  const existing = await prisma.achievement.findMany({ select: { id: true, slug: true } });
  const existingSet = new Set(existing.map((a) => a.slug));
  const toCreate = RULES.filter((r) => !existingSet.has(r.slug)).map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    icon: r.icon,
    goalNumber: r.goalNumber ?? null,
  }));
  if (toCreate.length)
    await prisma.achievement.createMany({ data: toCreate, skipDuplicates: true });

  // Map slug->id
  const all = await prisma.achievement.findMany({ select: { id: true, slug: true } });
  const slugToId = new Map(all.map((a) => [a.slug, a.id]));

  const ctx = {
    stats: {
      visits: stats.visits,
      pagesSeen: stats.pagesSeen,
      totalTimeSec: stats.totalTimeSec,
      maxScrollDepth: stats.maxScrollDepth,
      contactSubmits: stats.contactSubmits,
      shares: stats.shares,
    },
  };

  // Fetch current progress
  const current = await prisma.visitorAchievement.findMany({
    where: { visitorId },
    include: { achievement: { select: { slug: true, goalNumber: true } } },
  });
  const currentBySlug = new Map(current.map((v) => [v.achievement.slug, v]));

  const newlyUnlocked: string[] = [];

  for (const rule of RULES) {
    const res = rule.check(ctx);
    const achievementId = slugToId.get(rule.slug)!;
    const existing = currentBySlug.get(rule.slug);

    const progressNumber = res.progress ?? 0;

    if (!existing) {
      await prisma.visitorAchievement.create({
        data: {
          visitorId,
          achievementId,
          unlockedAt: res.unlocked ? new Date() : null,
          progressNumber,
          lastProgressAt: new Date(),
        },
      });
      if (res.unlocked) newlyUnlocked.push(rule.description);
    } else {
      const setUnlocked = !existing.unlockedAt && res.unlocked ? { unlockedAt: new Date() } : {};
      if (!existing.unlockedAt && res.unlocked) newlyUnlocked.push(rule.description);

      await prisma.visitorAchievement.update({
        where: { id: existing.id },
        data: {
          progressNumber: Math.max(existing.progressNumber, progressNumber),
          lastProgressAt: new Date(),
          ...setUnlocked,
        },
      });
    }
  }

  return { newlyUnlocked };
}
