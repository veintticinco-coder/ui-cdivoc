const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
    src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(dest("src/css"));
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    done();
}

exports.dev = dev;