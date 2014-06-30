/* global module */
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['doc', 'coverage', 'README.md', 'adler32-umd.min.js'],
    concat: {
      readme: {
        src: ['./README.md.head', './doc/main.md', './README.md.tail'],
        dest: 'README.md',
      },
      options: {
        process: function(src) {
          return src.replace(/^(checksum = adler32)/mg, '  $1');
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', './main.js', './test/**/*.js']
    },
    shell: {
      istanbul: {
        command: './node_modules/istanbul/lib/cli.js' +
            ' cover ./node_modules/mocha/bin/_mocha --' +
            ' -R spec test/**/*.js'
      },
      jsdox: {
        command: 'jsdox --output doc main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*adler32-umd, (c) 2014 Hajime Senuma, under MIT*/'
      },
      main: {
        files: {
          'adler32-umd.min.js': ['main.js']
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  // Default tasks
  grunt.registerTask('minify', ['test', 'uglify:main']);
  grunt.registerTask('test', ['jshint', 'shell:istanbul']);
  grunt.registerTask('readme', ['shell:jsdox', 'concat:readme']);
};
