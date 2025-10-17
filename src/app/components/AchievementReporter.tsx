'use client';
import { usePathname } from 'next/navigation';
import { showToast } from 'nextjs-toast-notify';
import { useEffect, useRef } from 'react';

export default function AchievementReporter({
  serverToken,
  hash,
}: {
  serverToken?: string;
  hash?: string;
}) {
  const pathname = usePathname();
  const timeStart = useRef<number>(Date.now());
  const maxDepth = useRef(0);
  const lastPath = useRef<string | null>(null);

  const canSend = () => Boolean(serverToken && hash);
  // Route changes + initial PAGE_VIEW when identifier available
  useEffect(() => {
    if (!canSend()) return;
    const nowPath = pathname || window.location.pathname;
    if (lastPath.current === null) {
      lastPath.current = nowPath;
      timeStart.current = Date.now();
      maxDepth.current = 0;
      void send([{ type: 'PAGE_VIEW', meta: { path: nowPath, ref: document.referrer } }]);
      return;
    }
    if (lastPath.current !== nowPath) {
      flush();
      lastPath.current = nowPath;
      timeStart.current = Date.now();
      maxDepth.current = 0;
      void send([{ type: 'PAGE_VIEW', meta: { path: nowPath } }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, serverToken, hash]);

  // Scroll depth tracking (throttled with rAF)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY + window.innerHeight;
        const doc = document.documentElement;
        const total = doc.scrollHeight || 1;
        const depth = Math.min(1, scrolled / total);
        if (depth > maxDepth.current) maxDepth.current = depth;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lifecycle flushes
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    const onPageHide = () => flush();
    const onBeforeUnload = () => flush();
    window.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('beforeunload', onBeforeUnload);
      flush();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flush = () => {
    const secs = Math.max(0, Math.round((Date.now() - timeStart.current) / 1000));
    const events: AchievementEvent[] = [{ type: 'TIME_SPENT_SEC', valueNum: secs }];
    if (maxDepth.current > 0) events.push({ type: 'SCROLL_DEPTH', valueNum: maxDepth.current });
    beacon(events);
  };

  const beacon = (events: AchievementEvent[]) => {
    if (!canSend()) return;
    const blob = new Blob([JSON.stringify({ serverToken, hash, events })], {
      type: 'application/json',
    });
    navigator.sendBeacon('/api/events', blob);
  };

  const send = async (events: AchievementEvent[]) => {
    if (!canSend()) return;
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serverToken, hash, events }),
        keepalive: true,
      });
      const json = await res.json();
      if (Array.isArray(json?.newlyUnlocked) && json.newlyUnlocked.length) {
        showToast.success(json.newlyUnlocked, {
          duration: 4000,
          progress: false,
          position: 'bottom-center',
          transition: 'bounceIn',
          icon: '',
          sound: false,
        });
      }
    } catch {}
  };

  return null;
}
