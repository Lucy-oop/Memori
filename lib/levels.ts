/** JLPT levels the course covers, easiest first. JLPT numbers run backwards: 5 is easiest. */
export const LEVELS = [5, 4, 3, 2] as const;
export type Level = (typeof LEVELS)[number];

export const levelLabel = (l: number) => `N${l}`;
