import { describe, it, expect } from 'vitest';
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateTechArticleSchema,
  generateCourseSchema,
  generateCourseListSchema,
  generateBookSchema,
} from '../src/utils/schema';

describe('generateFAQSchema', () => {
  it('should generate valid FAQ schema', () => {
    const items = [
      { question: 'What is Bitcoin?', answer: 'Bitcoin is a decentralized digital currency.' },
      { question: 'What is Lightning?', answer: 'Lightning is a Layer 2 solution for Bitcoin.' },
    ];

    const schema = generateFAQSchema(items);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]['@type']).toBe('Question');
    expect(schema.mainEntity[0].name).toBe('What is Bitcoin?');
  });
});

describe('generateBreadcrumbSchema', () => {
  it('should generate valid breadcrumb schema', () => {
    const items = [
      { name: 'Home', url: '/' },
      { name: 'Learn', url: '/learn/' },
      { name: 'Basics' },
    ];

    const schema = generateBreadcrumbSchema(items);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[2].name).toBe('Basics');
  });
});

describe('generateTechArticleSchema', () => {
  it('should generate valid TechArticle schema', () => {
    const article = {
      title: 'Understanding BIP-340',
      description: 'Learn about Schnorr signatures in Bitcoin',
      url: '/bips/bip-0340',
      proficiencyLevel: 'Intermediate' as const,
      keywords: ['Bitcoin', 'Schnorr', 'Taproot'],
    };

    const schema = generateTechArticleSchema(article);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('TechArticle');
    expect(schema.headline).toBe('Understanding BIP-340');
    expect(schema.proficiencyLevel).toBe('Intermediate');
    expect(schema.inLanguage).toBe('zh-Hant');
  });
});

describe('generateCourseSchema', () => {
  it('should generate valid Course schema', () => {
    const course = {
      name: 'Bitcoin 入門課程',
      description: '從零開始學習 Bitcoin 基礎知識',
      url: '/learn/basics/',
      difficulty: 'Beginner' as const,
      modules: [
        { name: '什麼是 Bitcoin', description: '介紹 Bitcoin 的基本概念' },
        { name: '錢包設置', description: '學習如何設置你的第一個錢包' },
      ],
      keywords: ['Bitcoin', '入門', '基礎'],
    };

    const schema = generateCourseSchema(course);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Course');
    expect(schema.name).toBe('Bitcoin 入門課程');
    expect(schema.educationalLevel).toBe('Beginner');
    expect(schema.inLanguage).toBe('zh-Hant');
    expect(schema.provider['@type']).toBe('Organization');
    expect(schema.syllabusSections).toHaveLength(2);
  });

  it('should handle optional fields correctly', () => {
    const minimalCourse = {
      name: 'Simple Course',
      description: 'A simple course',
      url: '/learn/simple/',
    };

    const schema = generateCourseSchema(minimalCourse);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Course');
    expect(schema.educationalLevel).toBeUndefined();
    expect(schema.syllabusSections).toBeUndefined();
  });
});

describe('generateCourseListSchema', () => {
  it('should generate valid ItemList schema for courses', () => {
    const courses = [
      { name: '入門課程', url: '/learn/basics/', description: '基礎知識' },
      { name: '進階課程', url: '/learn/advanced/', description: '進階技術' },
    ];

    const schema = generateCourseListSchema(courses);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('ItemList');
    expect(schema.numberOfItems).toBe(2);
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].item['@type']).toBe('Course');
  });
});

describe('generateBookSchema', () => {
  it('should generate valid Book schema', () => {
    const book = {
      name: 'Mastering Bitcoin',
      author: 'Andreas M. Antonopoulos',
      description: 'A comprehensive guide to Bitcoin',
      url: '/books/mastering-bitcoin',
    };

    const schema = generateBookSchema(book);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Book');
    expect(schema.name).toBe('Mastering Bitcoin');
    expect(schema.author['@type']).toBe('Person');
    expect(schema.inLanguage).toBe('zh-Hant');
  });
});
