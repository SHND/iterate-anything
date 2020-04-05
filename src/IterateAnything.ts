import {
    TargetType,
    IteratorItem,
} from './Types';

import {
    isScalar,
    isString,
    isArray,
    isSet,
    isMap,
    isIterable,
    isFunction,
    isObject,
} from './utilities';

export class IterateAnything {

    /** target value which we want to iterate over */
    private target: any;
    /** private value to keep track of current position of item in target */
    private index: number;
    /** used for targets which have key for values like Object, Map, ... */
    private keys: any[];
    /** used for specifically for Sets */
    private values: any[];

    constructor(target: any) {
        this.target = target;
        this.index = 0;
        this.keys = [];
        this.values = [];
    }

    /**
     * next method for Scalar Types
     * @param {any} val is value passed to iterator next method
     * @returns {IteratorItem}
     */
    private scalarNext(val?: any): IteratorItem {
        const value = this.target;

        const output: IteratorItem = {
            value: this.index > 0 ? [] : [value, 0, val, TargetType.SCALAR],
            done: this.index > 0
        }

        if (!output.done) {
            this.index += 1;
        }

        return output;
    }

    /**
     * next method for String
     * @param {any} val is value passed to iterator next method
     * @returns {IteratorItem}
     */
    private stringNext(val?: any): IteratorItem {
        const value = this.target[this.index];

        const output: IteratorItem = {
            value: !value ? [] : [value, this.index, val, TargetType.LIST],
            done: value === undefined
        }

        if (!output.done) {
            this.index += 1;
        }

        return output;
    }

    /**
     * next method for Array
     * @param {any} val is value passed to iterator next method
     * @returns {IteratorItem}
     */
    private arrayNext(val?: any): IteratorItem {
        const value = this.target[this.index];

        const output: IteratorItem = {
            value: this.index >= this.target.length ? [] : [value, this.index, val, TargetType.LIST],
            done: this.index >= this.target.length
        }

        if (!output.done) {
            this.index += 1;
        }

        return output;
    }
    
    /**
     * next method for Set
     * @param {any} val is value passed to iterator next method
     * @returns {IteratorItem}
     */
    private setNext(val?: any): IteratorItem {
        const value = this.values[this.index];

        const output: IteratorItem = {
            value: this.index >= this.values.length ? [] : [value, this.index, val, TargetType.SET],
            done: this.index >= this.values.length
        }

        if (!output.done) {
            this.index += 1;
        }

        return output;
    }

    /**
     * next method for Map
     * @param {any} val is value passed to iterator next method
     * @returns {IteratorItem}
     */
    private mapNext(val?: any): IteratorItem {
        const key = this.keys[this.index]
        const value = this.target.get(key)

        const output: IteratorItem = {
            value: this.index >= this.keys.length ? [] : [value, key, val, TargetType.MAP],
            done: this.index >= this.keys.length
        }

        if (!output.done) {
            this.index += 1;
        }

        return output;
    }

    /**
     * next method for Iterator
     * @param {any} val is value passed to iterator next method
     * @returns {IteratorItem}
     */
    private iteratorNext(val?: any): IteratorItem {
        const { value, done } = this.target.next(val);

        const output: IteratorItem = {
            value: done ? [] : [value, this.index, val, TargetType.ITERATOR],
            done
        };

        if (!output.done) {
            this.index += 1;
        }

        return output;
    }

    /**
     * next method for objects
     * @param {any} val is value passed to iterator next method
     * @returns {IteratorItem}
     */
    private objectNext(val?: any): IteratorItem {
        const key = this.keys[this.index];
        const value = this.target[key];

        const output: IteratorItem = {
            value: this.index >= this.keys.length ? [] : [value, key, val, TargetType.MAP],
            done: this.index >= this.keys.length
        }

        if (!output.done) {
            this.index += 1;
        }
        
        return output;
    }

    /**
     * Native iterator
     * @returns {{ next: (val?: any) => IteratorItem }}
     */
    [Symbol.iterator](): { next: (val?: any) => IteratorItem } {
        if (isScalar(this.target)) {
            return { next: this.scalarNext.bind(this) }     
        } else if (isString(this.target)) {
            return { next: this.stringNext.bind(this) }
        } else if (isArray(this.target)) {
            return { next: this.arrayNext.bind(this) }
        } else if (isSet(this.target)) {
            this.values = Array.from(this.target.values())
            return { next: this.setNext.bind(this) }
        } else if (isMap(this.target)) {
            this.keys = Array.from(this.target.keys())
            return { next: this.mapNext.bind(this) }
        } else if (isIterable(this.target)) {
            return { next: this.iteratorNext.bind(this) }
        } else if (isFunction(this.target)) {
            return { next: this.scalarNext.bind(this) }
        } else if (isObject(this.target)) {
            this.keys = Object.keys(this.target);
            return { next: this.objectNext.bind(this) } 
        } else {
            return { next: this.scalarNext.bind(this) }
        }
    }

}

/**
 * Create IterateAnything iterator object.
 * This is simply a wrapper for IterateAnything
 * @param {any} target to iterate
 */
export function itany(target: any): IterateAnything {
    return new IterateAnything(target);
}
