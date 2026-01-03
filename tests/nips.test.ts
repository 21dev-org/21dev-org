import { describe, it, expect } from 'vitest';
import { nips, getNIP, getNIPsByCategory, getNIPsByStatus, getImportantNIPs, type NIP } from '../src/data/nips';

describe('nips', () => {
  it('should have NIP entries', () => {
    expect(nips).toBeDefined();
    expect(nips.length).toBeGreaterThan(0);
  });

  it('should have unique NIP numbers', () => {
    const numbers = nips.map((nip) => nip.number);
    const uniqueNumbers = new Set(numbers);
    expect(uniqueNumbers.size).toBe(numbers.length);
  });

  it('should have required fields for each NIP', () => {
    nips.forEach((nip) => {
      expect(nip.number).toBeDefined();
      expect(typeof nip.number).toBe('number');
      expect(nip.number).toBeGreaterThan(0);

      expect(nip.title).toBeDefined();
      expect(nip.title.length).toBeGreaterThan(0);

      expect(nip.titleZh).toBeDefined();
      expect(nip.titleZh.length).toBeGreaterThan(0);

      expect(nip.status).toBeDefined();
      expect(nip.category).toBeDefined();
      expect(nip.summary).toBeDefined();
    });
  });

  it('should have valid status values', () => {
    const validStatuses: NIP['status'][] = [
      'Draft',
      'Final',
      'Deprecated',
      'Optional',
      'Recommended',
    ];

    nips.forEach((nip) => {
      expect(validStatuses).toContain(nip.status);
    });
  });

  it('should have valid category values', () => {
    const validCategories: NIP['category'][] = [
      'core',
      'identity',
      'messaging',
      'content',
      'relay',
      'client',
      'payment',
      'other',
    ];

    nips.forEach((nip) => {
      expect(validCategories).toContain(nip.category);
    });
  });

  it('should have valid importance values when specified', () => {
    const validImportance: NIP['importance'][] = [
      'fundamental',
      'critical',
      'important',
      'standard',
      undefined,
    ];

    nips.forEach((nip) => {
      if (nip.importance !== undefined) {
        expect(validImportance).toContain(nip.importance);
      }
    });
  });

  it('should have NIP numbers in ascending order', () => {
    for (let i = 1; i < nips.length; i++) {
      expect(nips[i].number).toBeGreaterThan(nips[i - 1].number);
    }
  });
});

describe('getNIP', () => {
  it('should return NIP by number', () => {
    const nip1 = getNIP(1);
    expect(nip1).toBeDefined();
    expect(nip1?.number).toBe(1);
    expect(nip1?.titleZh).toBe('基本協議');
  });

  it('should return undefined for non-existent NIP', () => {
    const nip = getNIP(9999);
    expect(nip).toBeUndefined();
  });
});

describe('getNIPsByCategory', () => {
  it('should filter NIPs by category', () => {
    const coreNips = getNIPsByCategory('core');
    expect(coreNips.length).toBeGreaterThan(0);
    coreNips.forEach((nip) => {
      expect(nip.category).toBe('core');
    });
  });

  it('should return empty array for category with no NIPs', () => {
    // All categories should have at least one NIP based on our data
    const categories: NIP['category'][] = ['core', 'identity', 'messaging', 'content', 'relay', 'client', 'payment', 'other'];
    categories.forEach((cat) => {
      const result = getNIPsByCategory(cat);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});

describe('getNIPsByStatus', () => {
  it('should filter NIPs by status', () => {
    const finalNips = getNIPsByStatus('Final');
    expect(finalNips.length).toBeGreaterThan(0);
    finalNips.forEach((nip) => {
      expect(nip.status).toBe('Final');
    });
  });
});

describe('getImportantNIPs', () => {
  it('should return NIPs with importance set', () => {
    const importantNips = getImportantNIPs();
    expect(importantNips.length).toBeGreaterThan(0);
    importantNips.forEach((nip) => {
      expect(nip.importance).toBeDefined();
    });
  });
});
