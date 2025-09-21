import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const serverToken = searchParams.get('serverToken') ?? undefined;
  const hash = searchParams.get('hash') ?? undefined;

  if (!serverToken && !hash) {
    return NextResponse.json({ error: 'Provide serverToken or hash' }, { status: 400 });
  }

  const visitor = await prisma.visitorFingerprint.findUnique({
    where: serverToken ? { serverToken } : { hash },
    select: { id: true },
  });
  if (!visitor) return NextResponse.json({ achievements: [], progress: [] });

  type VisitorAchievementWithAchievement = {
    achievement: { slug: string };
    unlockedAt?: Date | null;
    progressNumber?: number;
  };

  const [achievements, progress, stats] = await Promise.all([
    prisma.achievement.findMany(),
    prisma.visitorAchievement.findMany({
      where: { visitorId: visitor.id },
      include: { achievement: true },
    }),
    prisma.visitorStats.findUnique({ where: { visitorId: visitor.id } }),
  ]);

  const progressTyped = progress as VisitorAchievementWithAchievement[];

  const progressBySlug = new Map(progressTyped.map((p) => [p.achievement.slug, p]));

  interface VisitorAchievement {
    achievement: { slug: string };
    unlockedAt?: Date | null;
    progressNumber?: number;
  }

  interface AchievementData {
    slug: string;
    title: string;
    description: string;
    icon: string;
    goalNumber: number;
    unlocked: boolean;
    progressNumber: number;
    unlockedAt: Date | null;
  }

  const data: AchievementData[] = achievements.map((a) => {
    const p: VisitorAchievement | undefined = progressBySlug.get(a.slug);
    return {
      slug: a.slug,
      title: a.title,
      description: a.description,
      icon: a.icon ?? '', // fallback to empty string if null
      goalNumber: a.goalNumber ?? 0, // fallback to 0 if null
      unlocked: Boolean(p?.unlockedAt),
      progressNumber: p?.progressNumber ?? 0,
      unlockedAt: p?.unlockedAt ?? null,
    };
  });

  return NextResponse.json({ achievements: data, stats });
}
