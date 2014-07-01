/* global module */
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['doc', 'dox', 'coverage', 'adler32-umd.min.js'],
    includereplace: {
      readme: {
        options: {
          processIncludeContents: function(src) {
            // for indentation; just an ad-hoc solution
            return src.replace(/^(checksum = adler32)/mg, '  $1');
          },
        },
        src: './README.md',
        dest: './',
        expand: true,
        cwd: './template/'
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
        command: 'jsdox --output dox main.js'
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
    },
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-shell');

  // Default tasks
  grunt.registerTask('minify', ['test', 'uglify:main']);
  grunt.registerTask('test', ['jshint', 'shell:istanbul']);
  // Generate README.md
  grunt.registerTask('readme', ['shell:jsdox', 'includereplace:readme']);
  // Run this task before push
  grunt.registerTask('prepublish', ['minify', 'readme']);
};
