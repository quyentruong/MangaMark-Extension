import { describe, it, expect } from 'vitest';
import { toDateString } from './toDateString';

describe('toDateString', () => {
  it('returns the date if not null/undefined', () => {
    const d = new Date();
    expect(toDateString(d)).toBe(d);
  });

  it('returns null for undefined', () => {
    expect(toDateString(undefined)).toBeNull();
  });

  it('returns null for null', () => {
    expect(toDateString(null)).toBeNull();
  });
});
