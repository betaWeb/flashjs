let gulp = require('gulp')
let sass = require('gulp-sass')
let autoprefixer = require('gulp-autoprefixer')
let browserSync = require('browser-sync').create()

const paths = {
    styles: {
        scss: './stylesheets/app.scss',
        css: './stylesheets/'
    },
    html: './index.html',
    js: './js/**/*.js'
};

gulp.task('sass', () => {
  return gulp.src(paths.styles.scss)
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer({browsers: ['last 2 version']}))
    .pipe(gulp.dest(paths.styles.css))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: { baseDir: './' }
  })
})

gulp.task('watch',['browserSync', 'sass'], () => {
  gulp.watch(paths.styles.scss, ['sass'])
  gulp.watch(paths.html, browserSync.reload); 
  gulp.watch(paths.js, browserSync.reload);
})