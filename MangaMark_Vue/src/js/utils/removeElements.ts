/**
 * Removes elements from the DOM based on the provided selector.
 * The selector can be any valid CSS selector (ID, class, tag, etc.).
 *
 * @param selector - The CSS selector of the element(s) to be removed.
 *
 * @example
 * // Remove an element by ID
 * _removeElements('#fb-root');
 *
 * @example
 * // Remove elements by class
 * _removeElements('.some-class');
 *
 * @example
 * // Remove all images
 * _removeElements('img');
 *
 * @example
 * // Remove images with src containing a specific string
 * removeElements('img[src*="3q_top"]')
 *
 * @example
 * // Remove elements and remove a specific attribute
 * removeElements('.some-class', 'data-attribute');
 */
function _removeElements(selector: string, attribute?: string): void {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    // console.error('No elements found for the given selector.');
    return;
  }

  elements.forEach((element) => {
    if (attribute) {
      element.removeAttribute(attribute);
    } else {
      element.remove();
    }
  });
}

export default function removeElements(selector: string, attribute?: string): void {
  const intervalId = setInterval(() => {
    _removeElements(selector, attribute);
  }, 500);
  // Stop the interval after 5 seconds
  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
}
