export default function getCookieCManga(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const cookieValue = c.substring(nameEQ.length, c.length);
      const decodedValue = decodeURIComponent(cookieValue);
      if (decodedValue.includes('ciphertext')) {
        return cookieValue;
      }
    }
  }
  return null;
}