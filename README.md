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
import { itany } from 'iterate-anything'

for (let [value] of itany(1)) {
    console.log(value)     // prints 1
}

for (let [value] of itany([1, 2, 3])) {
    console.log(value)     // prints 1, 2, 3
}

for (let [value, key] of itany({a: 1, b: 2, c: 3})) {
    console.log(`${key}:${value}`)    // prints a:1 b:2 c:3
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
    console.log(value, key, passedValue, type)
}
```

This will print below:
```
1 a undefined 4
2 b undefined 4
3 c undefined 4
```

- First index (`value`) is the final value of iterable.

- Second index (`key`) is the key, index or unique value. Beware that although *itany* pass you an incremental keys for forexample Sets, this doesn't mean Sets have order. This order theorically can be changed next time you call itany and iterate over it. But I found it handy to have a unique key always passed back.

- Third index (`passedValue`) is whatever method `next()` is being called with. Here since we're using `for (... of ...)` this value is undefined, but if you get the native iterator using `const iterator = itany(target)[Symbol.iterator]()`, when calling the next method with a parameter, `passedValue` would be that parameter.

- Fourth index (`type`) is *itany* type. For example here *4* means LISTS. If you're using TypeScript this is `TargetType.LIST`.

## Targets

### Array

Array targets in *itany* are considers Lists.

The key for each item when iterator over arrays is an index of that item.

Type for Array is `TargetType.LIST`.

```javascript
for (let [value, index] of itany([10, 11, 12])) {
    console.log(value, index)
}

/* Prints:
    10 0
    11 1
    12 2
*/
```

### String

String targets in *itany* are considers Lists.

The key for each item when iterator over a String is an index of the character.

Type for String is `TargetType.LIST`.

```javascript
for (let [value, index] of itany("Sam")) {
    console.log(value, index)
}

/* Prints:
    S 0
    a 1
    m 2
*/
```

### Object

Object targets in *itany* are considers Maps.

The key for each item when iterator over objects is the property name on that object and value is the value for that property.

Keep in mind that, everytime you iterate over an object, the order of values showing up can theorically changes.

Type for Object is `TargetType.MAP`.

```javascript
for (let [value, key] of itany({a: 1, b: 2, c: 3})) {
    console.log(value, key)
}

/* Prints:
    1 a
    2 b
    3 c
*/
```

### Map

The key for each item when iterator over Map is the key on that Map and value is the value for that key.

Keep in mind that, everytime you iterate over a Map, the order of items showing up can theorically changes.

Type for Map is `TargetType.MAP`.

```javascript
const map = new Map();
map.set('a', 10)
map.set('b', 11)

for (let [value, key] of itany(map)) {
    console.log(value, key)
}

/* Prints:
    10 a
    11 b
*/
```

### Set

Keys when iterating Sets are unique incremental indexes start from 0, but this is only for convenience since Set items don't have any order and this should'nt be confused with indexes.

Keep in mind that, everytime you iterate over a Set, the order of items showing up can theorically changes.

Type for Set is `TargetType.SET`.

```javascript
const map = new Set();
map.add(10)
map.add(11)

for (let [value] of itany(map)) {
    console.log(value)
}

/* Prints:
    10
    11
*/
```

### Native Iterators

Keys when iterating over JavaScript native Itarators are unique incremental indexes start from 0 in order of the values show up.

Type for Set is `TargetType.ITERATOR`.

```javascript
const map = new Map();
map.set('a', 10)
map.set('b', 11)
const iterator = map.values()

for (let [value, key] of itany(iterator)) {
    console.log(value, key)
}

/* Prints:
    10 0
    11 1
*/
```

### *null*, *undefined*, *NaN*, *number*, *bigint*, *boolean*, *Regex*, *WeakMap*, *WeakSet*, *Promise* and *Function*

These are targets which *itany* considers Scalar. These are: *null*, *undefined*, *NaN*, *number*, *bigint*, *boolean*, *Regex*, *WeakMap*, *WeakSet*, *Promise* and *Function*.

These targets will always have one value when iterate over and the key for that item would be *0*.

Type for Scalars is `TargetType.SCALAR`.

```javascript
for (let [value] of itany(12)) {
    console.log(value)
}

/* Prints:
    12
*/
```

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

If you are using iterate-anything with TypeScript, you need to add `--downlevelIteration` switch to tsc.

```bash
tsc index.tsc --downlevelIteration
```

## Get native Iterator
```javascript
import { itany } from 'iterate-anything'

const iterator = itany([1, 2, 3])[Symbol.iterator]()

const { value: [value1], done: done1 } = iterator.next()   // value: 1         done: false 
const { value: [value2], done: done2 } = iterator.next()   // value: 2         done: false
const { value: [value3], done: done3 } = iterator.next()   // value: 3         done: false
const { value: [value4], done: done4 } = iterator.next()   // value: undefined  done: true
```
