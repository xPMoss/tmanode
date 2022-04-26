// ---------- HOME.JS ---------- //

let movieList_trendingMovies;
let movieList_topRatedMovies;
let movieList_popularMovies;

let movieList_discovers;

let movieList_similar;

startHome();

async function startHome() {
    console.log("//-----discover.start()-----//")

    // Load user
    user = await new User();
    await user.init();

    userElement = await new UserElement(user);
    userElement.renderHome();

    
    // Init discover movies
    movieList_popularMovies = await new MovieList("discovers");

    // Init Movies
    movieList_popularMovies = new MovieList("popularMovies");
    movieList_topRatedMovies = new MovieList("topRatedMovies");
    //movieList_trendingMovies = new MovieList("trendingMovies");

   

}


//----- OLD -----//

async function oldDiscover() {
    // Discover
    let discoversHeader = document.getElementById("discoversHeader");
    let movies = await getMoviesDB();


    let prefs = await getPrefsDB("all");

    console.log(prefs);

    let genres = {
        liked: prefs.genres.liked,
        disliked: prefs.genres.disliked,
    }

    // Set liked genres
    let value = "";
    for (let i = 0; i < genres.liked.length; i++) {
        value +=  genres.liked[i].id;

        if (i < genres.liked.length-1) {
            value += ",";
        }
    }
    genres.liked = value;

    // Set disliked genres
    value = "";
    for (let i = 0; i < genres.disliked.length; i++) {
        value +=  genres.disliked[i].id;

        if (i < genres.disliked.length-1) {
            value += ",";
        }
    }
    genres.disliked = value;
    

    let params = {
        certification_country: null,
        certification: null,
        certification_lte: null,
        certification_gte: null,
        primary_release_date_gte: null,
        primary_release_date_lte: null,
        primary_release_year: null,
        vote_average_gte: null,
        vote_average_lte: null,
        with_crew: null,
        with_people: null,
        with_genres: genres.liked,
        without_genres: genres.disliked,
        with_keywords: null,
        without_keywords: null,
        sort_by: "popularity.desc",

    };

    discoversHeader.innerHTML += "Filmer som du kanske gillar";

    let discovers = document.getElementById("discovers");
    let discoverMovies = await discoverMoviesTmdb(params);

    let container = document.createElement("div");
    container.id = "containerMovies";
    container.classList.add("row")
    container.classList.add("p-0")
    container.classList.add("pr-2")

    let debug = "debug: "; // DEBUGGING

    for (let i = 0; i < discoverMovies.length; i++) {
        let movie = discoverMovies[i];

        debug += "|" + discoverMovies[i].title; // DEBUGGING

        if (movie != null && i < 6) {
            container.appendChild( discover(movie) );
        }
        
    }
    debug += "|";
    console.log(debug); // DEBUGGING

    discovers.appendChild(container);
}

function discover(movie){
    
    //container.classList.add("py-2")
    
    let size = {
        x: 500,
        y: 750,
        scale: "w500"
    }


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
        src = "https://via.placeholder.com/" + size.x + "x" + size.y;
    }
    else{
        src = "https://image.tmdb.org/t/p/" + size.scale + "/" + movie.poster_path;

    }
    //console.log("Src. " + src); // DEBUGGING
    m.src = src;
    
    
    return m;


}