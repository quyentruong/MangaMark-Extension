import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock all website classes and logWithTimestamp
vi.mock('../js/website/nettruyenWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'NettruyenWebsite'; } }
}));
vi.mock('../js/website/ngonphongWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'NgonphongWebsite'; } }
}));
vi.mock('../js/website/mangatoonWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'MangatoonWebsite'; } }
}));
vi.mock('../js/website/cmangaWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'CmangaWebsite'; } }
}));
vi.mock('../js/website/truyenqqWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'TruyenqqWebsite'; } }
}));
vi.mock('../js/website/mangatxWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'MangatxWebsite'; } }
}));
vi.mock('../js/website/vlogtruyenWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'VlogtruyenWebsite'; } }
}));
vi.mock('../js/website/aquamangaWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'AqumangaWebsite'; } }
}));
vi.mock('../js/website/toptruyenWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'ToptruyenWebsite'; } }
}));
vi.mock('../js/website/manganatoWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'ManganatoWebsite'; } }
}));
vi.mock('../js/website/mangaclashWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'MangaclashWebsite'; } }
}));
vi.mock('../js/website/fastscansWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'FastscansWebsite'; } }
}));
vi.mock('../js/website/omegascansWebsite', () => ({
  default: class { name: string; constructor() { this.name = 'OmegascansWebsite'; } }
}));
vi.mock('../js/website/website', () => ({ default: vi.fn() }));

const logSpy = vi.fn();
vi.mock('../js/utils/logWithTimestamp', () => ({ default: logSpy }));

let WebsiteFactory: any;

beforeEach(async () => {
  logSpy.mockClear();
  // Dynamically import after mocks are set up
  WebsiteFactory = (await import('./websiteFactory')).WebsiteFactory;
});

describe('WebsiteFactory', () => {
  it('returns NettruyenWebsite for nettruyen domain', () => {
    const result = WebsiteFactory.createWebsite('https://nettruyen.com/abc');
    expect(result.name).toBe('NettruyenWebsite');
  });

  it('returns NgonphongWebsite for ngonphong domain', () => {
    const result = WebsiteFactory.createWebsite('https://ngonphong.com/abc');
    expect(result.name).toBe('NgonphongWebsite');
  });

  it('returns MangatoonWebsite for mangatoon domain', () => {
    const result = WebsiteFactory.createWebsite('https://mangatoon.com/abc');
    expect(result.name).toBe('MangatoonWebsite');
  });

  it('returns CmangaWebsite for cmanga domain', () => {
    const result = WebsiteFactory.createWebsite('https://cmanga.com/abc');
    expect(result.name).toBe('CmangaWebsite');
  });

  it('returns TruyenqqWebsite for truyenqq domain', () => {
    const result = WebsiteFactory.createWebsite('https://truyenqq.com/abc');
    expect(result.name).toBe('TruyenqqWebsite');
  });

  it('returns MangatxWebsite for mangatx domain', () => {
    const result = WebsiteFactory.createWebsite('https://mangatx.com/abc');
    expect(result.name).toBe('MangatxWebsite');
  });

  it('returns VlogtruyenWebsite for vlogtruyen domain', () => {
    const result = WebsiteFactory.createWebsite('https://vlogtruyen.com/abc');
    expect(result.name).toBe('VlogtruyenWebsite');
  });

  it('returns AqumangaWebsite for aquamanga domain', () => {
    const result = WebsiteFactory.createWebsite('https://aquamanga.com/abc');
    expect(result.name).toBe('AqumangaWebsite');
  });

  it('returns ToptruyenWebsite for toptruyen domain', () => {
    const result = WebsiteFactory.createWebsite('https://toptruyen.com/abc');
    expect(result.name).toBe('ToptruyenWebsite');
  });

  it('returns ManganatoWebsite for manganato domain', () => {
    const result = WebsiteFactory.createWebsite('https://manganato.com/abc');
    expect(result.name).toBe('ManganatoWebsite');
  });

  it('returns MangaclashWebsite for mangaclash domain', () => {
    const result = WebsiteFactory.createWebsite('https://mangaclash.com/abc');
    expect(result.name).toBe('MangaclashWebsite');
  });

  it('returns OmegascansWebsite for omegascans domain', () => {
    const result = WebsiteFactory.createWebsite('https://omegascans.com/abc');
    expect(result.name).toBe('OmegascansWebsite');
  });

  it('throws and logs for unsupported domain', () => {
    expect(() => WebsiteFactory.createWebsite('https://unsupported.com/abc')).toThrow('unsupported.com not supported yet');
    expect(logSpy).toHaveBeenCalledWith('unsupported.com not supported yet');
  });
});
