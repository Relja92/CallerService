module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat : {
        app:{
            src : ['dev/app/components/call/callController.js','dev/app/components/home/homeController.js', 'dev/app/app.routes.js'],
            dest: 'prod/js/app.js'
        },
        data:{
            src : 'dev/app/data.js',
            dest: 'prod/js/data.js'   
        }
    },
    copy: {
        files: {
            expand: true,
            dest: 'prod/pages/',
            cwd: 'dev/app/components/',
            src: '**/*.html'
          },
        images: {
            expand: true,
            dest: 'prod/img/',
            cwd: 'dev/assets/img/',
            src: '*'
          },
        mustache:{
            expand: true,
            dest: 'prod/js/',
            cwd: 'dev/assets/js/',
            src: 'mustache.js'
        },
        test:{
            expand: true,
            dest: 'prod/js/test',
            cwd: 'dev/app/tests/',
            src: 'routeTest.js'
        }
    },
    cssmin: {
        target: {
            files: [{
                expand: true,
                cwd: 'dev/assets/css',
                src: '*.css',
                dest: 'prod/css',
                ext: '.min.css'
            }]
          }
    },
    watch: {
      js: {
        files: ['dev/app/components/call/callController.js','dev/app/components/home/homeController.js', 'dev/app/app.routes.js','dev/app/data.js'],
        tasks: ['concat'],
      },
      html:{
         files: ['dev/app/components/call/call.html','dev/app/components/home/home.html'],
         tasks: ['copy']
      }
    },

  });
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-cssmin');

}