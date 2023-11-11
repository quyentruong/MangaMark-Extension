import { minimatch } from "minimatch"
import { listChapterPatterns } from "../global"

export default function isListMatchingPattern(url: string): boolean {
  return listChapterPatterns.some((pattern) => minimatch(url, pattern));
}
