let gulp        = require('gulp');
let babel       = require('gulp-babel');
let compass     = require('gulp-compass');
let concat      = require('gulp-concat');
let del         = require('del');
let minifyCss   = require('gulp-csso');
let postcss     = require('gulp-postcss');
let pump        = require('pump');
let uglifyJs    = require('gulp-uglify');

gulp.task('jsClean', function(cb) {
    return del(['public/assets/js/app.js'], cb);
});

gulp.task('js', ['jsClean'], function(cb) {
    pump([
        gulp.src(['assets/js/**/*.js', '!assets/js/**/_*.js']),
        babel({ presets: ['env'] }),
        concat('app.js'),
        uglifyJs(),
        gulp.dest('public/assets/js')
    ], cb);
});

gulp.task('jsWatch', function() {
    gulp.watch(['assets/js/**/*.js', '!assets/js/**/_*.js'], ['js']);
});

gulp.task('css', function(cb) {
    pump([
        gulp.src('assets/scss/**/*.scss'),
        compass({
            config_file:    './config.rb',
            css:            'public/assets/css',
            sass:           'assets/scss'
        }),
        postcss([require('autoprefixer')]),
        minifyCss(),
        gulp.dest('public/assets/css')
    ], cb);
});

gulp.task('cssWatch', function() {
    gulp.watch('assets/scss/**/*.scss', ['css']);
});

gulp.task('watch', ['jsWatch', 'cssWatch']);

gulp.task('default', ['js', 'css']);