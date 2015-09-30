//----------------------------------------------------------------------------------------------------------------------
// Qniform Gruntfile
//----------------------------------------------------------------------------------------------------------------------

module.exports = function(grunt)
{
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify"]
                    ]
                },
                files: {
                    "./dist/qniform.js": ["./client/**/*.js"]
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
                src: ['vendor/**/*.js', 'vendor/font-awesome/**/*', '!vendor/vue/**/*.js'],
                dest: 'dist'
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
                files: ["client/**/*.scss"],
                tasks: ["sass"]
            },
            scripts: {
                files: ["client/**/*.js"],
                tasks: ["browserify"]
            }
        }
    });

    //------------------------------------------------------------------------------------------------------------------

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //------------------------------------------------------------------------------------------------------------------

    grunt.registerTask("build", ["clean", "sass", "copy", "browserify"]);
    grunt.registerTask("default", ["build", 'watch']);

    //------------------------------------------------------------------------------------------------------------------
};

//----------------------------------------------------------------------------------------------------------------------
