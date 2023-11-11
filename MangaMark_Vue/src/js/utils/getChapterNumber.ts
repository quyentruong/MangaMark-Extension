/**
 * Extracts the chapter number from a given string.
 *
 * @param str - The string containing the chapter number.
 * @returns The extracted chapter number as a string.
 */
export default function getChapterNumber(str: string | HTMLElement): string {
  let x: string | null = typeof str === 'string' ? str : str.innerText;
  x = x.trim().match(/(\d+\.?\d*)/)![1];
  return x;
}
