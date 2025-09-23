declare global {
  interface WindowEventMap {
    'achievements:unlocked': CustomEvent<string[]>;
  }
}
export {};
