(function () {
    
    'use strict';

    module.exports = function(grunt) {
        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
        grunt.initConfig({
            // watch for changes and trigger compass, jshint, uglify and livereload
            watch: {
                compass: {
                    files: ['src/scss/**/*.{scss,sass}'],
                    tasks: ['compass']
                },
                js: {
                    files: '<%= jshint.all %>',
                    tasks: ['jshint', 'uglify']
                },
                livereload: {
                    options: { livereload: true },
                    files: ['css/style.css', 'js/*.js', '*.html', '*.php', 'img/**/*.{png,jpg,jpeg,gif,webp,svg}']
                }
            },
            // compass and scss
            compass: {
                dist: {
                    options: {
                        config: 'config.rb',
                        force: true
                    }
                }
            },
            // javascript linting with jshint
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    "force": true
                },
                all: [
                    'Gruntfile.js',
                    'src/js/app.js'
                ]
            },
            // uglify to concat, minify, and make source maps
            uglify: {
                plugins: {
                    options: {
                        sourceMap: 'js/source-map-plugins.js.map'
                    },
                    files: {
                        'js/plugins.min.js': [
                            'src/js/lib/*.js'
                        ]
                    }
                },
                main: {
                    options: {
                        sourceMap: 'js/source-map-scripts.js.map'
                    },
                    files: {
                        'js/app.min.js' : [
                            'src/js/app.js' // main scripts file
                        ]
                    }
                }
            },
            // image optimization
            imagemin: {
                dist: {
                    options: {
                        optimizationLevel: 7,
                        progressive: true
                    },
                    files: [{
                        expand: true,
                        cwd: 'src/img/',
                        src: '**/*',
                        dest: 'img/'
                    }]
                }
            }
        });
        // register task
        grunt.registerTask('default', ['watch']);
    };
}());