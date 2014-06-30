/* adler32-umd | https://github.com/hajimes/adler32-umd |
 Copyright (c) 2014 Hajime Senuma | MIT License */

/* global module, exports */

// UMD returnExports style wrapper
// See https://github.com/umdjs/umd/blob/master/returnExports.js
(function(root, factory) {
  'use strict';

  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.adler32 = factory();
  }
}(this, /** @lends */ function() {
  'use strict';

  /**
   * The largest prime smaller than 65536.
   *
   * @constant
   * @type {number}
   */
  var BASE = 65521;

  /**
   * The maximum block size when reading a buffer,
   * chosen so that it prevents the overflow of `s2`,
   * an unsigned integer variable in RFC 1950, §9.
   *
   * Concretely, given a bit-size SIZE (typically 31 or 32),
   * this is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^SIZE-1.
   * The left side of the inequation is the arithmetic series of an AP
   * which nth term is given by (BASE-1) + (2^8-1)(n-1).
   *
   * @constant
   * @type {number}
   */
  var NMAX = 3854; // assuming "signed" 32-bit int (thus 31 for positives)
  //var NMAX = 5552; // assuming "unsigned" 32-bit int

  /**
   * Returns the Adler-32 checksum value.
   *
   * Usage:
   * ```javascript
   * var buffer = [0, 1, 2, 3, 4];
   *
   * // simple 
   * console.log(adler32(buffer));
   *
   * // progressively
   * var checksum = adler32();
   * for (var i = 0; i < buffer.length; i++) {
   *   checksum = adler32(buffer.slice(i, i + 1), checksum);
   * }
   * console.log(checksum);
   * ```
   *
   * The first argument `buffer` can be any Array-like object
   * each of which element is an integer in the range [0, 255].
   * If an element violates the range condition,
   * the behavior of this function is unspecified.
   * If `buffer` is `undefined`,
   * the result value is the same as one when an empty buffer is given.
   *
   * The second argument is an optional checksum value to be updated,
   * which is useful for calculating the checksum of a byte stream
   * progressively.
   *
   * @param {byte[]|Uint8Array|Buffer} [buffer] - byte buffer
   * @param {number} [checksum=1] - previously calculated checksum
   * @return {number} Adler-32 checksum value
   */
  function adler32(buffer, checksum) {
    var n, s1, s2, len;
    var pos = 0;

    if (buffer === undefined) {
      return 1;
    }

    len = buffer.length;
    checksum = (checksum === undefined) ? 1 : checksum;

    s1 = checksum & 0xFFFF;
    s2 = (checksum >>> 16) & 0xFFFF;

    // The original zlib has a bunch of branches here
    // to optimize performance for short buffers,
    // but in JavaScript we prefer shorter code.

    while (pos < len) {
      // Reading up to NMAX bytes at once
      for (n = Math.min(NMAX, len - pos); n > 0; n--) {
        s1 += buffer[pos];
        s2 += s1;
        pos++;
      }

      // lazy modulo ops; addition modulo n is associative
      s1 %= BASE;
      s2 %= BASE;
    }

    return (s2 << 16) | s1;
  }

  return adler32;
}));
