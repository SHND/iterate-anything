/**
 * IteratorAnything categorizing of JavaScript Types as an iterables
 */
export enum TargetType {
    /** anything that natively is not iterable */
    SCALAR = 1,
    /** anything sequential values with order */
    LIST,
    /** any set of values that don't have order */
    SET,
    /** any set of key/value pairs that don't have order */
    MAP,
    /** specifically JavaScript Native iterators, since they can be infinite */
    ITERATOR
}

/**
 * IterateAnything final values received from calling next
 */
export type IteratorItemValue = [any, any, any, TargetType] | [];

/**
 * Simulate output of iterator next method output
 */
export interface IteratorItem {
    value: IteratorItemValue;
    done: boolean;
}