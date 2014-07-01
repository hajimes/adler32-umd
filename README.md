# adler32-umd
[![Build Status](https://travis-ci.org/hajimes/adler32-umd.svg?branch=master)]
(http://travis-ci.org/hajimes/adler32-umd)
[![Coverage Status]
(http://img.shields.io/coveralls/hajimes/adler32-umd.svg)]
(http://coveralls.io/r/hajimes/adler32-umd)
[![devDependency Status]
(https://david-dm.org/hajimes/adler32-umd/dev-status.svg)]
(https://david-dm.org/hajimes/adler32-umd#info=devDependencies)

adler32-umd is a pure-JavaScript UMD implementation of
[the Adler-32 checksum algorithm](https://en.wikipedia.org/wiki/Adler-32).
This library utilizes the [UMD pattern](https://github.com/umdjs/umd)
so that it works in [Node.js](http://nodejs.org/),
[AMD](http://requirejs.org/docs/whyamd.html), and browser globals.

## Installation
### Downloading
For Node.js,
```bash
npm install git://github.com/hajimes/adler32-umd.git
```

For client-side,
```bash
bower install git://github.com/hajimes/adler32-umd.git
```

### Loading
For Node.js,
```javascript
var adler32 = require('adler32-umd');
```

For AMD,
```javascript
require.config({
  paths: {
    adler32: 'path/to/adler32-umd'
  }
});

require(['adler32'], function(adler32) {
  /* ... */
});
```

In a brower,
```html
<!-- The following snippet publishes a global function adler32 -->
<script src="path/to/adler32-umd/adler32-umd.min.js"></script>
```

## API
adler32(\[buffer\], \[checksum=1\])
-----------------------------------
Returns the Adler-32 checksum value.

Usage:
```javascript
var buffer = [0, 1, 2, 3, 4];

// simple
console.log(adler32(buffer));

// progressively
var checksum = adler32();
for (var i = 0; i < buffer.length; i++) {
  checksum = adler32(buffer.slice(i, i + 1), checksum);
}
console.log(checksum);
```

The first argument `buffer` can be any Array-like object
(e.g., built-in arrays, typed arrays in modern browers,
and `Buffer` in Node.js)
each of which element is an integer in the range of [0, 255].
If an element violates the range condition,
the behavior of this function is unspecified.
If `buffer` is `undefined`,
the result value is the same as one when an empty buffer is given.

The second argument is an optional checksum value to be updated,
which is useful for calculating the checksum of a byte stream
progressively.



**Parameters**

**[buffer]**:  *byte[]|Uint8Array|Buffer*,  - byte buffer

**[checksum=1]**:  *number*,  - previously calculated checksum

**Returns**

*number*,  Adler-32 checksum value



## Other Pure-JavaScript Adler-32 Implementations
- https://github.com/BlueJeansAndRain/adler32 -
  with support for rolling checksums
- https://github.com/SheetJS/js-adler32 -
  with support for standard and binary string inputs

## See Also
- [RFC 1950: ZLIB Compressed Data Format Specification version 3.3]
  (http://tools.ietf.org/html/rfc1950)
- [zlib](http://www.zlib.net/)

## License
Copyright (c) 2014 Hajime Senuma <hajime.senuma@gmail.com>
under the MIT License.
