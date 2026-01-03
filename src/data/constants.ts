/**
 * Shared constants for difficulty levels across the site
 */

export const difficultyLabels = {
  beginner: '入門',
  intermediate: '進階',
  advanced: '高級',
} as const;

export const difficultyVariants = {
  beginner: 'success',
  intermediate: 'bitcoin',
  advanced: 'warning',
} as const;

export type Difficulty = keyof typeof difficultyLabels;
export type DifficultyVariant = (typeof difficultyVariants)[Difficulty];
