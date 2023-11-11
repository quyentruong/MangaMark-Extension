/**
 * Converts the given object to a string representation.
 *
 * @param {string | undefined | null} obj - The object to be converted to a string.
 * @return {string} The string representation of the object. If the object is falsy, an empty string is returned.
 */
export function toDataString(obj: string | undefined | null): string {
    if (obj) {
        return obj
    }
    return ''
}