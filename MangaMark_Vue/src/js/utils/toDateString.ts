/**
 * Returns the input date if it is not undefined or null, otherwise returns null.
 *
 * @param {Date | undefined | null} date - The input date.
 * @return {Date | null} - The input date if not undefined or null, otherwise null.
 */
export function toDateString(date: Date | undefined | null): Date | null {
    if (date) {
        return date
    }
    return null
}