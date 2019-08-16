const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const { series, parallel } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');

const scssFiles = [
    './node_modules/node-normalize-scss/_normalize.scss',
    'src/scss/**/*.scss'
]

function styles(){
    return gulp
            .src(scssFiles)
            .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(cleanCSS({level:2}))
            .pipe(autoprefixer({
                overridingBrowserlist: ['0.1%'],
                cascade: false
            }))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
}

function images(){
    return gulp.src('src/img/**/*.png')
    .pipe(imagemin([imagemin.optipng({optimizationLevel: 5})]))
    .pipe(gulp.dest('dist/img'));
};

function scripts(){
    return gulp
            .src('scr/js/**/*.js')
            .pipe(concat('index.js'))
            .pipe(uglify({
                toplevel: true
            }))
            .pipe(gulp.dest('dist/js/'))
            .pipe(browserSync.stream());
};

function clean(){
    return del(['dist/*']);
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/img/**/*.png', images);
    gulp.watch('src/style/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('*.html', browserSync.reload);
};

gulp.task('styles', styles);
gulp.task('images', images);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('default', gulp.series('watch'));
gulp.task('build', gulp.series(clean, 'styles', 'scripts', 'images'));
gulp.task('dev', gulp.series('build', 'watch'));