export type RuleContext = {
  stats: {
    visits: number;
    pagesSeen: number;
    totalTimeSec: number;
    maxScrollDepth: number; // 0..1
    contactSubmits: number;
    shares: number;
  };
};

export type AchievementRule = {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  goalNumber?: number; // optional for UI progress bar
  // return true when unlocked; optionally return a numeric progress for UI
  check: (ctx: RuleContext) => { unlocked: boolean; progress?: number; goal?: number };
};

export const RULES: AchievementRule[] = [
  {
    slug: 'first-visit',
    title: 'First Visit',
    description: 'You made it here. Welcome! 🎉',
    icon: '🎉',
    check: ({ stats }) => ({
      unlocked: stats.visits >= 1,
      progress: Math.min(stats.visits, 1),
      goal: 1,
    }),
  },
  {
    slug: 'regular-5',
    title: 'Regular',
    description: 'Visited 5 times.',
    icon: '📅',
    goalNumber: 5,
    check: ({ stats }) => ({
      unlocked: stats.visits >= 5,
      progress: Math.min(stats.visits, 5),
      goal: 5,
    }),
  },
  {
    slug: 'explorer-5-pages',
    title: 'Explorer',
    description: 'Viewed 5 pages.',
    icon: '🧭',
    goalNumber: 5,
    check: ({ stats }) => ({
      unlocked: stats.pagesSeen >= 5,
      progress: Math.min(stats.pagesSeen, 5),
      goal: 5,
    }),
  },
  {
    slug: 'deep-dive-10min',
    title: 'Deep Diver',
    description: 'Spent 10+ minutes total.',
    icon: '⏱️',
    goalNumber: 600,
    check: ({ stats }) => ({
      unlocked: stats.totalTimeSec >= 600,
      progress: Math.min(stats.totalTimeSec, 600),
      goal: 600,
    }),
  },
  {
    slug: 'scroll-master-90',
    title: 'Scroll Master',
    description: 'Scrolled 90%+ of a page.',
    icon: '🧷',
    goalNumber: 100,
    check: ({ stats }) => ({
      unlocked: stats.maxScrollDepth >= 0.9,
      progress: Math.round((stats.maxScrollDepth || 0) * 100),
      goal: 100,
    }),
  },
  {
    slug: 'connector',
    title: 'Connector',
    description: 'Submitted the contact form once.',
    icon: '✉️',
    goalNumber: 1,
    check: ({ stats }) => ({
      unlocked: stats.contactSubmits >= 1,
      progress: Math.min(stats.contactSubmits, 1),
      goal: 1,
    }),
  },
  {
    slug: 'hype-agent',
    title: 'Hype Agent',
    description: 'Shared the site.',
    icon: '📣',
    goalNumber: 1,
    check: ({ stats }) => ({
      unlocked: stats.shares >= 1,
      progress: Math.min(stats.shares, 1),
      goal: 1,
    }),
  },
];
