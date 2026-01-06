import { describe, it, expect, vi } from 'vitest';
import logWithTimestamp from './logWithTimestamp';

describe('logWithTimestamp', () => {
  it('logs with a timestamp and args', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logWithTimestamp('test', 123);
    expect(spy).toHaveBeenCalled();
    const call = spy.mock.calls[0];
    expect(call[0]).toContain('['); // Timestamp should be present
    expect(call[1]).toBe('color: red;');
    expect(call[2]).toBe('test');
    expect(call[3]).toBe(123);
    spy.mockRestore();
  });
});
