import { describe, it, vi, expect } from 'vitest';
import removeCookie from './removeCookie';

describe('removeCookie', () => {
  it('sets the cookie to expired every 5 seconds', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(document, 'cookie', 'set');
    removeCookie('testcookie');
    vi.advanceTimersByTime(5000);
    expect(spy).toHaveBeenCalledWith(
      'testcookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    );
    spy.mockRestore();
    vi.useRealTimers();
  });
});
