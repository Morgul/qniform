//----------------------------------------------------------------------------------------------------------------------
// Qniform Gruntfile
//----------------------------------------------------------------------------------------------------------------------

module.exports = function(grunt)
{
    grunt.initConfig({
        clean: ['dist'],
        copy: {
            index: {
                src: 'client/index.html',
                dest: 'dist/index.html'
            },
            html: {
                expand: true,
                cwd: 'client',
                src: '**/*.html',
                dest: 'dist'
            },
            vendor: {
                expand: true,
                src: ['vendor/**/*.js', 'vendor/font-awesome/**/*'],
                dest: 'dist'
            }
        },
        browserify: {
            options: {
                transform: [ ["vueify"], ["babelify"] ]
            },
            debug: {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: {
                    "./dist/qniform.js": "client/app.js"
                }
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths: ['vendor/bootstrap/scss', 'client/scss', 'client'],
                    style: 'expanded'
                },
                files: {
                    'dist/css/app.css': 'client/scss/theme.scss'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                ]
            },
            dist: {
                src: 'dist/css/*.css'
            }
        },
        watch: {
            index: {
                files: ["client/index.html"],
                tasks: ["copy:index"]
            },
            html: {
                files: ["client/**/*.html"],
                tasks: ["copy:html"]
            },
            scss: {
                files: ["client/scss/**/*.scss"],
                tasks: ["sass", "postcss"]
            },
            scripts: {
                files: ["client/**/*.js", 'client/**/*.vue', "client/components/**/*.scss", "client/pages/**/*.scss"],
                tasks: ["browserify"]
            }
        }
    });

    //------------------------------------------------------------------------------------------------------------------

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //------------------------------------------------------------------------------------------------------------------

    grunt.registerTask("build", ["clean", "sass", "postcss", "copy", "browserify"]);
    grunt.registerTask("default", ["build", 'watch']);

    //------------------------------------------------------------------------------------------------------------------
};

//----------------------------------------------------------------------------------------------------------------------
