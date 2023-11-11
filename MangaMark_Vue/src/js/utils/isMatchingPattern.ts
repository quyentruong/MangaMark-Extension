import { minimatch } from "minimatch"
import { patterns } from "../global"

export default function isMatchingPattern(url: string): boolean {
  return patterns.some((pattern) => minimatch(url, pattern));
}
