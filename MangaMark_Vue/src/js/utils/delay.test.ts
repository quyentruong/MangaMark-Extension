import { describe, it, expect, vi } from 'vitest';
import delay from './delay';

describe('delay', () => {
  it('should resolve after the given ms', async () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const promise = delay(100).then(spy);
    vi.advanceTimersByTime(100);
    await promise;
    expect(spy).toHaveBeenCalled();
  });
});
