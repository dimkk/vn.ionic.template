var gulp = require('gulp');
var paths = require('./paths');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');
var streamqueue = require('streamqueue');
var angularFilesort = require('gulp-angular-filesort');

// Build JavaScript
gulp.task('build:files', function () {
   /* var vendorJS = gulp.src([paths.js.sources.bower])
            .pipe(angularFilesort());
    var appJS = gulp.src([paths.js.sources.debug]);
*/
    var streamJS = streamqueue({ objectMode: true },
            gulp.src([paths.js.sources.bower]).pipe(angularFilesort()),
            gulp.src([paths.js.sources.debug])
            )
            .pipe(plugins.concat(paths.js.path.release + 'app.min.js'))
            //.pipe(plugins.uglify())
            .pipe(gulp.dest(paths.root));

            /* gulp.src([paths.js.sources.bower, paths.js.sources.debug])
            .pipe(plugins.concat(paths.js.path.release + 'app.min.js'))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(paths.root));*/

    var streamCSS = gulp.src([paths.css.sources.debug, paths.css.bower])
            .pipe(plugins.concat(paths.css.path.release + 'app.min.css'))
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest(paths.root));

    return gulp.src(paths.index.source)
    .pipe(plugins.inject(es.merge(streamJS, streamCSS),
        { read: false, addRootSlash: false, relative: true, name:'rls'}))
    .pipe(gulp.dest(paths.index.path))
});

// Move templates and minify
gulp.task('build:html', function () {
    return gulp.src(paths.templates.sources)
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest(paths.templates.path.release));
});

gulp.task('build:i18n', function () {
    return gulp.src(paths.i18n.sources)
        .pipe(gulp.dest(paths.i18n.path.release));
});

//Clean dev injections
gulp.task('build:cleandevinject', function () {
    return gulp.src(paths.index.source)
        .pipe(plugins.inject(
            gulp.src([]),
                    { read: false, addRootSlash: false, relative: true, name:'injcss' }))
        .pipe(plugins.inject(
            gulp.src([]),
                    { addRootSlash: false, relative: true, name:'vendor' }))
        .pipe(plugins.inject(
            gulp.src([]),
                    { read: false, addRootSlash: false, relative: true, name:'injjs'}))
        .pipe(gulp.dest(paths.index.path));
});

// Build Clean
gulp.task('build:clean', function () {
    return gulp.src([paths.js.sources.debug,  paths.css.sources.debug], { read: false })
        .pipe(plugins.clean({ force: true }));
});