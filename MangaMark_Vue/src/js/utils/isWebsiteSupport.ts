import { listWebsites } from "../global"
export default function isWebsiteSupport(url: string): boolean {
  return listWebsites.some(website => url.includes(website));
}
