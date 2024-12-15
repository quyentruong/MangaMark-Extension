/**
 * Removes elements from the DOM based on the provided selector.
 * If the selector is an ID (starts with '#'), it removes the element with that ID.
 * If the selector is a class (starts with '.'), it removes all elements with that class.
 * If the selector is 'img' and a substring is provided, it removes all images whose src attribute contains the substring.
 *
 * @param selector - The selector of the element(s) to be removed. Can be an ID, class, or 'img'.
 * @param substring - The substring to match in the src attribute of images (only used if selector is 'img').
 *
 * @example
 * // Remove an element by ID
 * removeElements('#fb-root');
 *
 * @example
 * // Remove elements by class
 * removeElements('.some-class');
 *
 * @example
 * // Remove images with 'ads' in their src attribute
 * removeElements('img', 'ads');
 */
function _removeElements(selector: string, substring?: string): void {
  if (selector.startsWith('#')) {
    // Remove element by ID
    const element = document.getElementById(selector.substring(1));
    if (element) {
      element.remove();
    }
  } else if (selector.startsWith('.')) {
    // Remove elements by class name
    const elements = document.getElementsByClassName(selector.substring(1));
    while (elements.length > 0) {
      elements[0].remove();
    }
  } else if (selector === 'img' && substring) {
    // Remove images by src substring
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (img.src.includes(substring)) {
        img.remove();
      }
    });
  } else {
    console.error('Selector must start with "#" for ID, "." for class, or "img" for images with a substring.');
  }
}

export default function removeElements(selector: string, substring?: string): void {
  const intervalId = setInterval(() => {
    _removeElements(selector, substring);
  }, 2000);
  // Stop the interval after 5 seconds
  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
}
