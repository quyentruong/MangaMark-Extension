import logWithTimestamp from "../js/utils/logWithTimestamp";
import AqumangaWebsite from "../js/website/aquamangaWebsite";
import CmangaWebsite from "../js/website/cmangaWebsite";
import MangaclashWebsite from "../js/website/mangaclashWebsite";
import ManganatoWebsite from "../js/website/manganatoWebsite";
import MangatoonWebsite from "../js/website/mangatoonWebsite";
import MangatxWebsite from "../js/website/mangatxWebsite";
import NettruyenWebsite from "../js/website/nettruyenWebsite";
import NgonphongWebsite from "../js/website/ngonphongWebsite";
import ToptruyenWebsite from "../js/website/toptruyenWebsite";
import TruyenqqWebsite from "../js/website/truyenqqWebsite";
import VlogtruyenWebsite from "../js/website/vlogtruyenWebsite";
import Website from "../js/website/website";

export class WebsiteFactory {
  static createWebsite(url: string): Website {
    const Url = new URL(url)
    const domain = Url.hostname
    switch (true) {
      case domain.includes('nettruyen'):
      case domain.includes('nhattruyen'):
        return new NettruyenWebsite()
      case domain.includes('a3manga'):
      case domain.includes('ngonphong'):
        return new NgonphongWebsite()
      case domain.includes('mangatoon'):
        return new MangatoonWebsite()
      case domain.includes('cmanga'):
        return new CmangaWebsite()
      case domain.includes('truyenqq'):
      case domain.includes('phetruyen'):
        return new TruyenqqWebsite()
      case domain.includes('mangatx'):
      case domain.includes('webtoon.xyz'):
        return new MangatxWebsite()
      case domain.includes('vlogtruyen'):
        return new VlogtruyenWebsite()
      case domain.includes('aqua-manga'):
      case domain.includes('aquamanga'):
        return new AqumangaWebsite()
      case domain.includes('toptruyen'):
      case domain.includes('doctruyen3q'):
        return new ToptruyenWebsite()
      case domain.includes('manganato'):
        return new ManganatoWebsite()
      case domain.includes('toonclash') || domain.includes('mangaclash'):
        return new MangaclashWebsite()
      default:
        logWithTimestamp(`${domain} not supported yet`)
        throw new Error(`${domain} not supported yet`)
    }
  }
}
