import gulp from 'gulp'
import less from 'gulp-less'
import cleanCSS from 'gulp-clean-css'
import * as child_process from "child_process";

function compile_less()
{
    return gulp.src('./public/stylesheets/**').pipe(less()).pipe(cleanCSS()).pipe(gulp.dest('./public/gulp-stylesheets/'))
}

function autocompile_less()
{
    gulp.watch('./public/stylesheets/**', compile_less)
}


function compile_js()
{
    console.log("1111")
    child_process.exec("npx webpack --mode development")
    return gulp.src("./public/stylesheets/**.js").pipe(gulp.dest("./public/webpack-stylesheets"))
}

function autocompile_js()
{
    gulp.watch('./public/javascripts/**.js', compile_js)
}


gulp.task('less', autocompile_less)
gulp.task('js', autocompile_js)
