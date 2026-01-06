import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import removeElements from './removeElements';

describe('removeElements', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <div id="fb-root"></div>
      <img class="some-class" src="foo.jpg" data-attribute="bar" />
      <div class="parent"><span class="child"></span></div>
    `;
    document.body.appendChild(container);
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.useRealTimers();
  });

  it('removes element by ID', () => {
    expect(document.querySelector('#fb-root')).not.toBeNull();
    removeElements('#fb-root');
    vi.advanceTimersByTime(600); // allow interval to run at least once
    expect(document.querySelector('#fb-root')).toBeNull();
  });

  it('removes elements by class', () => {
    expect(document.querySelector('.some-class')).not.toBeNull();
    removeElements('.some-class');
    vi.advanceTimersByTime(600);
    expect(document.querySelector('.some-class')).toBeNull();
  });

  it('removes attribute if specified', () => {
    const img = document.querySelector('.some-class') as HTMLElement;
    expect(img.getAttribute('data-attribute')).toBe('bar');
    removeElements('.some-class', { attribute: 'data-attribute' });
    vi.advanceTimersByTime(600);
    expect(img.getAttribute('data-attribute')).toBeNull();
    // element itself should still exist
    expect(document.querySelector('.some-class')).not.toBeNull();
  });

  it('removes closest parent if parentElement is specified', () => {
    expect(document.querySelector('.parent')).not.toBeNull();
    removeElements('.child', { parentElement: '.parent' });
    vi.advanceTimersByTime(600);
    expect(document.querySelector('.parent')).toBeNull();
  });
});
