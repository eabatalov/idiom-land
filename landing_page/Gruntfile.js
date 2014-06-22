module.exports = function(grunt) {
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
        '<%= dirs.css %>nivo-lightbox.css',
        '<%= dirs.css %>nivo_lightbox_themes/default/default.css',
        '<%= dirs.css %>colors.css',
        '<%= dirs.css %>responsive.css',
        '<%= dirs.share %>share.css'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            css: 'css/',
            js: 'js/',
            share: 'share/'
        },

        files : {
            css : cssFiles,
            js : jsFiles,
            out : {
                css: 'public/css.min.css',
                js: 'public/js.min.js'
            }
        },
    });

    grunt.registerTask('default', ['build-js', 'build-css']);
    grunt.registerTask('build-js', buildJS.bind(null, grunt));
    grunt.registerTask('build-css', buildCSS.bind(null, grunt));
    //console.log(JSON.stringify(grunt.config.get('files')));
};

function buildJS(grunt) {
   var compressor = require('node-minify');

    // Using Google Closure
    new compressor.minify({
        type: 'yui-js',
        fileIn: grunt.config.get('files.js'),
        fileOut: grunt.config.get('files.out.js'),
        tempPath: '/tmp/',
        callback: function(err, min){
            console.error(err);
            console.error(min);
        }
    });
}

function buildCSS(grunt) {
    var compressor = require('node-minify');

    // Using YUI Compressor for CSS
    new compressor.minify({
        type: 'yui-css',
        fileIn: grunt.config.get('files.css'),
        fileOut: grunt.config.get('files.out.css'),
        tempPath: '/tmp/',
        callback: function(err, min){
            console.log(err);
            console.log(min);
        }
    });
}
