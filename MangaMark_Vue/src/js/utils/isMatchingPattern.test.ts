import { describe, it, expect, vi } from 'vitest';
import isMatchingPattern from './isMatchingPattern';
import * as globalModule from '../global';

vi.mock('../global', async () => {
  // Provide a mock patterns array for testing
  return {
    patterns: [
      '*://example.com/manga/*/chapter-*',
      '*://testsite.com/read/*',
    ],
  };
});

describe('isMatchingPattern', () => {
  it('returns true if url matches a pattern', () => {
    expect(isMatchingPattern('https://example.com/manga/abc/chapter-1')).toBe(true);
    expect(isMatchingPattern('https://testsite.com/read/123')).toBe(true);
  });

  it('returns false if url does not match any pattern', () => {
    expect(isMatchingPattern('https://notmatching.com/other/123')).toBe(false);
  });
});
