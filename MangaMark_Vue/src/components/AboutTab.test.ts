import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutTab from './AboutTab.vue';

// Mock package.json import
vi.mock('../../package.json', () => ({
  default: {
    displayName: 'MangaMark',
    version: '1.2.3',
    copyright: 'Copyright 2026'
  }
}));

describe('AboutTab.vue', () => {
  let permissionsContainsMock: any;
  let permissionsRequestMock: any;
  let originalChrome: any;

  beforeEach(() => {
    // Mock chrome.permissions
    originalChrome = global.chrome;
    global.chrome = {
      permissions: {
        contains: vi.fn().mockResolvedValue(false),
        request: vi.fn().mockResolvedValue(true)
      }
    };
    permissionsContainsMock = global.chrome.permissions.contains;
    permissionsRequestMock = global.chrome.permissions.request;
  });

  afterEach(() => {
    global.chrome = originalChrome;
  });

  it('renders package info and changelog link', async () => {
    const wrapper = mount(AboutTab);
    expect(wrapper.text()).toContain('MangaMark v1.2.3');
    expect(wrapper.find('a[title="Press to visit the ChangeLog"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Copyright 2026');
  });

  it('calls chrome.permissions.request when Permissions button is clicked', async () => {
    const wrapper = mount(AboutTab);
    await wrapper.find('button').trigger('click');
    expect(permissionsRequestMock).toHaveBeenCalledWith({ origins: ['<all_urls>'] });
  });
});
