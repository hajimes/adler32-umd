/* global describe, it */
describe('adler32-umd:', function() {
  'use strict';
  var adler32 = require('../');
  require('should');

  it('should return 1 (the same value as initial checksum' +
      'for an empty array) if the input buffer is undefined', function() {
    adler32().should.equal(1);
  });

  describe('fixtures:', function() {
    it('adler32([]) should return 1', function() {
      adler32([]).should.equal(1);
    });
  
    it('adler32([98, 97, 114]) should return 39649590', function() {
      adler32([98, 97, 114]).should.equal(39649590);
    });
  
    it('adler32([98, 97, 114] * 5000) should return 2123273346', function() {
      var i = 0;
      var seed = [98, 97, 114];
      var buf = [];
      for (i = 0; i < 5000; i++) {
        buf = buf.concat(seed);
      }
  
      adler32(buf).should.equal(2123273346);
    });

    it('adler32([98, 97, 114] * 4999, adler32([98, 97, 114]))' +
        ' should return 2123273346', function() {
      var i = 0;
      var seed = [98, 97, 114];
      var buf = [];
      for (i = 0; i < 4999; i++) {
        buf = buf.concat(seed);
      }

      adler32(buf, 39649590).should.equal(2123273346);
    });
  });
});
