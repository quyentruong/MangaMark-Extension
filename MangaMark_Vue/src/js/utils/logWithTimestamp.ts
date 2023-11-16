/**
 * Logs the given arguments with a timestamp.
 *
 * @param {...any} args - The arguments to be logged.
 * @return {void} - This function does not return a value.
 */

const isDebug = false;
export default function logWithTimestamp(...args: unknown[]) {
  const timestamp = new Date().toLocaleString();
  const formattedTimestamp = `%c[${timestamp}]`;
  const logStyles = 'color: red;'; // Change 'blue' to the desired color

  console.log(formattedTimestamp, logStyles, ...args);

  if (isDebug) {
    const stackTrace = (new Error()).stack;
    const callerLine = stackTrace?.split('\n')[2];
    const match = callerLine?.match(/\((.*?):(\d+):(\d+)\)/);
    if (!match) return;
    const fileName = match[1];
    const lineNumber = match[2];
    const columnNumber = match[3];
    console.log(`${fileName}:${lineNumber}:${columnNumber}`);
  }
}
