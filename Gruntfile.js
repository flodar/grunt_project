module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
     watch: {

      // livereload: {
      //   files: ['*.html', '*.php', '_/js/*.{js,json}', '_/css/*.css','_/img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
      //   options: {
      //       livereload: true
      //   }
      // },//livereload

      scss: {
        files: '_/components/scss/**/*.scss',
        tasks: ['compass','autoprefixer']
      },//scss

      scripts: {
        files: ['_/components/js/*.js'],
        tasks: ['uglify'],
        options: {
            spawn: false,
        }
      },//scripts

      images: {
        files: ['_/components/img/*.{png,jpg,gif}'],
        tasks: ['newer:imagemin'],
        options: {
              spawn: false,
        }
      }//images
    
    },// watch


    uglify: {
      my_target: {
        files: {
          '_/js/scripts.min.js': ['_/components/js/vendor/*.js','!_/components/js/vendor/modernizr-2.6.2.min.js','_/components/js/scripts.js']
        }
      }//my_target
    
    },//uglify
  
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sourcemap: true
        }
      }//dist
    
    },//compass

    imagemin: {
      
      main: {
        files: [{
          expand: true,
          cwd: '_/components/img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '_/img/'
        }]
      }

    },//imagemin


    autoprefixer: {
      options:{
        browsers: ['last 2 version','ie 9']
      },
      single_file: {
        src: '_/css/style.css'
      }

    }, //autoprefixer



    browserSync: {
      dev: {
          bsFiles: {
              src : [
                    '_/css/*.css',
                    '_/img/**/*.jpg',
                    '_/img/**/*.png',
                    '_/img/**/*.svg',
                    '_/js/**/*.js',
                    '**/*.php',
                    '**/*.html'
                ]
          },
          options: {
              watchTask: true,
              debugInfo: true,
              logConnections: true,
              notify: true,
              proxy: "framework.dev:8888",
              ghostMode: {
                scroll: true,
                links: true,
                forms: true
              }

          }
      }
    } // browserSync
  
});
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  

  grunt.registerTask('default', ["browserSync", "watch"]);

};