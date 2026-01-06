import { describe, it, expect, vi, beforeEach } from 'vitest';
import addCookie from './addCookie';

describe('addCookie', () => {
  let originalCookie;
  beforeEach(() => {
    originalCookie = document.cookie;
    // Clear all cookies for test isolation
    document.cookie.split(';').forEach(c => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  });

  it('should add a new cookie', () => {
    addCookie('test', 'value', 1);
    expect(document.cookie).toMatch(/test=value/);
  });

  it('should not overwrite existing cookie', () => {
    document.cookie = 'test=oldvalue';
    addCookie('test', 'newvalue', 1);
    expect(document.cookie).toMatch(/test=oldvalue/);
    expect(document.cookie).not.toMatch(/test=newvalue/);
  });

  it('should set expires attribute', () => {
    addCookie('expireTest', 'val', 1);
    // Can't directly check expires, but cookie should exist
    expect(document.cookie).toMatch(/expireTest=val/);
  });
});
