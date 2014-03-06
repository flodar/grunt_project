module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
     watch: {

      livereload: {
        files: ['*.html', '*.php', '_/js/*.{js,json}', '_/css/*.css','_/img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
            livereload: true
        }
      },//livereload

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
        files: ['_/img/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
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
      
      options:{
        cache:false
      },

      png: {
        options: {
            optimizationLevel: 7
        },
        files: [
            {
                expand: true,
                cwd: '_/img/',
                src: ['*.png'],
                dest: '_/img/opt/',
                ext: '.png'
            }
        ]
      },

      jpg: {
        options: {
            progressive: true
        },
        files: [
            {
                expand: true,
                cwd: '_/img/',
                src: ['*.jpg'],
                dest: '_/img/opt/',
                ext: '.jpg'
            }
        ]
      }

    },//imagemin


    autoprefixer: {
      options:{
        browsers: ['last 2 version','ie 9']
      },
      single_file: {
        src: '_/css/style.css'
      }

    } //autoprefixer

  

  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  

  grunt.registerTask('default', ['watch']);

};