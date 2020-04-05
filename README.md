# iterate-anything

Iterate anything with a same interface.

![GitHub](https://img.shields.io/github/license/SHND/iterate-anything)
[![Build Status](https://travis-ci.org/SHND/iterate-anything.svg?branch=master)](https://travis-ci.org/SHND/iterate-anything)
[![Coverage Status](https://coveralls.io/repos/github/SHND/iterate-anything/badge.svg?branch=master)](https://coveralls.io/github/SHND/iterate-anything?branch=master)

## Installation

```bash
npm install iterate-anything
```

## Usage

```javascript
import { itany } from 'iterate-anything';

for (let [value] of itany(1)) {
    console.log(value);     // prints 1
}

for (let [value] of itany([1, 2, 3])) {
    console.log(value);     // prints 1, 2, 3
}

for (let [value, key] of itany({a: 1, b: 2, c: 3})) {
    console.log(`${key}:${value}`);    // prints a:1 b:2 c:3
}
```

## Item Parameters

In each iteration, there are 4 pieces of data passed back as an array.
```
[value, key, passedValue, Type]
```

```javascript
import { itany } from 'iterate-anything';

for (let [value, key, passedValue, type] of itany({a: 1, b: 2, c: 3})) {
    console.log(value, key, passedValue, type);
}
```

This will print below:
```
1 a undefined 4
2 b undefined 4
3 c undefined 4
```

The third parameter *passedValue* is whatever method `next()` is being called with. Here since we're using `for (... of ...)` this value is undefined.

Type 4 is for Type List. If you're using TypeScript this is `TargetType.LIST`.

## Item Types

```javascript
import { TargetType } from 'iterate-anything';

TargetType.SET;         // Set of values with no order: Set
TargetType.MAP;         // Set of key/value pairs with no order: Map, Object
TargetType.LIST;        // List of values with order: Array, String
TargetType.SCALAR;      // Single Value: number, boolean, function, null, undefined, NaN, Promise, WeakMap, WeakSet, Promise
TargetType.ITERATOR;    // Native Iterator
```

## TypeScript

If you are using iterate-anything with TypeScript, you need to add `--downlevelIteration`.

```bash
tsc index.tsc --downlevelIteration
```

## Get native Iterator
```javascript
import { itany } from 'iterate-anything';

const iterator = itany([1, 2, 3])[Symbol.iterator]();

const { value: [value1], done: done1 } = iterator.next();
const { value: [value2], done: done2 } = iterator.next();
const { value: [value3], done: done3 } = iterator.next();
const { value: [value4], done: done4 } = iterator.next();
```