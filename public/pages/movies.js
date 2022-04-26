// ---------- MOVIES.JS ---------- //

let myMovies = document.getElementById("myMovies");
let myMoviesHeader = document.getElementById("myMoviesHeader");

let moviesInfo = document.getElementById("moviesInfo");
let sortMoviesForm = document.getElementById("sortMoviesForm");

let filterBtns = document.getElementById("filterBtns");
let movieGenreFilters = new Array();

//const socket = io();

let movieList;

let genres = new Array();


let movieSorting = {
    method: "title",
    order: ""
};
let moviesToShow = new Array()
let movieFilters = new Array();
let activeSearchFilters = new Array();
let activeGenreFilters = new Array();

let scrollPosition;

// ----- !!! ----- //

startMovies();

async function startMovies() {
    // Load user
    user = await new User();
    await user.init();

    userElement = await new UserElement(user);
    //userElement.renderHome();

    movieList = new MovieList("movies");

    let genreData = await getGenresFromTMDB();
    await setGenres(genreData.genres);
    
    //console.clear();


    
}

// ---------- LOAD FROM DB ---------- //
async function readMoviesDrive() {

    let url = '/readMoviesDrive';
        
    let response = await fetch(url);
    let data = await response.json();
        
    //console.log("Movies inside fetchMovies: " + JSON.stringify(data));

    console.log("readMoviesDrive")
    console.log("some data: " + data)
    return data;
            
}





// ---------- //


// ---------- INIT ---------- //
async function setGenres(data){
    for (let i = 0; i < data.length; i++) {
        let genre = new Genre(data[i]);

        genres.push(genre)
        //console.log(i + ". Genre id: " + genre.id + ", name: " + genre.name)
        
    }
    

}

async function setFilters(){
    movieGenreFilter = new Array();
    let compare = new Array();

    //console.log("movieGenreFilters.length: " + movieGenreFilters.length)

    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < movies[i].genres.length; j++) {

            compare.push(movies[i].genres[j].id);
            //console.log("" + movies[i].genres[j].id + ", " + movies[i].genres[j].name);


        }
        
    }

    // REMOVE DUBLICATES
    compare = [...new Set(compare)];
    compare.sort();

    for (let i = 0; i < genres.length; i++) {

        for (let j = 0; j < compare.length; j++) {
            if (genres[i].id == compare[j]) {
                genres[i].hidden = false;
            }
            
        }
        
    }

    for (let i = 0; i < genres.length; i++) {
        let btn = new FilterBtn(genres[i]);

        if (genres[i].hidden == false) {
            movieGenreFilters.push(btn);

        } 
        
    }

    //console.log("movieGenreFilters.length: " + movieGenreFilters.length)
    

    
}

async function setLanguage() {
    /*
    country;
    api_key = "837510eb0be61188d342d8c49173bb6e";
    language = "sv";
    region = "SE";
    */

    let btn = document.getElementById("");
    
}

async function setMovies(movies_in_db) {

    //console.log("//-----setMovies-----//");

    for (let i = 0; i < movies_in_db.length; i++) {
        await movieList.addMovie(movies_in_db[i]);
        //movies.push(movie);
        //myMovies.appendChild(movieList.movies[i]);

    }


}

// ---------- RENDER ---------- //

async function renderMovies() {
    moviesInfo.innerHTML = "";
    myMovies.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {

        let obj = await movies[i].render();
        myMovies.appendChild(obj);

    }

    
    /*
    if (movies.length > 0) {
        myMoviesHeader.innerHTML = "My movies"
    }
    */

}

async function renderFilters() {
    renderGenreFilters();
    
}

async function renderGenreFilters(){
    filterBtns.innerHTML = "";

    //console.log("renderFilters()")
    //console.log("movieGenreFilters.length: " + movieGenreFilters.length)

    for (let i = 0; i < movieGenreFilters.length; i++) {
        filterBtns.appendChild(movieGenreFilters[i].render());
        
    }
    

}

// ---------- SOCKET ---------- //
/*
socket.on('update view', async (data)=>{
    socket.emit('load movies', "");
    await renderMovies();

});

// Movies //
socket.on('movies', async (data)=>{

    //console.log(movies)
    console.log("Socket IO result:");
    console.log(data);



});

// USERS //
///'user created user exists
socket.on('user created', async (user)=>{
    let string = "";
    string += "User created: ";
    string += user.username;
    showAlert("", string); // Visa meddelande

});

socket.on('user exists', async (data)=>{
    let string = "";
    string +=  "A user with that ";
    string += data[0];
    if (data.length > 1) {
        string += " and " + data[1];
    }
    string += " already exist";
    showAlert("", string); // Visa meddelande

});
*/

// ---------- SORT / FILTERS ---------- //
// FILTER //
async function clearMovieFilters() {
    event.preventDefault();
    console.log("// ---------- //");
    console.log("clearMovieFilters");

    moviesToShow = new Array();
    activeGenreFilters = new Array();
    activeSearchFilters = new Array();
    
    for (let i = 0; i < movies.length; i++) {
        movies[i].hidden = false;

    }

    for (let i = 0; i < movieGenreFilters.length; i++) {
        movieGenreFilters[i].active = false;
        
    }

    //let searchFilter = document.getElementById("searchFilter");
    //searchFilter.value = "";

    await sortMovies(movies, movieSorting.method, movieSorting.order)
    await renderFilters();
    await renderMovies();

}

async function setNewFilters() {
    console.log("//---------- setFilters ----------//")

    moviesToShow = new Array();

    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < movies[i].genres.length; j++) {

            for (let k = 0; k < activeGenreFilters.length; k++) {
                if (activeGenreFilters[k] == movies[i].genres[j].id) {
                    moviesToShow.push(movies[i].id);
                }
                
            }

        }
        
    }

    // addSearchFilter
    if (moviesToShow.length > 0 && activeSearchFilters > 0) {

        let tempMovies = new Array;

        for (let i = 0; i < movies.length; i++) {
            let movie = movies[i];

            for (let j = 0; j < moviesToShow.length; j++) {

                if (moviesToShow[j] == movie.id) {
                    tempMovies.push(movie);
                }
    
            }
            
        }

        moviesToShow = new Array();

        for (let i = 0; i < tempMovies.length; i++) {
            let movie = tempMovies[i];
            let title = movie.title.toLowerCase();

            for (let j = 0; j < activeSearchFilters.length; j++) {
                let string = activeSearchFilters[j];

                if (title.includes(string) == true) {
                    console.log("Found: " + title);
                    moviesToShow.push(movie.id);
    
                } 
            }   
            
        }
        
    }
    else{
        for (let i = 0; i < movies.length; i++) {
            let movie = movies[i];
            let title = movie.title.toLowerCase();

            for (let j = 0; j < activeSearchFilters.length; j++) {
                let string = activeSearchFilters[j];

                if (title.includes(string) == true) {
                    console.log("Found: " + title);
                    moviesToShow.push(movie.id);
    
                } 
            }   
            
        }

    }


    // Set movies to hidden
    for (let i = 0; i < movies.length; i++) {
        movies[i].hidden = true;

        
    }

    for (let i = 0; i < movies.length; i++) {

        for (let j = 0; j < moviesToShow.length; j++) {
            if (movies[i].id == moviesToShow[j]) {
                movies[i].hidden = false;
            }
            
        }
        

    }

    if (activeGenreFilters.length < 1) {
        for (let i = 0; i < movies.length; i++) {
            movies[i].hidden = false;
    
            
        }
    }

    await sortMovies(movies, movieSorting.method, movieSorting.order)
    await renderMovies();
    
}

function addFilter(data) {
    event.preventDefault();

    console.log(typeof data + " value: " + data)

    addGenreFilter(data);
    
}

async function addSearchFilter(data) {
    event.preventDefault();
    console.log("//---------- addSearchFilter ----------//")
    console.log("Sent data: " + data.searchFilter.value);

    let rawString = data.searchFilter.value;
    let string = rawString.toLowerCase();

    if (string == "") {
        showAlert("", "Enter a string in search area!"); // Visa meddelande

    }
    else{
        for (let i = 0; i < movies.length; i++) {
            let title = movies[i].title.toLowerCase();

            if (title.includes(string) == true) {
                console.log("Found: " + movies[i].title);
                activeSearchFilters.push(rawString)
                //moviesToShow.push(movies[i].id)

            }
            
        }
    }

    // REMOVE DUBLICATES
    activeSearchFilters = [...new Set(activeSearchFilters)];
    activeSearchFilters.sort();

    let str = activeSearchFilters.length + " activeSearchFilters: ";

    for (let i = 0; i < activeSearchFilters.length; i++) {
        
        str += activeSearchFilters[i];
        str += ", ";
        
    }
    console.log(str)


    await setFilters();


}

async function addGenreFilter(data) {
    event.preventDefault();
    console.log("//---------- addGenreFilter ----------//")
    console.log("Sent data: " + data);

    let found = false;
    //movies.includes(2);

    for (let i = 0; i < activeGenreFilters.length; i++) {
        if (activeGenreFilters[i] == data) {
            found = true;
            activeGenreFilters.splice(i, 1); 
        }
        
    }

    if (found == false) {
        activeGenreFilters.push(data)
    }

    // REMOVE DUBLICATES
    activeGenreFilters = [...new Set(activeGenreFilters)];
    activeGenreFilters.sort();

    let str = activeGenreFilters.length + " activeGenreFilters: ";

    for (let i = 0; i < activeGenreFilters.length; i++) {
        
        str += activeGenreFilters[i];
        str += ", ";
        
    }
    console.log(str)

    await setNewFilters();

    /*
    for (let i = 0; i < activeGenreFilters.length; i++) {
        if (activeGenreFilters[i] == data) {
            found = true;
            activeGenreFilters.splice(i, 1); 
        }
        
    }

    if (found == false) {
        activeGenreFilters.push(data)
    }

    for (let i = 0; i < activeGenreFilters.length; i++) {
        console.log("activeGenreFilters: " + activeGenreFilters[i]);
        
    }

    
    for (let i = 0; i < movies.length; i++) {
        movies[i].hidden = true;

        
    }


    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < movies[i].genres.length; j++) {

            for (let k = 0; k < activeGenreFilters.length; k++) {
                if (activeGenreFilters[k] == movies[i].genres[j].id) {
                    moviesToShow.push(movies[i].id);
                }
                
            }

        }
        
    }

    */

    /*
    // REMOVE DUBLICATES
    moviesToShow = [...new Set(moviesToShow)];
    moviesToShow.sort();
    */

    /*
    let str = "moviesToShow: " + moviesToShow.length + ": ";

    for (let i = 0; i < moviesToShow.length; i++) {
        
        str += moviesToShow[i] + ", ";
        
        
    }
    console.log(str)
    
    for (let i = 0; i < movies.length; i++) {

        for (let j = 0; j < moviesToShow.length; j++) {
            if (movies[i].id == moviesToShow[j]) {
                movies[i].hidden = false;
            }
            
        }
        

        
    }

    if (activeGenreFilters.length < 1) {
        for (let i = 0; i < movies.length; i++) {
            movies[i].hidden = false;
    
            
        }
    }
    */


}

// SORT MOVIES //
async function sortMoviesList(data) {
    //event.preventDefault();
    let type;
    let reverse = "";
    console.log("Sort by: " + data);

    let methods = {
        title:"title",
        rating:"rating",
        year:"year",
        desc:"desc"
    }

    console.log("language: " + language)
    if (language == "sv") {
        console.log("language: " + language)
    }

    if (data.value.includes("title") == true || data.value.includes("titel") == true) {
        type = "title";
        
    }

    if (data.value.includes(methods.rating) == true) {
        type = "tmdb_rating";
    }

    if (data.value.includes(methods.year) == true) {
        type = "year";
    }

    if (data.value.includes(methods.desc) == true || data.value.includes("(Ö...A)") == true || data.value.includes("(10...1)") == true || data.value.includes("Nyast") == true ) {
        reverse = "reverse";
        
    }

    movieSorting.method = type;
    movieSorting.order = reverse;

    console.log("Sort function: " + type + ", " + data.value.includes("\u2191") + "\u2191");
    await sortMovies(movies, type, reverse)
    await renderMovies();

}

// SORT SEARCH //
async function sortSearchList(data) {
    //event.preventDefault();
    let type;
    let reverse = "";

    if (data.value.includes("title") == true) {
        type = "title";
    }
    if (data.value.includes("rating") == true) {
        type = "tmdb_rating";
    }
    if (data.value.includes("year") == true) {
        type = "year";
    }

    if (data.value.includes("desc") == true) {
        reverse = "reverse";
    }

    console.log("Sort function: " + type + ", " + data.value.includes("title"));
    await sortMovies(searchResult, type, reverse)
    await renderSearchResultMovies();

}




