'use client';
import { useEffect, useRef } from 'react';

export default function AchievementReporter({
  serverToken,
  hash,
}: {
  serverToken?: string;
  hash?: string;
}) {
  const timeStart = useRef<number>(Date.now());
  const maxDepth = useRef(0);

  useEffect(() => {
    // PAGE_VIEW immediately
    send([{ type: 'PAGE_VIEW' }]);
    const effectTimeStart = timeStart.current;

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const depth = Math.min(1, scrolled / (document.documentElement.scrollHeight || 1));
      if (depth > maxDepth.current) maxDepth.current = depth;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onBeforeUnload = () => {
      const secs = Math.round((Date.now() - timeStart.current) / 1000);
      const payload = [{ type: 'TIME_SPENT_SEC', valueNum: secs }];
      if (maxDepth.current > 0) payload.push({ type: 'SCROLL_DEPTH', valueNum: maxDepth.current });
      navigator.sendBeacon('/api/events', JSON.stringify({ serverToken, hash, events: payload }));
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeunload', onBeforeUnload);
      // also send on unmount (route change in SPA)
      const secs = Math.round((Date.now() - effectTimeStart) / 1000);
      const payload = [{ type: 'TIME_SPENT_SEC', valueNum: secs }];
      if (maxDepth.current > 0) payload.push({ type: 'SCROLL_DEPTH', valueNum: maxDepth.current });
      void fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serverToken, hash, events: payload }),
        keepalive: true,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface AchievementEvent {
    type: string;
    valueNum?: number;
  }

  interface AchievementResponse {
    newlyUnlocked?: unknown[];
    [key: string]: unknown;
  }

  function send(events: AchievementEvent[]): void {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serverToken, hash, events }),
      keepalive: true,
    })
      .then((r) => r.json())
      .then((res: AchievementResponse) => {
        if (Array.isArray(res?.newlyUnlocked) && res.newlyUnlocked.length) {
          const evt = new CustomEvent('achievements:unlocked', { detail: res.newlyUnlocked });
          window.dispatchEvent(evt);
        }
      })
      .catch(() => {});
  }

  return null;
}
