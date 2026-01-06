import { describe, it, expect, vi } from 'vitest';
import isWebsiteSupport from './isWebsiteSupport';

vi.mock('../global', async () => {
  return {
    listWebsites: [
      'nettruyen',
      'mangatoon',
      'vlogtruyen',
    ],
  };
});

describe('isWebsiteSupport', () => {
  it('returns true if url contains a supported website', () => {
    expect(isWebsiteSupport('https://nettruyen.com/abc')).toBe(true);
    expect(isWebsiteSupport('https://mangatoon.com/xyz')).toBe(true);
  });

  it('returns false if url does not contain any supported website', () => {
    expect(isWebsiteSupport('https://unknownsite.com/123')).toBe(false);
  });
});
