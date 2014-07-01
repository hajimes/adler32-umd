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
@@include('../dox/main.md')

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
