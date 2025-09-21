import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

function salted(hash: string) {
  const salt = process.env.FP_SALT ?? 'change_me';
  return crypto
    .createHash('sha256')
    .update(hash + salt)
    .digest('hex');
}

/**
 * POST /api/fingerprint
 * body: { hash: string, raw?: object }   // send ONLY hash for privacy if you prefer
 * Stores/updates a fingerprint; returns record meta.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { hash, raw } = body || {};
    if (!hash || typeof hash !== 'string') {
      return NextResponse.json({ error: 'Missing hash' }, { status: 400 });
    }

    const serverToken = salted(hash);

    // basic request info (avoid storing PII unless you have consent & need)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;
    const ua = req.headers.get('user-agent') || undefined;

    // upsert by hash
    const upserted = await prisma.visitorFingerprint.upsert({
      where: { hash },
      create: {
        hash,
        serverToken,
        userAgent: ua,
        ip,
        meta: raw ? raw : undefined,
      },
      update: {
        visits: { increment: 1 },
        userAgent: ua ?? undefined,
        ip: ip ?? undefined,
        // Optionally keep a trimmed meta (or drop)
        // meta: raw ? raw : undefined,
      },
    });

    return NextResponse.json({
      ok: true,
      id: upserted.id,
      hash,
      serverToken,
      visits: upserted.visits,
      firstSeen: upserted.firstSeen,
      lastSeen: upserted.lastSeen,
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * GET /api/fingerprint?hash=...  or  /api/fingerprint?serverToken=...
 * Looks up a record.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hash = searchParams.get('hash') ?? undefined;
    const token = searchParams.get('serverToken') ?? undefined;

    if (!hash && !token) {
      return NextResponse.json({ error: 'Provide hash or serverToken' }, { status: 400 });
    }

    const where = hash ? { hash } : { serverToken: token! };
    const rec = await prisma.visitorFingerprint.findUnique({ where });

    if (!rec) return NextResponse.json({ found: false });

    return NextResponse.json({
      found: true,
      id: rec.id,
      hash: rec.hash,
      serverToken: rec.serverToken,
      visits: rec.visits,
      firstSeen: rec.firstSeen,
      lastSeen: rec.lastSeen,
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
