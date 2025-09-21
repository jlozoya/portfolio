import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { evaluateAndAward, getOrInitStats } from '@/lib/award';

// Expect body: { serverToken?: string, hash?: string, events: Array<{type:string, valueNum?:number, meta?:any}> }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serverToken, hash, events } = body || {};
    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: 'No events' }, { status: 400 });
    }

    // Resolve visitor
    const visitor = await prisma.visitorFingerprint.findUnique({
      where: serverToken ? { serverToken } : { hash },
      select: { id: true },
    });
    if (!visitor) return NextResponse.json({ error: 'Unknown visitor' }, { status: 404 });

    // Insert logs (optional but nice to have)
    await prisma.eventLog.createMany({
      data: events.map((e: any) => ({
        visitorId: visitor.id,
        type: e.type,
        valueNum: typeof e.valueNum === 'number' ? e.valueNum : null,
        meta: e.meta ?? null,
      })),
    });

    // Update roll-up stats
    const stats = await getOrInitStats(visitor.id);
    const updates: Partial<{
      pagesSeen: number;
      totalTimeSec: number;
      maxScrollDepth: number;
      contactSubmits: number;
      shares: number;
    }> = {};
    for (const e of events) {
      switch (e.type) {
        case 'PAGE_VIEW':
          updates.pagesSeen = (updates.pagesSeen ?? stats.pagesSeen) + 1;
          break;
        case 'TIME_SPENT_SEC':
          updates.totalTimeSec = (updates.totalTimeSec ?? stats.totalTimeSec) + (e.valueNum || 0);
          break;
        case 'SCROLL_DEPTH':
          updates.maxScrollDepth = Math.max(
            updates.maxScrollDepth ?? stats.maxScrollDepth,
            e.valueNum || 0,
          );
          break;
        case 'CONTACT_SUBMIT':
          updates.contactSubmits = (updates.contactSubmits ?? stats.contactSubmits) + 1;
          break;
        case 'SHARE':
          updates.shares = (updates.shares ?? stats.shares) + 1;
          break;
        // VISIT handled by /api/fingerprint or you can send VISIT here too
      }
    }
    if (Object.keys(updates).length) {
      await prisma.visitorStats.update({
        where: { visitorId: visitor.id },
        data: updates,
      });
    }

    const { newlyUnlocked } = await evaluateAndAward(visitor.id);
    return NextResponse.json({ ok: true, newlyUnlocked });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
