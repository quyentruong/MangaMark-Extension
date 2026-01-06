import { describe, it, expect, vi } from 'vitest';
import debounce from './debounce';

describe('debounce', () => {
  vi.useFakeTimers();

  it('should debounce a function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);
    debounced('a', 1);
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledWith('a', 1);
  });
});
