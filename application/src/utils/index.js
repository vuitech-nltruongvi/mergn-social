/***
 * Get a property of object safely
 * @param fn: function that gets object property
 * @param defaultValue: default value if something wrong
 * @example
 *  getSafe(() => a.b.c.d, 'someValue') => d
 *  getSafe(() => a.b[undefined].c.d, 'someValue') => 'someValue'
 * @returns {string|*}
 */
export function getObjectPropSafely(fn, defaultValue = '') {
    try {
        return fn();
    } catch (e) {
        return defaultValue;
    }
}
