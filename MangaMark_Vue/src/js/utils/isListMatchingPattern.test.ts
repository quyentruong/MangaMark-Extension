import { describe, it, expect, vi } from 'vitest';
import isListMatchingPattern from './isListMatchingPattern';

vi.mock('../global', async () => {
  return {
    listChapterPatterns: [
      '*://foo.com/manga/*',
      '*://bar.com/read/*',
    ],
  };
});

describe('isListMatchingPattern', () => {
  it('returns true if url matches a pattern', () => {
    expect(isListMatchingPattern('https://foo.com/manga/123')).toBe(true);
    expect(isListMatchingPattern('https://bar.com/read/456')).toBe(true);
  });

  it('returns false if url does not match any pattern', () => {
    expect(isListMatchingPattern('https://baz.com/other/789')).toBe(false);
  });
});
