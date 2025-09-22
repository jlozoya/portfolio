'use client';
import { useEffect, useRef, useState } from 'react';

export default function AchievementToast() {
  const [queue, setQueue] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  // Listen and enqueue
  useEffect(() => {
    const onUnlocked = (e: Event) => {
      const { detail } = e as CustomEvent<string[]>;
      if (!detail?.length) return;
      setQueue((q) => [...q, ...detail.filter(Boolean)]);
    };
    window.addEventListener('achievements:unlocked', onUnlocked as EventListener);
    return () => window.removeEventListener('achievements:unlocked', onUnlocked as EventListener);
  }, []);

  // If hidden and there’s something in the queue, show the next one
  useEffect(() => {
    if (!visible && queue.length > 0) {
      setCurrent(queue[0]);
      setVisible(true);
    }
  }, [queue, visible]);

  // When visible, start ONE timer; cleanup only when hiding/unmounting
  useEffect(() => {
    if (!visible) return;
    timerRef.current = window.setTimeout(() => {
      setVisible(false);
      setQueue((q) => q.slice(1));
      setCurrent(null);
    }, 5000);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible]);

  if (!visible || !current) return null;

  return (
    <div
      className="pointer-events-none fixed right-4 bottom-4 z-50 rounded-2xl bg-black/85 px-4 py-3 text-white shadow-lg"
      role="status"
      aria-live="polite"
    >
      🏆 Achievement unlocked: <strong className="ml-1">{current}</strong>
    </div>
  );
}
