'use strict';

var paths = {
    js: ['*.js', 'site/*.js', 'js/*.js'],
    html: ['views/*.ejs']
};

module.exports = function(grunt) {

    if (process.env.NODE_ENV !== 'production') {
        require('time-grunt')(grunt);
    }

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // assets: grunt.file.readJSON('config/assets.json'),
        // clean: ['bower_components/build'],
        watch: {
            js: {
                files: paths.js,
                options: {
                    livereload: true,
                    delay: 550,
                }
            },
            html: {
                files: paths.html,
                options: {
                    livereload: true,
                    delay: 550,
                }
            },
            // styles: {
            //     files: ['packages/system/public/assets/css/*.less'], // which files to watch
            //     tasks: ['less'],
            //     options: {
            //         nospawn: true,
            //         livereload: true
            //     }
            // }
        },
        uglify: {
            core: {
                options: {
                    mangle: false
                },
                files: '<%= assets.core.js %>'
            }
        },
        cssmin: {
            core: {
                options: {
                    keepSpecialComments: '*'
                },
                files: '<%= assets.core.css %>'
            }
        },
        less: {
            production: {
                options: {
                    options: {
                        cleancss: true,
                        optimization: 2
                    },

                },
                files: {
                    'packages/system/public/assets/css/common.css': 'packages/system/public/assets/css/common.less'
                }
            }
        },
        forever: {
            evne: {
                options: {
                    index: 'index.js',
                    logDir: 'logs'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    args: [],
                    ignore: ['node_modules/**'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
    });

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-forever');

    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['clean', 'less', 'cssmin', 'uglify']);
    } else {
        grunt.registerTask('default', ['concurrent']);
    }

    grunt.registerTask('build', ['clean', 'less', 'cssmin', 'uglify']);



    // For Heroku users only.
    // Docs: https://github.com/linnovate/mean/wiki/Deploying-on-Heroku
    // grunt.registerTask('heroku:production', ['cssmin', 'uglify']);
};
