/**
 * Extracts the chapter number from a given string.
 *
 * @param str - The string containing the chapter number.
 * @returns The extracted chapter number as a string.
 */
export default function getChapterNumber(obj: string | HTMLElement | undefined | null): string {
  if (!obj) return ''
  let x: string = typeof obj === 'string' ? obj : obj.innerHTML;
  let match = x.trim().match(/(\d+\.?\d*)/);
  x = match ? match[1] : '';
  return x;
}
