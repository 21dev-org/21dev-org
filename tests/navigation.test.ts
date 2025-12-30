import { describe, it, expect } from 'vitest';
import { navigation } from '../src/data/navigation';

describe('navigation', () => {
  it('should have navigation items', () => {
    expect(navigation).toBeDefined();
    expect(navigation.length).toBeGreaterThan(0);
  });

  it('should have required fields for each menu item', () => {
    navigation.forEach((item) => {
      expect(item.label).toBeDefined();
      expect(item.label.length).toBeGreaterThan(0);

      expect(item.href).toBeDefined();
      expect(item.href.startsWith('/')).toBe(true);

      expect(item.sections).toBeDefined();
      expect(Array.isArray(item.sections)).toBe(true);
    });
  });

  it('should have valid sections with links', () => {
    navigation.forEach((item) => {
      item.sections.forEach((section) => {
        expect(section.title).toBeDefined();
        expect(section.title.length).toBeGreaterThan(0);

        expect(section.links).toBeDefined();
        expect(Array.isArray(section.links)).toBe(true);

        section.links.forEach((link) => {
          expect(link.label).toBeDefined();
          expect(link.href).toBeDefined();
          expect(link.href.startsWith('/')).toBe(true);
        });
      });
    });
  });

  it('should have valid featured section when specified', () => {
    navigation.forEach((item) => {
      if (item.featured) {
        expect(item.featured.title).toBeDefined();
        expect(item.featured.description).toBeDefined();
        expect(item.featured.href).toBeDefined();
        expect(item.featured.href.startsWith('/')).toBe(true);
      }
    });
  });

  it('should have unique href values within sections', () => {
    navigation.forEach((item) => {
      const allHrefs: string[] = [];
      item.sections.forEach((section) => {
        section.links.forEach((link) => {
          allHrefs.push(link.href);
        });
      });

      const uniqueHrefs = new Set(allHrefs);
      expect(uniqueHrefs.size).toBe(allHrefs.length);
    });
  });
});
