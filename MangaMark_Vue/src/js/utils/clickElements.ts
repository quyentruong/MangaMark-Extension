/**
 * Clicks elements from the DOM based on the provided selector.
 * The selector can be any valid CSS selector (ID, class, tag, etc.).
 *
 * @param selector - The CSS selector of the element(s) to be clickd.
 *
 */
function _clickElements(selector: string): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);

  if (elements.length === 0) {
    // console.error('No elements found for the given selector.');
    return;
  }

  elements.forEach((element) => {
    element.click();
  });
}

export default function clickElements(selector: string): void {
  const intervalId = setInterval(() => {
    _clickElements(selector);
  }, 500);
  // Stop the interval after 5 seconds
  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
}
