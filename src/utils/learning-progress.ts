/**
 * Learning Progress Tracking Utility
 * Tracks user's reading progress across the site using localStorage
 */

const STORAGE_KEY = '21dev-learning-progress';

export interface LearningProgress {
  articlesRead: string[];
  bipsViewed: string[];
  booksExplored: string[];
  techDocsViewed: string[];
  lastVisit: string;
  totalTimeSpent: number; // in seconds
  visitCount: number;
}

const defaultProgress: LearningProgress = {
  articlesRead: [],
  bipsViewed: [],
  booksExplored: [],
  techDocsViewed: [],
  lastVisit: new Date().toISOString(),
  totalTimeSpent: 0,
  visitCount: 0,
};

/**
 * Get current learning progress from localStorage
 */
export function getProgress(): LearningProgress {
  if (typeof window === 'undefined') return defaultProgress;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultProgress, ...JSON.parse(stored) };
    }
  } catch {
    // Invalid data, reset
  }
  return { ...defaultProgress };
}

/**
 * Save learning progress to localStorage
 */
export function saveProgress(progress: LearningProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full or unavailable
  }
}

/**
 * Record a page visit
 */
export function recordPageVisit(path: string): void {
  const progress = getProgress();
  progress.lastVisit = new Date().toISOString();
  progress.visitCount += 1;

  // Categorize the page
  if (path.startsWith('/learn/')) {
    if (!progress.articlesRead.includes(path)) {
      progress.articlesRead.push(path);
    }
  } else if (path.startsWith('/bips/')) {
    if (!progress.bipsViewed.includes(path)) {
      progress.bipsViewed.push(path);
    }
  } else if (path.startsWith('/books/')) {
    if (!progress.booksExplored.includes(path)) {
      progress.booksExplored.push(path);
    }
  } else if (path.startsWith('/tech/')) {
    if (!progress.techDocsViewed.includes(path)) {
      progress.techDocsViewed.push(path);
    }
  }

  saveProgress(progress);
}

/**
 * Record time spent on page
 */
export function recordTimeSpent(seconds: number): void {
  const progress = getProgress();
  progress.totalTimeSpent += seconds;
  saveProgress(progress);
}

/**
 * Get user's learning level based on progress
 */
export function getLearningLevel(progress: LearningProgress): {
  level: string;
  levelZh: string;
  description: string;
} {
  const totalContent =
    progress.articlesRead.length +
    progress.bipsViewed.length +
    progress.booksExplored.length +
    progress.techDocsViewed.length;

  if (totalContent === 0) {
    return {
      level: 'newcomer',
      levelZh: '新手',
      description: '開始你的比特幣學習之旅',
    };
  } else if (totalContent < 5) {
    return {
      level: 'beginner',
      levelZh: '初學者',
      description: '已開始探索比特幣世界',
    };
  } else if (totalContent < 15) {
    return {
      level: 'learner',
      levelZh: '學習者',
      description: '正在深入理解比特幣',
    };
  } else if (totalContent < 30) {
    return {
      level: 'enthusiast',
      levelZh: '愛好者',
      description: '對比特幣有深入了解',
    };
  } else {
    return {
      level: 'expert',
      levelZh: '專家',
      description: '比特幣技術專家',
    };
  }
}

/**
 * Get progress statistics
 */
export function getProgressStats(progress: LearningProgress): {
  totalPages: number;
  articlesCount: number;
  bipsCount: number;
  booksCount: number;
  techDocsCount: number;
  timeSpentMinutes: number;
} {
  return {
    totalPages:
      progress.articlesRead.length +
      progress.bipsViewed.length +
      progress.booksExplored.length +
      progress.techDocsViewed.length,
    articlesCount: progress.articlesRead.length,
    bipsCount: progress.bipsViewed.length,
    booksCount: progress.booksExplored.length,
    techDocsCount: progress.techDocsViewed.length,
    timeSpentMinutes: Math.round(progress.totalTimeSpent / 60),
  };
}

/**
 * Check if a specific page has been read
 */
export function hasReadPage(path: string): boolean {
  const progress = getProgress();

  return (
    progress.articlesRead.includes(path) ||
    progress.bipsViewed.includes(path) ||
    progress.booksExplored.includes(path) ||
    progress.techDocsViewed.includes(path)
  );
}

/**
 * Clear all progress data
 */
export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
