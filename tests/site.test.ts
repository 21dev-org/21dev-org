import { describe, it, expect } from 'vitest';
import { siteConfig, priorityTech } from '../src/data/site';

describe('siteConfig', () => {
  it('should have required fields', () => {
    expect(siteConfig.name).toBeDefined();
    expect(siteConfig.title).toBeDefined();
    expect(siteConfig.description).toBeDefined();
    expect(siteConfig.url).toBeDefined();
    expect(siteConfig.locale).toBeDefined();
  });

  it('should have a valid URL', () => {
    expect(siteConfig.url).toMatch(/^https?:\/\//);
  });

  it('should have social links', () => {
    expect(siteConfig.social).toBeDefined();
    expect(siteConfig.social.github).toMatch(/^https?:\/\//);
    expect(siteConfig.social.twitter).toMatch(/^https?:\/\//);
  });

  it('should have navigation links', () => {
    expect(siteConfig.navLinks).toBeDefined();
    expect(siteConfig.navLinks.length).toBeGreaterThan(0);
    siteConfig.navLinks.forEach((link) => {
      expect(link.label).toBeDefined();
      expect(link.href).toBeDefined();
      expect(link.href.startsWith('/')).toBe(true);
    });
  });

  it('should have secondary links', () => {
    expect(siteConfig.secondaryLinks).toBeDefined();
    expect(siteConfig.secondaryLinks.length).toBeGreaterThan(0);
  });
});

describe('priorityTech', () => {
  it('should have technology entries', () => {
    expect(priorityTech).toBeDefined();
    expect(priorityTech.length).toBeGreaterThan(0);
  });

  it('should have required fields for each tech', () => {
    priorityTech.forEach((tech) => {
      expect(tech.id).toBeDefined();
      expect(tech.name).toBeDefined();
      expect(tech.description).toBeDefined();
      expect(tech.icon).toBeDefined();
      expect(tech.color).toBeDefined();
    });
  });

  it('should have unique IDs', () => {
    const ids = priorityTech.map((tech) => tech.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
