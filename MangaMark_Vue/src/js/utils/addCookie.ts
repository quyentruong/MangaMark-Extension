/**
 *
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param days - The number of days until the cookie expires.
 */
export default function addCookie(name: string, value: string, days: number): void {
  if (document.cookie.split(';').some((item) => item.trim().startsWith(name + '='))) {
    // console.log(`Cookie with name "${name}" already exists.`);
    return;
  }

  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}