/**
 * Logs the given arguments with a timestamp.
 *
 * @param {...any} args - The arguments to be logged.
 * @return {void} - This function does not return a value.
 */
export default function logWithTimestamp(...args) {
  const timestamp = new Date().toLocaleString()
  const formattedTimestamp = `%c[${timestamp}]`
  const logStyles = 'color: red;' // Change 'blue' to the desired color

  console.log(formattedTimestamp, logStyles, ...args)
}

