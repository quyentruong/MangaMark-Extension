/**
 * Creates a debounced version of the provided function that delays its execution
 * until after a specified delay has passed since the last time it was invoked.
 *
 * @param func - The function to debounce. This function will only be executed
 *               after the delay period has elapsed without further calls.
 * @param delay - The number of milliseconds to wait before executing the function.
 * @returns A debounced version of the provided function. When invoked, it resets
 *          the delay timer and schedules the function to run after the delay.
 *
 * @example
 * // Example usage:
 * const debouncedFunction = debounce(() => {
 *   console.log('Function executed after 300ms of no calls');
 * }, 300);
 *
 * // Call the debounced function multiple times
 * debouncedFunction();
 * debouncedFunction();
 * debouncedFunction();
 * // The function will only execute once, 300ms after the last call.
 */
export default function debounce(func: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}
