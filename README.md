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

for ([value] of itany(1)) {
    console.log(value);     // prints 1
}

for ([value] of itany([1, 2, 3])) {
    console.log(value);     // prints 1, 2, 3
}

for ([value, key] of itany({a: 1, b: 2, c: 3})) {
    console.log(`${key}:${value}`);    // prints a:1 b:2 c:3
}
```