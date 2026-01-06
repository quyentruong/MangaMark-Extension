import { describe, it, expect } from 'vitest';
import getCookieCManga from './getCookieCManga';

describe('getCookieCManga', () => {
  it('returns null if cookie does not exist', () => {
    expect(getCookieCManga('notfound_' + Math.random())).toBeNull();
  });

  it('returns cookie value if it contains ciphertext', () => {
    const name = 'cmanga_' + Math.random();
    document.cookie = name + '=' + encodeURIComponent('something-ciphertext-abc');
    expect(getCookieCManga(name)).toBe('something-ciphertext-abc');
  });

  it('returns null if cookie exists but does not contain ciphertext', () => {
    const name = 'cmanga_' + Math.random();
    document.cookie = name + '=' + encodeURIComponent('plainvalue');
    expect(getCookieCManga(name)).toBeNull();
  });
});
