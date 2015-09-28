//----------------------------------------------------------------------------------------------------------------------
// Qniform Gruntfile
//----------------------------------------------------------------------------------------------------------------------

module.exports = function(grunt)
{
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    alias: {
                        'vue': './vendor/vue/dist/vue.js',
                        'jquery': './vendor/jquery/dist/jquery.js'
                    },
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
                    includePaths: ['vendor/bootstrap/scss', 'client/scss'],
                    style: 'expanded'
                },
                files: {
                    'dist/css/app.css': 'client/scss/theme.scss',
                }
            }
        },
        clean: ['dist'],
        copy: {
            index: {
                src: 'client/index.html',
                dest: 'dist/index.html'
            }
        },
        watch: {
            index: {
                files: ["client/index.html"],
                tasks: ["copy:index"]
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
