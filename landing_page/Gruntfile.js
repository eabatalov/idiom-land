module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    var jsFilesToProc = [
        /* Modernizer and IE specyfic files */
        '<%= dirs.in.js %>modernizr.custom.js',
        '<%= dirs.in.js %>jquery-2.0.3.min.js',
        '<%= dirs.in.js %>jquery.easing.1.3.js',
        '<%= dirs.in.js %>jquery.form.js',
        '<%= dirs.in.js %>imagesloaded.pkgd.js',
        //'<%= dirs.in.js %>retina.js',
        '<%= dirs.in.js %>owl.carousel.js',
        '<%= dirs.in.js %>nivo-lightbox.js',
        '<%= dirs.in.js %>nicescroll.js',
        //main should be here because it uses upper scripts
        '<%= dirs.in.js %>main.js',
        '<%= dirs.in.js %>analytics.js',
        '<%= dirs.in.js %>referral.js'
    ];

    var cssFilesToProc = [
        '<%= dirs.in.css %>bootstrap.css',
        '<%= dirs.in.css %>style.css',
        '<%= dirs.in.css %>animate.css',
        '<%= dirs.in.css %>owl.carousel.css',
        '<%= dirs.in.css %>owl.theme.css',
        '<%= dirs.in.css %>nivo-lightbox.css',
        '<%= dirs.in.css %>nivo_lightbox_themes/default/default.css',
        '<%= dirs.in.css %>colors.css',
        '<%= dirs.in.css %>responsive.css',
        '<%= dirs.in.css %>referral.css'
    ];

    /* Don't use dirs.in.dir prefixes from here */
    var filesToCopy = [
        /* Flattened paths */
        { expand: true, flatten: true, src: '<%= dirs.in.dir%>backend/contactus.php', dest: '<%= dirs.out %>' },
        { expand: true, flatten: true, src: '<%= dirs.in.dir%>backend/sendmail.php', dest: '<%= dirs.out %>' },
        { expand: true, flatten: true, src: '<%= dirs.in.dir%>backend/replay_save.php', dest: '<%= dirs.out %>' },
        { expand: true, flatten: true, src: '<%= dirs.in.dir%>favicon.ico', dest: '<%= dirs.out %>' },
        { expand: true, flatten: true, src: '<%= dirs.in.dir%>index.html', dest: '<%= dirs.out %>' },
        { expand: true, flatten: true, src: '<%= dirs.in.dir%>thumbnail.png', dest: '<%= dirs.out %>' },
        { expand: true, flatten: true, src: '<%= dirs.in.dir%>css/nivo_lightbox_themes/default/*.png', dest: '<%= dirs.out %>' },
        { expand: true, flatten: true, src: '<%= dirs.in.dir%>css/nivo_lightbox_themes/default/*.gif', dest: '<%= dirs.out %>' },
        /* Preserve relative paths */
        { expand: true, flatten: false, cwd: '<%= dirs.in.dir %>', src: 'files/**', dest: '<%= dirs.out %>' },
        { expand: true, flatten: false, cwd: '<%= dirs.in.css %>', src: 'fonts/**', dest: '<%= dirs.out %>' },
        { expand: true, flatten: false, cwd: '<%= dirs.in.dir %>', src: 'images/**', dest: '<%= dirs.out %>' }
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            out: 'bin/',
            'in': {
                dir: 'src/',
                css: '<%= dirs.in.dir %>css/',
                js: '<%= dirs.in.dir %>js/'
            }
        },

        files : {
            'in' : {
                css: cssFilesToProc,
                js: jsFilesToProc,
                copy: filesToCopy,
            },
            out : {
                debug: {
                    css: '<%= dirs.out %>css.css',
                    js: '<%= dirs.out %>js.js'
                },
                release: {
                    css: '<%= dirs.out %>css.min.css',
                    js: '<%= dirs.out %>js.min.js'
                }
            }
        },

        clean: {
            main: ['<%= dirs.out %>*', '!<%= dirs.out %>game*/**']
        },

        /* Copy all the files that don't need processing */
        copy: {
            options: {
                mode: true
            },
            main: {
                files: '<%= files.in.copy %>'
            }
        },

        /* Concat 'files to process' first */
        concat: {
            'css-debug': {
                src: '<%= files.in.css %>',
                dest: '<%= files.out.debug.css %>'
            },
            'css-release': {
                src: '<%= files.in.css %>',
                dest: '<%= files.out.release.css %>'
            },
            'js-debug': {
                src: '<%= files.in.js %>',
                dest: '<%= files.out.debug.js %>'
            },
            'js-release': {
                src: '<%= files.in.js %>',
                dest: '<%= files.out.release.js %>'
            }
        },

        /* Minify 'js files to process' then */
        uglify: {
            options : {
                /* Mangling has not trivial configuration
                 * leave it for later (TODO) */
                mangle: false,
                compress: true,
                sourceMap: false,
                preserveComments: false, 
            },
            release: {
                src: '<%= files.out.release.js %>',
                dest: '<%= files.out.release.js %>'
            }
        },

        /* Minify 'css files to process then' */
        cssmin : {
            main : {
                src: '<%= files.out.release.css %>',
                dest: '<%= files.out.release.css %>'
            }
        }
    });

    grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify', 'cssmin']);
};
