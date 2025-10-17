declare global {
  type EventType = 'PAGE_VIEW' | 'TIME_SPENT_SEC' | 'SCROLL_DEPTH' | 'CONTACT_SUBMIT' | 'SHARE';
  type AchievementEvent = {
    type: EventType;
    valueNum?: number;
    meta?: Record<string, unknown>;
  };
}
export {};
