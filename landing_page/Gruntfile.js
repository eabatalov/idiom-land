module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');

    var jsFiles = [
        /* Modernizer and IE specyfic files */
        '<%= dirs.js %>modernizr.custom.js',
        '<%= dirs.js %>jquery-2.0.3.min.js',
        '<%= dirs.js %>jquery.easing.min.js',
        '<%= dirs.js %>jquery.form.js',
        '<%= dirs.js %>main.js',
        //'<%= dirs.js %>retina.js',
        '<%= dirs.js %>waypoints.min.js',
        '<%= dirs.js %>owl.carousel.min.js',
        '<%= dirs.js %>nivo-lightbox.min.js',
        '<%= dirs.js %>nicescroll.js',
        '<%= dirs.share %>share.js'
    ];
    var cssFiles = [
        '<%= dirs.css %>bootstrap.css',
        '<%= dirs.css %>style.css',
        '<%= dirs.css %>animate.css',
        '<%= dirs.css %>owl.carousel.css',
        '<%= dirs.css %>owl.theme.css',
        //'<%= dirs.css %>nivo-lightbox.css',
        //'<%= dirs.css %>nivo_lightbox_themes/default/default.css',
        '<%= dirs.css %>colors.css',
        '<%= dirs.css %>responsive.css',
        '<%= dirs.share %>share.css'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            css: 'css/',
            js: 'js/',
            fonts : 'css/fonts/',
            share: 'share/',
            out : {
                fonts : 'public/'
            }
        },

        files : {
            css : cssFiles,
            js : jsFiles,
            out : {
                css: 'public/css.min.css',
                js: 'public/js.min.js'
            }
        },

        concat: {
            js: {
                src: '<%= files.js %>',
                dest: '<%= files.out.js %>',
            },
            css: {
                src: '<%= files.css %>',
                dest: '<%= files.out.css %>',
            },
        }
    });

    grunt.registerTask('default', ['concat', 'build-fonts', 'build-images']);
    /*grunt.registerTask('default', ['build-js', 'build-css', 'build-fonts']);
    grunt.registerTask('build-js', buildJS.bind(null, grunt));
    grunt.registerTask('build-css', buildCSS.bind(null, grunt));*/
    grunt.registerTask('build-fonts', buildFonts.bind(null, grunt));
    //grunt.registerTask('build-images', buildImages.bind(null, grunt));
};

function buildJS(grunt) {
   var compressor = require('node-minify');

    // Using YUI Compressor for JS
    new compressor.minify({
        //type: 'yui-js',
        type: 'no-compress',
        fileIn: grunt.config.get('files.js'),
        fileOut: grunt.config.get('files.out.js'),
        tempPath: '/tmp/',
        options: ['--nomunge', '--preserve-semi', '--disable-optimizations'],
        callback: function(err, min){
            console.error(err);
            console.error(min);
        },
        buffer: 60 * 1024 * 1024
    });
}

function buildCSS(grunt) {
    var compressor = require('node-minify');

    // Using YUI Compressor for CSS
    new compressor.minify({
        //type: 'yui-css',
        type: 'no-compress',
        fileIn: grunt.config.get('files.css'),
        fileOut: grunt.config.get('files.out.css'),
        tempPath: '/tmp/',
        callback: function(err, min){
            console.log(err);
            console.log(min);
        },
        buffer: 60 * 1024 * 1024
    });
}

function buildFonts(grunt) {
    var sh = require('execSync');
    sh.exec('cp -r ' + grunt.config.get('dirs.fonts') + ' '
        + grunt.config.get('dirs.out.fonts'));
}

function buildImages(grunt) {
    var sh = require('execSync');
    sh.exec('cp -r css/nivo_lightbox_themes/default/* ./public');
}
