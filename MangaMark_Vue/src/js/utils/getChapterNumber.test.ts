import { describe, it, expect } from 'vitest';
import getChapterNumber from './getChapterNumber';

describe('getChapterNumber', () => {
  it('returns empty string for null/undefined', () => {
    expect(getChapterNumber(null)).toBe('');
    expect(getChapterNumber(undefined)).toBe('');
  });

  it('extracts chapter number from string', () => {
    expect(getChapterNumber('Chapter 12')).toBe('12');
    expect(getChapterNumber('Chap 5.5')).toBe('5.5');
    expect(getChapterNumber('No number')).toBe('');
  });

  it('extracts chapter number from HTMLElement', () => {
    const el = document.createElement('div');
    el.innerHTML = 'Read chapter 42 now!';
    expect(getChapterNumber(el)).toBe('42');
  });
});
