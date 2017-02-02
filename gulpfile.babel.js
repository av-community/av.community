const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const newer = require('gulp-newer');
const pagespeed = require('psi').output;
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const swPrecache = require('sw-precache');
const size = require('gulp-size');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');

const AUTOPREFIXER_BROWSERS = ['last 2 versions', '> 1%'];

gulp.task('hugo', shell.task(['hugo']));
gulp.task('hugo:server', shell.task(['hugo', 'server']));

gulp.task('lint', () =>
  gulp.src(['static/scripts/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('images', () =>
  gulp.src('static/images/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
    })))
    .pipe(size({ title: 'images' }))
    .pipe(gulp.dest('.tmp/images')),
);

gulp.task('styles', () =>
  gulp.src([
    'static/styles/**/*.scss',
    'static/styles/**/*.css',
  ])
    .pipe(newer('.tmp/styles'))
    .pipe(sass({ precision: 10 }).on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(cssnano())
    .pipe(size({ title: 'styles' }))
    .pipe(gulp.dest('.tmp/styles')),
);

gulp.task('scripts', () =>
    gulp.src([
      // Note: Since we are not using useref in the scripts build pipeline,
      //       you need to explicitly list your scripts here in the right order
      //       to be correctly concatenated
      './static/scripts/main.js',
      // Other scripts
    ])
      .pipe(newer('.tmp/scripts'))
      .pipe(babel())
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe(concat('main.min.js'))
      .pipe(uglify({ preserveComments: 'some' }))
      // Output files
      .pipe(size({ title: 'scripts' }))
      .pipe(gulp.dest('.tmp/scripts')),
);

gulp.task('html', () =>
  gulp.src('public/**/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true,
    }))
    .pipe(gulp.dest('public')),
);

gulp.task('clean', () => del(['.tmp', 'public/*', '!public/.git'], { dot: true }));

gulp.task('build', ['clean'], cb =>
  runSequence(
    ['images', 'scripts', 'styles'],
    'hugo',
    ['html'],
    'generate-service-worker',
    cb,
  ),
);

gulp.task('default', cb =>
  runSequence(
    ['images', 'scripts', 'styles'],
    cb,
  ),
);

gulp.task('watch', ['images', 'scripts', 'styles'], (_) => { // eslint-disable-line no-unused-vars
  gulp.watch(['static/styles/**/*.{scss,css}'], ['styles']);
  gulp.watch(['static/scripts/**/*.js'], ['scripts']);
  gulp.watch(['static/images/**/*'], ['images']);
});

gulp.task('pagespeed', cb =>
  pagespeed('av.community', {
    strategy: 'mobile',
  }, cb),
);

gulp.task('copy-sw-scripts', () => gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'static/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('public/scripts/sw')));

gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'public';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: 'av-community',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js',
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`,
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: `${rootDir}/`,
  });
});
