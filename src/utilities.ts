/**
 * Check if parameter is a single value
 * @param {any} target to be checked
 * @returns {boolean}
 */
export function isScalar(target:any) {
    if (
        target === null || 
        target === undefined || 
        target === NaN || 
        typeof target === 'number' ||
        typeof target === 'bigint' ||
        typeof target === 'boolean' ||
        target instanceof RegExp ||
        target instanceof WeakMap ||
        target instanceof WeakSet ||
        target instanceof Promise
    ) {
        return true;
    }

    return false;
}

/**
 * Check if parameter is a String
 * @param {any} target to be checked
 * @returns {boolean}
 */
export function isString(target: any) {
    return typeof target === 'string';
}

/**
 * Check if parameter is an Array
 * @param {any} target to be checked
 * @returns {boolean}
 */
export function isArray(target: any) {
    return Array.isArray(target);
}

/**
 * Check if parameter is a Set
 * @param {any} target to be checked
 * @returns {boolean}
 */
export function isSet(target: any) {
    return target instanceof Set;
}

/**
 * Check if parameter is a Map
 * @param {any} target to be checked
 * @returns {boolean}
 */
export function isMap(target: any) {
    return target instanceof Map;
}

/**
 * Check if parameter is natively iterable
 * @param {any} target to be checked
 * @returns {boolean}
 */
export function isIterable(target: any) {
    if (target == null) {
      return false;
    }
    return typeof target[Symbol.iterator] === 'function';
}

/**
 * Check if parameter is a Function
 * @param {any} target to be checked
 * @returns {boolean}
 */
export function isFunction(target: any) {
    return typeof(target) === 'function';
}

/**
 * Check if parameter is an Object
 * @param {any} target to be checked
 * @returns {boolean}
 */
export function isObject(target: any) {
    return typeof target === 'object';
}
