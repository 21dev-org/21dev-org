import { describe, it, expect } from 'vitest';
import { difficultyLabels, difficultyVariants, type Difficulty } from '../src/data/constants';

describe('difficultyLabels', () => {
  it('should have all difficulty levels defined', () => {
    expect(difficultyLabels.beginner).toBeDefined();
    expect(difficultyLabels.intermediate).toBeDefined();
    expect(difficultyLabels.advanced).toBeDefined();
  });

  it('should have Chinese labels', () => {
    expect(difficultyLabels.beginner).toBe('入門');
    expect(difficultyLabels.intermediate).toBe('進階');
    expect(difficultyLabels.advanced).toBe('高級');
  });
});

describe('difficultyVariants', () => {
  it('should have all difficulty levels defined', () => {
    expect(difficultyVariants.beginner).toBeDefined();
    expect(difficultyVariants.intermediate).toBeDefined();
    expect(difficultyVariants.advanced).toBeDefined();
  });

  it('should map to valid Tag variants', () => {
    const validVariants = ['default', 'bitcoin', 'lightning', 'nostr', 'success', 'warning'];
    expect(validVariants).toContain(difficultyVariants.beginner);
    expect(validVariants).toContain(difficultyVariants.intermediate);
    expect(validVariants).toContain(difficultyVariants.advanced);
  });

  it('should have correct variant mappings', () => {
    expect(difficultyVariants.beginner).toBe('success');
    expect(difficultyVariants.intermediate).toBe('bitcoin');
    expect(difficultyVariants.advanced).toBe('warning');
  });
});

describe('Difficulty type', () => {
  it('should accept valid difficulty values', () => {
    const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced'];
    expect(difficulties.length).toBe(3);
  });
});
