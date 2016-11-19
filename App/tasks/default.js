var gulp = require('gulp');
var paths = require('./paths');
var plugins = require('gulp-load-plugins')();
var angularFilesort = require('gulp-angular-filesort');
var tsProject;

// Compile Sass
gulp.task('default:scss', function () {
    return gulp.src(paths.scss.sources)
            .pipe(plugins.sass())
            .pipe(plugins.autoprefixer({
            browsers: ['last 2 version', 'android 4']
        }))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(paths.css.path.debug));
});

// Compile Sass
gulp.task('default:css', function () {
    return gulp.src(paths.css.bower + '/**/*.css')
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(paths.css.path.debug));
});

// Compile Typescript with tests
gulp.task('default:ts:test', function () {
    tsProject = plugins.typescript.createProject(paths.ts.tsconfig, {sortOutput: true});
    return tsProject.src()
        .pipe(plugins.typescript(tsProject))
        .pipe(plugins.ngAnnotate())
        .pipe(gulp.dest(paths.root));
});

// Compile Typescript without tests
gulp.task('default:ts', function () {
    tsProject = plugins.typescript.createProject(paths.ts.tsNoTestConfig, {sortOutput: true});
    return tsProject.src()
        .pipe(plugins.typescript(tsProject))
        .pipe(plugins.ngAnnotate())
        .pipe(gulp.dest(paths.root));
});

// Move templates and minify
gulp.task('default:html', function () {
    return gulp.src(paths.templates.sources)
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest(paths.templates.path.debug));
});

// Move templates and minify
gulp.task('default:i18n', function () {
    return gulp.src(paths.i18n.sources)
        .pipe(gulp.dest(paths.i18n.path.debug));
});

// Inject files into index
gulp.task('default:inject', function () {
    return gulp.src(paths.index.source)
        .pipe(plugins.inject(
            gulp.src([paths.css.sources.debug, paths.css.bower]),
                    { read: false, addRootSlash: false, relative: true, name:'injcss' }))
        .pipe(plugins.inject(
            gulp.src(paths.js.sources.bower).pipe(angularFilesort()),
                    { addRootSlash: false, relative: true, name:'vendor' }))
        .pipe(plugins.inject(
            gulp.src([paths.js.sources.debug]),
                    { read: false, addRootSlash: false, relative: true, name:'injjs'}))
        .pipe(gulp.dest(paths.index.path));
});

// Default Clean
gulp.task('default:clean', function () {
    return gulp.src([paths.templates.path.release, paths.js.sources.release, paths.css.sources.release], { read: false })
        .pipe(plugins.clean({ force: true }));
});

var fs = require('fs');
var replace = require('gulp-replace');

 gulp.task('ioconfig', function () {
    var src = paths.js.sources.ionicio;
    var ioconfig = fs.readFileSync(".io-config.json", "utf8");
    console.log(ioconfig);
    var start = '"IONIC_SETTINGS_STRING_START";var settings =';
    var end =  '; return { get: function(setting) { if (settings[setting]) { return settings[setting]; } return null; } };"IONIC_SETTINGS_STRING_END"';
    var replaceBy = start + ioconfig + end;

    console.log('inject .io-config in ionic.io.bundle.js');
    gulp.src(src)
    .pipe(replace(/"IONIC_SETTINGS_STRING_START.*IONIC_SETTINGS_STRING_END"/, replaceBy))
    .pipe(gulp.dest(paths.js.sources.ioniciofolder));
});
