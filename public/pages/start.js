// ---------- START.JS ---------- //




let movie;
let movies;

let movieList_teaser;


window.onload = async function(){
    start();
}



async function start() {
    movies = await loadPopularMoviesTmdb();
    movie = movies[0];

    movieList = new MovieList("teasers");
    let startHeader = document.getElementById("startHeader");
    startHeader.appendChild( movieFunc(movie) );


    //let startMovies = document.getElementById("startMovies");
    //startMovies.appendChild( moviesFunc(movies) );




}



function moviesFunc(movies){
    let container = document.createElement("div");
    container.id = "containerMovies";
    container.classList.add("row")
    container.classList.add("p-0")
    container.classList.add("pr-2")
    //container.classList.add("py-2")
    
    let size = {
        x: 200,
        y: 300,
        scale: "w500"
    }


    for (let i = 1; i < 7; i++) {
        let m = document.createElement("img");
        m.id = "m";
        m.classList.add("col-4")
        m.classList.add("col-sm-2")
        m.classList.add("p-0")
        m.classList.add("pl-2")
        m.classList.add("mb-2")
        m.classList.add("img-fluid");

        let src;

        if (movie.poster_path == null) {
            src = "https://via.placeholder.com/" + size.y + "x" + size.x;
        }
        else{
            src = "https://image.tmdb.org/t/p/" + size.scale + "/" + movies[i].poster_path;

        }

        m.src = src;
        container.appendChild(m);
        
    }
    



    return container;


}

function movieFunc(movie){

    let container = document.createElement("div");
    container.id = "headerArea";
    container.style.width = "100vw";
    container.style.zIndex = 100;
    container.classList.add("row")
    container.classList.add("bkg-black")
    //container.classList.add("py-2")
    
    let size = {
        x: document.body.offsetWidth,
        y: (document.body.offsetWidth/1.78),
        scale: "original"
    }

    if (size.x < 500) {
        size.scale = "w500";
    }
    else{
        size.scale = "original";
    }


    let poster = document.createElement("img");
    poster.style.position = "absolute";
    //poster.style.left = "4vw";
    //poster.style.top = "2vw";
    poster.style.zIndex = 200;
    poster.id = "poster";
    poster.classList.add("col-12")
    poster.classList.add("col-md-9")
    poster.classList.add("p-0")
    poster.classList.add("m-3")
    poster.classList.add("m-lg-4")
    poster.classList.add("img-fluid");

    let poster_src;

    if (movie.poster_path == null) {
        poster_src = "https://via.placeholder.com/" + size.y + "x" + size.x;
    }
    else{
        poster_src = "https://image.tmdb.org/t/p/" + size.scale + "/" + movie.poster_path;

    }

    poster.src = poster_src;

    let left = document.createElement("div");
    left.id = "left";
    left.classList.add("col-3")
    left.classList.add("m-0")
    left.classList.add("p-0")
    left.classList.add("p-md-0")
    //left.classList.add("p-lg-4")
    
    left.classList.add("d-none")
    left.classList.add("d-sm-block")
    left.appendChild(poster);
    

    let backdrop = document.createElement("img");
    backdrop.id = "hero_backdrop";
    backdrop.classList.add("col-12")
    backdrop.classList.add("p-0")
    backdrop.classList.add("img-fluid");

    let backdrop_src;

    if (size.x < 500) {
        size.scale = "w500";
    }
    else{
        size.scale = "original";
    }

    if (movie.poster_path == null) {
        backdrop_src = "https://via.placeholder.com/" + size.y + "x" + size.x;
    }
    else{
        backdrop_src = "https://image.tmdb.org/t/p/" + size.scale + "/" + movie.backdrop_path;

    }

    backdrop.src = backdrop_src;

    let middle = document.createElement("div");
    middle.id = "middle";
    middle.classList.add("col-12")
    middle.classList.add("col-sm-9")
    middle.classList.add("col-md-7")
    middle.classList.add("p-0")
    //right.appendChild(poster);
    middle.appendChild(backdrop);
    

    let right = document.createElement("div");
    right.id = "hero_right";
    right.classList.add("col-0")
    right.classList.add("col-md-0")
    right.classList.add("col-lg-0")
    right.classList.add("p-0")


    container.appendChild(left);
    container.appendChild(middle);
    container.appendChild(right);

    let startMovies = document.getElementById("startMovies");
    startMovies.appendChild( container );


    let backdropSize = {
        x:container.offsetWidth,
        y:container.offsetHeight

    }

    right.style.height = backdropSize.y + "px";

    let BkgGradient = document.createElement("div");
    BkgGradient.id = "hero_bkgGradient";
    BkgGradient.style.position = "absolute";
    BkgGradient.style.top = 0;
    BkgGradient.style.left = 0;
    //BkgGradient.style.width = size.x + "px";
    BkgGradient.style.height = backdropSize.y + "px";
    BkgGradient.style.background = "linear-gradient(to right, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)";
    BkgGradient.style.zIndex = 150;
    BkgGradient.classList.add("col-6")
    BkgGradient.classList.add("d-none")
    BkgGradient.classList.add("d-sm-block")
    BkgGradient.classList.add("d-md-block")
    BkgGradient.classList.add("d-lg-block")
    BkgGradient.classList.add("d-xl-block")

    container.appendChild(BkgGradient);

    let BkgGradient_R = document.createElement("div");
    BkgGradient_R.id = "hero_bkgGradient_R";
    BkgGradient_R.style.position = "absolute";
    BkgGradient_R.style.top = 0;
    BkgGradient_R.style.right = 0;
    //BkgGradient.style.width = size.x + "px";
    BkgGradient_R.style.height = backdropSize.y + "px";
    BkgGradient_R.style.background = "linear-gradient(to left, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)";
    BkgGradient_R.style.zIndex = 150;
    BkgGradient_R.classList.add("col-5")
    BkgGradient_R.classList.add("d-none")
    BkgGradient_R.classList.add("d-md-block")
    BkgGradient_R.classList.add("d-lg-block")
    BkgGradient_R.classList.add("d-xl-block")

    container.appendChild(BkgGradient_R);

    window.addEventListener('resize', () => {
        let hero_backdrop = document.getElementById("hero_backdrop");
        let hero_bkgGradient = document.getElementById("hero_bkgGradient");
        let hero_right = document.getElementById("hero_right");
        let hero_bkgGradient_R = document.getElementById("hero_bkgGradient_R");
        

        let backdropSize = {
            x:hero_backdrop.offsetWidth,
            y:hero_backdrop.offsetHeight
    
        }

        hero_bkgGradient.style.height = backdropSize.y + "px";
        hero_right.style.height = backdropSize.y + "px";
        hero_bkgGradient_R.style.height = backdropSize.y + "px";
    });

    container.update = () => {


    }

    //container.appendChild(header);

    /*
    let BkgImage = document.createElement("div");
    BkgImage.id = "BkgImage";
    BkgImage.style.position = "";
    BkgImage.style.top = 0;
    BkgImage.style.left = 0;
    BkgImage.style.width = size.x + "px";
    BkgImage.style.height = size.y + "px";
    let bkg = "https://image.tmdb.org/t/p/" + size.scale + "/" + movie.backdrop_path;
    BkgImage.style.background = "rgba(250,250,250,0.5) url('" + bkg + "') no-repeat top left";
    BkgImage.style.backgroundSize = "cover";
    BkgImage.style.zIndex = 1100;
    */

    

    startMovies.innerHTML = "";

    return container;






}

/*
let header = document.createElement("h4");
header.id = "h2";
header.classList.add("py-2");
header.style.width = "100vw";
header.style.textAlign = "center";
//header.style.background = "linear-gradient(to bottom, rgba(30, 30, 30, 1) 0, rgba(50, 50, 50, 0) 100%)";

header.innerHTML = "The Movie App";
*/

// movies = await loadPopularMoviesTmdb();