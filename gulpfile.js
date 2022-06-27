const { src, dest, watch, series, parallel } = require("gulp");

// CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");




function css( done ) {
    // compilar
    // pasos: 1- identificar archivo, 2- compilarla, 3- guardar el css

    src("src/scss/app.scss")
        .pipe( sass() )
        .pipe( postcss( [autoprefixer(), ] ) )
        .pipe( dest("build/css") )


    done();
}

function imagenes ( done ) {
    src("src/img/**/*")
        .pipe( dest("build/img") );

    done();
}

function dev() {
    
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*", imagenes);
    
}



exports.css = css;
exports.dev = dev; 
exports.imagenes = imagenes;
exports.default = series( imagenes, css, dev ) ;

// series - se inicia un tarea ya hasta que finalza sigue con la siguiente

// parallel - todas las tareas inician al mismo tiempo