import { describe, it, expect } from 'vitest';
import { bips, type BIP } from '../src/data/bips';

describe('bips', () => {
  it('should have BIP entries', () => {
    expect(bips).toBeDefined();
    expect(bips.length).toBeGreaterThan(0);
  });

  it('should have unique BIP numbers', () => {
    const numbers = bips.map((bip) => bip.number);
    const uniqueNumbers = new Set(numbers);
    expect(uniqueNumbers.size).toBe(numbers.length);
  });

  it('should have required fields for each BIP', () => {
    bips.forEach((bip) => {
      expect(bip.number).toBeDefined();
      expect(typeof bip.number).toBe('number');
      expect(bip.number).toBeGreaterThan(0);

      expect(bip.title).toBeDefined();
      expect(bip.title.length).toBeGreaterThan(0);

      expect(bip.titleZh).toBeDefined();
      expect(bip.titleZh.length).toBeGreaterThan(0);

      expect(bip.status).toBeDefined();
      expect(bip.type).toBeDefined();
      expect(bip.summary).toBeDefined();
    });
  });

  it('should have valid status values', () => {
    const validStatuses: BIP['status'][] = [
      'Draft',
      'Proposed',
      'Final',
      'Active',
      'Replaced',
      'Rejected',
      'Withdrawn',
    ];

    bips.forEach((bip) => {
      expect(validStatuses).toContain(bip.status);
    });
  });

  it('should have valid type values', () => {
    const validTypes: BIP['type'][] = [
      'Standards Track',
      'Informational',
      'Process',
      'Applications',
    ];

    bips.forEach((bip) => {
      expect(validTypes).toContain(bip.type);
    });
  });

  it('should have valid importance values when specified', () => {
    const validImportance: BIP['importance'][] = [
      'fundamental',
      'critical',
      'important',
      'standard',
      undefined,
    ];

    bips.forEach((bip) => {
      if (bip.importance !== undefined) {
        expect(validImportance).toContain(bip.importance);
      }
    });
  });

  it('should have BIP numbers in ascending order', () => {
    for (let i = 1; i < bips.length; i++) {
      expect(bips[i].number).toBeGreaterThan(bips[i - 1].number);
    }
  });

  it('should have valid created date format when specified', () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    bips.forEach((bip) => {
      if (bip.created) {
        expect(bip.created).toMatch(dateRegex);
      }
    });
  });
});
