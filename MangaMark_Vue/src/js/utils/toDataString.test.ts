import { describe, it, expect } from 'vitest';
import toDataString from './toDataString';

describe('toDataString', () => {
  it('returns empty string for null/undefined', () => {
    expect(toDataString(null)).toBe('');
    expect(toDataString(undefined)).toBe('');
  });

  it('trims string input', () => {
    expect(toDataString('  hello  ')).toBe('hello');
  });

  it('returns innerText for HTMLElement', () => {
    const el = document.createElement('div');
    el.innerText = '  test  ';
    expect(toDataString(el)).toBe('test');
  });
});
