gulp = require('gulp')
path = require("path")
coffee = require('gulp-coffee')
concat = require('gulp-concat')
gutil = require('gulp-util')
uglify = require('gulp-uglify')
sourcemaps = require('gulp-sourcemaps')
source = require('vinyl-source-stream')
buffer = require('vinyl-buffer')

es6transpiler = require('gulp-es6-transpiler')
browserify = require('browserify')

# to use: > node-debug $(which gulp)
# and add debugger statements here.
# https://github.com/node-inspector/node-inspector/issues/348
debug = require('gulp-debug')

# build a js file that matches the current project version number.
# https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
getBundleName = ->
    version = require('../../package.json').version
    name = require('../../package.json').name
    return "#{name}.#{version}.min"

debugger

gulp.task 'bundle', ->
    bundleStream = browserify({
        entries: ["./app.coffee"]
        debug: true
    }).bundle()

    # Add transformation tasks to the pipeline here.
    bundle = ->
        bundleStream
            .pipe(source(getBundleName() + ".js"))
            .pipe(buffer())
            .pipe(debug(verbose: true))
            .pipe(sourcemaps.init(loadMaps: true))
            .pipe(uglify())
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest("./dist/js/"))

    return bundle()


gulp.task 'default', ['bundle'], ->