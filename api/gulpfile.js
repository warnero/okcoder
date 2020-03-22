const { src, dest, series, parallel, task } = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const shell = require('gulp-shell');

let jsFiles = [
    'src/app.js',
    'src/bin/www',
    'src/controllers/**/*.js',
    'src/routes/**/*.js',
    'src/services/**/*.js',
    'src/models/**/*.js',
    'src/errors/**/*.js',
    'src/config/**/*.js',
    'src/middleware/**/*.js',
    'src/utils/**/*.js'
];

let jsonFiles = [
    'src/config/**/*.json'
];

let watchFiles = jsFiles.concat(jsonFiles);

function compile() {
    return src(jsFiles, {base:'./src'})
        .pipe(babel({
            "presets": [
                ["@babel/preset-env", {
                    "targets": {
                        "node": "current"
                    }
                }]
            ]
        }))
        .pipe(dest('dist'));
}

function copyToDist() {
    return src(jsonFiles, {base:'./src'})
        .pipe(dest('dist'));
}

function watch(done) {
    let stream = nodemon({
        script: 'dist/bin/www', // run ES5 code
        ext: 'js json',
        ignore: 'dist',
        watch: watchFiles, // watch ES2015 code
        tasks: ['nodemon-compile', 'nodemon-copyToDist'], // compile synchronously onChange
        done: done,
        verbose: true
    });

    return stream;
}

//check coverage folder for detailed breakdown of each files coverage metrics
// task('coverage', ['set-dev-env'], shell.task([
//         'nyc --all --reporter=html --reporter=text --require babel-core/register\
//          mocha --require babel-core/register ./tests/**/*.spec.js',
//     ])
// );

//TODO: Find out why gulp-mocha exit arg is necessary to exit unit tests
// task('test:unit', () =>
//     src('tests/unit/**/*.spec.js', {read: false})
//         .pipe(mocha({
//             require: 'babel-core/register',
//             reporter: 'tap',
//             exit: true
//         }))
//         .once('error', err => {
//             console.error(err);
//             process.exit(1);
//         })
//         .once('end', () => {
//             process.exit();
//         })
// );

// task('test:functional', ['set-dev-env'], () =>
//     src('tests/functional/**/*.spec.js', {read: false})
//         .pipe(mocha({
//             require: 'babel-core/register',
//             reporter: 'tap'
//         }))
//         .once('error', err => {
//             console.error(err);
//             process.exit(1);
//         })
//         .once('end', () => {
//             process.exit();
//         })
// );

function setDevEnv(done) {
    env.set({
        NODE_ENV: 'development',
        DEBUG: 'dynamoose'
    });
    done();
}

// task('lint-src', function() {
//     src(jsFiles, {base:'.'})
//         .pipe(eslint('eslintrc.json'))
//         .pipe(eslint.failAfterError());
// });
task('nodemon-compile', compile);
task('nodemon-copyToDist', copyToDist);
exports.runApp = series(setDevEnv, compile, copyToDist, watch);
exports.build = series(compile, copyToDist);
exports.default = series(compile, copyToDist);
