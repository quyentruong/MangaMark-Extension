/**
 *
 * @param cookieName - The name of the cookie to be removed.
 */
export default function removeCookie(cookieName: string): void {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
