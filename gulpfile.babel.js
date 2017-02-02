const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const del = require('del');
const eslint = require('gulp-eslint');
const fs = require('fs');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const pagespeed = require('psi').output;
const path = require('path');
const realFavicon = require('gulp-real-favicon');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const size = require('gulp-size');
const swPrecache = require('sw-precache');
const uglify = require('gulp-uglify');

const AUTOPREFIXER_BROWSERS = ['last 2 versions', '> 1%'];
const FAVICON_DATA_FILE = 'config/favicons.json';

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
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code,
      ),
    )
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

gulp.task('generate-favicon', (done) => {
  realFavicon.generateFavicon({
    masterPicture: 'static/images/logo.png',
    dest: 'static/icons',
    iconsPath: '/icons/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '42%',
        assets: {
          ios6AndPriorIcons: true,
          ios7AndLaterIcons: true,
          precomposedIcons: false,
          declareOnlyDefaultIcon: false,
        },
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#00aba9',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: true,
          windows10Ie11EdgeTiles: {
            small: true,
            medium: true,
            big: true,
            rectangle: true,
          },
        },
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#ffffff',
        manifest: {
          name: 'av.community',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true,
        },
        assets: {
          legacyIcon: true,
          lowResolutionIcons: true,
        },
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5',
      },
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
    },
    markupFile: FAVICON_DATA_FILE,
  }, () => {
    done();
  });
});

gulp.task('check-for-favicon-update', (done) => {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, (err) => {
    if (err) {
      throw err;
    }
    done();
  });
});
