'use client';
import { useEffect, useState } from 'react';

export default function AchievementToast() {
  const [queue, setQueue] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onUnlocked = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      setQueue((q) => [...q, ...(customEvent.detail || [])]);
    };
    window.addEventListener('achievements:unlocked', onUnlocked as EventListener);
    return () => window.removeEventListener('achievements:unlocked', onUnlocked as EventListener);
  }, []);

  useEffect(() => {
    if (visible || queue.length === 0) return;
    setVisible(true);
    const t = setTimeout(() => {
      setQueue((q) => q.slice(1));
      setVisible(false);
    }, 3000);
    return () => clearTimeout(t);
  }, [queue, visible]);

  const current = queue[0];

  return visible && current ? (
    <div className="fixed right-4 bottom-4 rounded-2xl bg-black/85 px-4 py-3 text-white shadow-lg">
      🏆 Achievement unlocked: <strong className="ml-1">{current}</strong>
    </div>
  ) : null;
}
