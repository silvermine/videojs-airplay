/*
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    join = path.join.bind(path);

module.exports = function(grunt) {

   var DEBUG = !!grunt.option('debug'),
       config;

   config = {
      js: {
         all: [ 'Gruntfile.js', 'src/**/*.js', 'tests/**/*.js' ],
      },

      sass: {
         all: [ '**/*.scss', '!**/node_modules/**/*' ],
         main: join('src', 'scss', 'videojs-airplay.scss'),
      },

      images: {
         base: join('src', 'images'),
      },

      dist: {
         base: join(__dirname, 'dist'),
      },
   };

   config.dist.css = {
      base: config.dist.base,
      main: join(config.dist.base, '<%= pkg.name %>.css'),
   };

   config.dist.images = join(config.dist.base, 'images');

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),
      config: config,

      clean: {
         build: [ config.dist.base ],
      },

      copy: {
         images: {
            files: [
               {
                  expand: true,
                  cwd: config.images.base,
                  src: '**/*',
                  dest: config.dist.images,
               },
            ],
         },
      },

      eslint: {
         target: config.js.all,
      },

      sasslint: {
         options: {
            configFile: join(__dirname, 'node_modules', 'sass-lint-config-silvermine', 'sass-lint.yml'),
         },
         target: config.sass.all,
      },

      sass: {
         main: {
            files: [
               {
                  src: config.sass.main,
                  dest: config.dist.css.main,
                  ext: '.css',
                  extDot: 'first',
               },
            ],
         },
         options: {
            sourceMap: DEBUG,
            indentWidth: 3,
            outputStyle: DEBUG ? 'expanded' : 'compressed',
            sourceComments: DEBUG,
         },
      },

      postcss: {
         options: {
            map: DEBUG,
            processors: [
               require('autoprefixer')({ browsers: '> .05%' }), // eslint-disable-line global-require
            ],
         },
         styles: {
            src: config.dist.css.main,
         },
      },

   });

   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-eslint');
   grunt.loadNpmTasks('grunt-sass');
   grunt.loadNpmTasks('grunt-postcss');
   grunt.loadNpmTasks('grunt-sass-lint');

   grunt.registerTask('standards', [ 'eslint', 'sasslint' ]);
   grunt.registerTask('build-css', [ 'sass', 'postcss:styles' ]);
   grunt.registerTask('build', [ 'build-css', 'copy:images' ]);
   grunt.registerTask('default', [ 'standards' ]);

};
