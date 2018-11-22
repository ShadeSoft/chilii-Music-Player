let gulp        = require('gulp');
let babel       = require('gulp-babel');
let browserify  = require('browserify');
let buffer      = require('vinyl-buffer');
let concat      = require('gulp-concat');
let del         = require('del');
let minifyCss   = require('gulp-csso');
let postcss     = require('gulp-postcss');
let pump        = require('pump');
let sass        = require('gulp-dart-sass');
let source      = require('vinyl-source-stream');
let uglifyJs    = require('gulp-uglify');

gulp.task('jsClean', function(cb) {
    return del(['public/assets/js/app.js'], cb);
});

gulp.task('js', gulp.series('jsClean', function(cb) {
    let b = browserify({
        entries: 'assets/js/main.js',
        debug: false
    })
    .transform('babelify', { presets: ['@babel/env'] })
    .transform('vueify');

    pump([
        b.bundle(),
        source('main.js'),
        buffer(),
        uglifyJs(),
        gulp.dest('public/assets/js')
    ], pump([
        gulp.src(['assets/js/**/*.js', '!assets/js/**/_*.js', '!assets/js/main.js']),
        babel({ presets: ['@babel/env'] }),
        concat('app.js'),
        uglifyJs(),
        gulp.dest('public/assets/js')
    ], cb));
}));

gulp.task('jsWatch', function() {
    gulp.watch(['assets/js/**/*.js', '!assets/js/**/_*.js'], gulp.series('js'));
});

gulp.task('css', function(cb) {
    pump([
        gulp.src('assets/s(a|c)ss/**/*.s(a|c)ss'),
        sass().on('error', sass.logError),
        postcss([require('autoprefixer')]),
        minifyCss(),
        gulp.dest('public/assets/css')
    ], cb);
});

gulp.task('cssWatch', function() {
    gulp.watch('assets/s(a|c)ss/**/*.s(a|c)ss', gulp.series('css'));
});

gulp.task('watch', gulp.parallel('jsWatch', 'cssWatch'));

gulp.task('default', gulp.parallel('js', 'css'));