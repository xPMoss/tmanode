

// Search
let searchResultsDiv = document.getElementById("searchResults");
let searchResultsHeader = document.getElementById("searchResultsHeader");
let search = document.getElementById("search");
let clearSearchBtn = document.getElementById("clearSearch");
let searchResultsContainer = document.getElementById("searchResultsContainer");
let searchResultsInfo = document.getElementById("searchResultsInfo");
let sortSearchForm = document.getElementById("sortSearchForm");
let loadMore = document.getElementById("loadMore");
let searchResult = new Array();
let loadMoreIndex = 20;

let movieList_search = new MovieList("searchResults");

// ---------- RENDER ---------- //
async function renderSearchResultMovies() {
    searchResultsDiv.innerHTML = "";
    searchResultsInfo.innerHTML = "";

    movieList_search.renderMovies();

    //  //
    for (let i = 0; i < searchResult.length; i++) {
        let movie = await searchResult[i];
        searchResultsDiv.appendChild(movie);

    }

    if (searchResult.length > 0) {
        sortSearchForm.style.display = "block";
        //searchResultsHeader.innerHTML = "Search results (" + searchResult.length + ")";
    }
    else{
        sortSearchForm.style.display = "hidden";
        searchResultsHeader.innerHTML = "Search results";
        searchResultsInfo.innerHTML = "No movies found!";
    }

}

// ---------- SEARCH ---------- //
function startSeacrh(data) {
    event.preventDefault();
    let string = data.search.value;
    searchResult = [];
    loadMoreIndex = 20;

    console.log("data: " + string);
    if (string == "") {
        showAlert("", "empty input", "Sökfältet är tomt! Skriv in sökord", ""); // Visa meddelande

    }
    else{
        searchForMovies(data);

    }

    
    
}

async function searchForMovies(data){
    event.preventDefault();

    movieList_search.movieElements = new Array();

    searchResultsDiv.innerHTML = "";
    searchResultsInfo.innerHTML = "";
    

    searchResultsInfo.innerHTML = "Laddar"
    await delay(250);
    searchResultsInfo.innerHTML = "Laddar."
    await delay(250);
    searchResultsInfo.innerHTML = "Laddar.."
    await delay(250);
    searchResultsInfo.innerHTML = "Laddar..."

    searchResultsContainer.style.display = "block";
    searchResultsHeader.innerHTML = "Sökresultat ";
    
    console.log("search: " + data.search.value);
  
    let string = data.search.value;
    let searchResultTMDB = await SearchForMoviesTmdb(string, 1);
    let pages = searchResultTMDB.total_pages;
    let total_results = searchResultTMDB.total_results;
    
    for (let i = 0; i < searchResultTMDB.results.length; i++) {
        //console.log("[Movie].id: " + searchResultTMDB.results[i].id + ", " + searchResultTMDB.results[i].title)
        let id = searchResultTMDB.results[i].id;
        let newMovie = {
            id: id
        }

        await movieList_search.addMovie(newMovie);
        
    
    }

    await movieList_search.renderMovies();


    if (movieList_search.movieElements.length > 0) {
        sortSearchForm.style.display = "block";
        let showAs = document.getElementById("showAs_search");
        showAs.style.display = "block";

        searchResultsHeader.innerHTML += "(" + total_results + ")";
        searchResultsInfo.innerHTML = "";

    }
    else{
        sortSearchForm.style.display = "hidden";
        searchResultsHeader.innerHTML = "Sök resultat";
        searchResultsInfo.innerHTML = "Laddar"
        await delay(250);
        searchResultsInfo.innerHTML = "Laddar."
        await delay(250);
        searchResultsInfo.innerHTML = "Laddar.."
        await delay(250);
        searchResultsInfo.innerHTML = "Laddar..."
        searchResultsInfo.innerHTML = "Inga filmer hittade!";
    }

    


}

async function clearSearchResults(){
    let showAs = document.getElementById("showAs_search");
    showAs.style.display = "none";
    searchResultsHeader.innerHTML = "";
    search.value = "";
    searchResultsDiv.innerHTML = "";
    searchResultsInfo.innerHTML = "";
    searchResultsContainer.style.display = "none";
    sortSearchForm.style.display = "none";
    loadMore.innerHTML = "";
    loadMore.style.display = "none";
    movieList_search.movieElements = new Array();

    showAlert("", "clear", "Sökresultatet är tömt!", ""); // Visa meddelande
}

async function searchForMovies_(data){
    event.preventDefault();
    
    
    console.log("search: " + data.search.value);
  
    let string = data.search.value;
    let searchResultTMDB = await SearchForMoviesTmdb(string, 1);
    let pages = searchResultTMDB.total_pages;
    let total_results = searchResultTMDB.total_results;
    
    //console.log("Results length: " + searchResultTMDB.results.length)
    //console.log("[0].id: " + searchResultTMDB.results[0].id + ", " + searchResultTMDB.results[0].title)
    
    //searchResult = new Array;

  
    for (let i = 0; i < searchResultTMDB.results.length; i++) {
        //console.log("[Movie].id: " + searchResultTMDB.results[i].id + ", " + searchResultTMDB.results[i].title)
        let id = await searchResultTMDB.results[i].id;
        let newMovie = {
            id: id
        }
        //console.log("id: " + newMovie.id)

        /*
        let movie = new MovieElement(newMovie, "search");
        await movie.init(newMovie)
        movie.render();
        movie.setEventListeners();
        */

        movieList_search.addMovie(newMovie);
        movieList_search.renderMovies();

        //let movie = await new Movie(m, "search");
        //movie.init();
        
        searchResult.push(movie);
    
    }

    searchResultsContainer.style.display = "block";
    searchResultsHeader.innerHTML = "Search results ";
    searchResultsHeader.innerHTML += "(" + total_results + ")";
    searchResultsDiv.innerHTML = "";
    searchResultsInfo.innerHTML = "Loading...";

    //await delay(1000);
    await renderSearchResultMovies();
    
    loadMore.style.display = "block";
    loadMore.innerHTML = "Loading...";

    if (pages > 1) {
        console.log("Pages > 1; " + pages);

        for (let j = 2; j <= 2; j++) {
            //console.log("inside loop");

            searchResultTMDB = await SearchForMoviesTmdb(string, j);

            for (let i = 0; i < searchResultTMDB.results.length; i++) {
                //console.log("[Movie].id: " + searchResultTMDB.results[i].id + ", " + searchResultTMDB.results[i].title)
                let id = await searchResultTMDB.results[i].id;
                
                let newMovie = {
                    id: id
                }

                let movie = new MovieElement(newMovie, "search");
                await movie.init(newMovie)
                movie.render();
                movie.setEventListeners();
                movie.movie.hidden = true;
                searchResult.push(movie);
            
            }

        }
        
    }

    //await delay(1000);

    loadMore.innerHTML = "";
    loadMore.style.display = "block";

    let container = document.createElement("div");

    let text = document.createElement("div");
    text.classList.add("btn");
    text.classList.add("btn-primary");
    text.innerHTML += "Load more...";

    text.onclick = async function(e) { 
        e.preventDefault();

        console.log("Clicked load more...");

        for (let i = 0; i < searchResult.length; i++) {
            let movie = searchResult[i].movie;
            if (movie.hidden == false) {
                loadMoreIndex = i;

            }

            //movie.hidden = false;
            
        }

        console.log("loadMoreIndex: " + loadMoreIndex)

        for (let i = loadMoreIndex; i < loadMoreIndex + 11; i++) {
            let movie = searchResult[i].movie;

            if (movie != undefined) {
                movie.hidden = false;
            }
            
            
        }

        let showLoadMore = false;

        for (let i = 0; i < searchResult.length; i++) {
            let movie = searchResult[i].movie;
            //console.log("Hidden: " + movie.hidden + ", " + movie.title)
            if (movie.hidden == true) {
                showLoadMore = true;
            }

            if (movie.hidden == false) {
                loadMoreIndex = i;

            }
            
        }
        console.log("loadMoreIndex: " + loadMoreIndex)
        
        if (showLoadMore == false) {
            this.remove();
        }


        await renderSearchResultMovies();

    };
        
    container.appendChild(text);

    let showLoadMore = false;

    for (let i = 0; i < searchResult.length; i++) {
        let movie = searchResult[i].movie;
        console.log("Hidden: " + movie.hidden + ", " + movie.title)
        if (movie.hidden == true) {
            showLoadMore = true;
        }
        
    }

    if(showLoadMore == true){
        loadMore.appendChild(container);
    }
    
    if (pages > 2) {
        //console.log("Pages > 1; " + pages);

        for (let j = 3; j <= pages; j++) {
            //console.log("inside loop");

            searchResultTMDB = await SearchForMoviesTmdb(string, j);

            for (let i = 0; i < searchResultTMDB.results.length; i++) {
                //console.log("[Movie].id: " + searchResultTMDB.results[i].id + ", " + searchResultTMDB.results[i].title)
                let id = await searchResultTMDB.results[i].id;
                let newMovie = {
                    id: id
                }

                let movie = new MovieElement(newMovie, "search");
                await movie.init(newMovie)
                movie.render();
                movie.setEventListeners();
                movie.movie.hidden = true;
                searchResult.push(movie);
            
            }

        }
        
    }

    showLoadMore = false;

    for (let i = 0; i < searchResult.length; i++) {
        let movie = searchResult[i].movie;
        //console.log("Hidden: " + movie.hidden + ", " + movie.title)
        if (movie.hidden == true) {
            showLoadMore = true;
        }
        
    }

    if(showLoadMore == true){
        loadMore.appendChild(container);
    }

    console.log("total_results: " + total_results)
    console.log("total_pages: " + pages)
  
  
}

clearSearchBtn.onclick = async function(e) { 
    e.preventDefault();
    console.log("Clear search" + search.value);

    await clearSearchResults();

};

async function loadMoreMovies(page){

};

// ---------- OLD ---------- //
async function clearSearchResults_(){
    searchResultsHeader.innerHTML = "";
    search.value = "";
    searchResultsDiv.innerHTML = "";
    searchResultsInfo.innerHTML = "";
    searchResultsContainer.style.display = "none";
    sortSearchForm.style.display = "none";
    loadMore.innerHTML = "";
    loadMore.style.display = "none";
    searchResult = new Array();
};
