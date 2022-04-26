// RETURNS OBJECT WITH backdrops, logos and posters //
/* Hämtar bilder för en specifik film */
/* Kräver ett movie object */
async function loadImageTmdb(movie) {
    console.log("//-----loadImageTmdb()-----//") // DEBUGGING

    let url = "https://api.themoviedb.org/3/movie/" + movie.id + "/images";
    url += "?api_key=" + api_key;
    url += "&include_image_language=en,null";
    url += "&language=" + language;

    let response = await fetch(url);
    let data = await response.json();

    return data; 
    
}

// RETURNS MOVIE OBJECT //
/* Hämtar en specifik film */
/* Kräver ett film id */
async function loadMovieTmdb(id) {
    console.log("//-----loadMovieTmdb()-----//") // DEBUGGING
    
    //https://api.themoviedb.org/3/movie/550?api_key=837510eb0be61188d342d8c49173bb6e&language=sv

    let url = 'https://api.themoviedb.org/3/movie/' + id;
    url += "?api_key=" + api_key;
    url += "&language=" + language;

    let response = await fetch(url);
    let data = await response.json();

    return data;
}


// RETURNS LIST OF MOVIES //
async function SearchForMoviesTmdb(searchString, page) {
    console.log("//-----SearchForMoviesTmdb()-----//") // DEBUGGING
    //console.log("Searching for: " + searchString);

    searchString = searchString.toLowerCase();
    searchString = searchString.split(' ').join('+');
    
    let url = 'https://api.themoviedb.org/3/search/movie';
    url += "?api_key=" + api_key;
    url += "&language=" + language;
    url += '&include_adult=false';
    url += '&query=' + searchString;

    //let page = 1;
    url += '&page='+ page;

    let response = await fetch(url);
    let data = await response.json();

    return data;
    
}


async function loadProviderFromTMDB(id) {
    console.log("//-----loadProviderFromTMDB()-----//") // DEBUGGING

    let url = 'https://api.themoviedb.org/3/movie/';
    url += id;
    url += '/watch/providers';
    url += "?api_key=" + api_key;

    let response = await fetch(url);
    let data = await response.json();
        
    //console.log("data1: " + JSON.stringify(data.results.SE));

    return data;
        
}

async function getGenresFromTMDB() {
    console.log("//-----getGenresFromTMDB()-----//") // DEBUGGING

    //'https://api.themoviedb.org/3/genre/movie/list?api_key=837510eb0be61188d342d8c49173bb6e&language=sv'
    let url = 'https://api.themoviedb.org/3/genre/movie/list';
    url += "?api_key=" + api_key;
    url += "&language=" + language;

    let response = await fetch(url);
    let data = await response.json();

    return data;

}


async function getImagesTmdb(movie) {
    console.log("//-----getImagesTmdb()-----//") // DEBUGGING

    //https://api.themoviedb.org/3/movie/550/images?api_key=837510eb0be61188d342d8c49173bb6e

    let url = 'https://api.themoviedb.org/3/movie/';
    url += movie.id;
    url += "/images";
    url += "?api_key=" + api_key;

    const response = await fetch(url);
    let images = await response.json();

    console.log("url" + url); // DEBUGGING
    //console.log(images); // DEBUGGING
    return images; 
    
}

async function getKeywordsTmdb(movie) {
    console.log("//-----getKeywordsTmdb()-----//") // DEBUGGING

    //https://api.themoviedb.org/3/movie/550/keywords?api_key=837510eb0be61188d342d8c49173bb6e

    let url = 'https://api.themoviedb.org/3/movie/';
    url += movie.id;
    url += "/keywords";
    url += "?api_key=" + api_key;

    const response = await fetch(url);
    let keywords = await response.json();

    console.log("url" + url); // DEBUGGING
    //console.log(keywords); // DEBUGGING
    return keywords; 
    
}

async function discoverMoviesTmdb(params) {
    console.log("//-----discoverMoviesTmdb()-----//") // DEBUGGING
    console.log("discoverMoviesTmdb params")
    console.log("params.with_genres" + params.with_genres)

    //https://api.themoviedb.org/3/discover/movie?api_key=837510eb0be61188d342d8c49173bb6e&language=sv&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&certification_country=US&certification=G
    //
    /*
    api_key
    string
    default: <<api_key>>
    required

    language
    string
    Specify a language to query translatable fields with.

    minLength: 2
    pattern: ([a-z]{2})-([A-Z]{2})
    default: en-US
    optional

    region
    string
    Specify a ISO 3166-1 code to filter release dates. Must be uppercase.

    pattern: ^[A-Z]{2}$
    optional

    sort_by
    string
    Choose from one of the many available sort options.

    Allowed Values: , popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
    default: popularity.desc
    optional

    certification_country
    string
    Used in conjunction with the certification filter, use this to specify a country with a valid certification.
    optional
    
    certification
    string
    Filter results with a valid certification from the 'certification_country' field.
    optional

    certification.lte
    string
    Filter and only include movies that have a certification that is less than or equal to the specified value.
    optional

    certification.gte
    string
    Filter and only include movies that have a certification that is greater than or equal to the specified value.
    optional

    include_adult
    boolean
    A filter and include or exclude adult movies.
    default
    optional

    include_video
    boolean
    A filter to include or exclude videos.
    default
    optional

    page
    integer
    Specify the page of results to query.
    minimum: 1
    maximum: 1000
    default: 1
    optional

    primary_release_year
    integer
    A filter to limit the results to a specific primary release year.
    optional

    primary_release_date.gte
    string
    Filter and only include movies that have a primary release date that is greater or equal to the specified value.
    format: date
    optional

    primary_release_date.lte
    string
    Filter and only include movies that have a primary release date that is less than or equal to the specified value.
    format: date
    optional

    release_date.gte
    string
    Filter and only include movies that have a release date (looking at all release dates) that is greater or equal to the specified value.
    format: date
    optional

    release_date.lte
    string
    Filter and only include movies that have a release date (looking at all release dates) that is less than or equal to the specified value.
    format: date
    optional

    with_release_type
    integer
    Specify a comma (AND) or pipe (OR) separated value to filter release types by. These release types map to the same values found on the movie release date method.
    minimum: 1
    maximum: 6
    optional
    year
    integer
    A filter to limit the results to a specific year (looking at all release dates).
    optional

    vote_count.gte
    integer
    Filter and only include movies that have a vote count that is greater or equal to the specified value.
    minimum: 0
    optional

    vote_count.lte
    integer
    Filter and only include movies that have a vote count that is less than or equal to the specified value.
    minimum: 1
    optional

    vote_average.gte
    number
    Filter and only include movies that have a rating that is greater or equal to the specified value.
    minimum: 0
    optional

    vote_average.lte
    number
    Filter and only include movies that have a rating that is less than or equal to the specified value.
    minimum: 0
    optional
    with_cast
    string
    A comma separated list of person ID's. Only include movies that have one of the ID's added as an actor.
    optional

    with_crew
    string
    A comma separated list of person ID's. Only include movies that have one of the ID's added as a crew member.
    optional

    with_people
    string
    A comma separated list of person ID's. Only include movies that have one of the ID's added as a either a actor or a crew member.
    optional

    with_companies
    string
    A comma separated list of production company ID's. Only include movies that have one of the ID's added as a production company.
    optional

    with_genres
    string
    Comma separated value of genre ids that you want to include in the results.
    optional

    without_genres
    string
    Comma separated value of genre ids that you want to exclude from the results.
    optional

    with_keywords
    string
    A comma separated list of keyword ID's. Only includes movies that have one of the ID's added as a keyword.
    optional

    without_keywords
    string
    Exclude items with certain keywords. You can comma and pipe seperate these values to create an 'AND' or 'OR' logic.
    optional

    with_runtime.gte
    integer
    Filter and only include movies that have a runtime that is greater or equal to a value.
    optional

    with_runtime.lte
    integer
    Filter and only include movies that have a runtime that is less than or equal to a value.
    optional

    with_original_language
    string
    Specify an ISO 639-1 string to filter results by their original language value.
    optional

    with_watch_providers
    string
    A comma or pipe separated list of watch provider ID's. Combine this filter with watch_region in order to filter your results by a specific watch provider in a specific region.
    optional

    watch_region
    string
    An ISO 3166-1 code. Combine this filter with with_watch_providers in order to filter your results by a specific watch provider in a specific region.
    optional

    with_watch_monetization_types
    string
    In combination with watch_region, you can filter by monetization type.
    Allowed Values: flatrate, free, ads, rent, buy
    optional

    without_companies
    string
    Filter the results to exclude the specific production companies you specify here. AND / OR filters are supported.
    optional

    */

    //https://api.themoviedb.org/3/discover/movie?api_key=837510eb0be61188d342d8c49173bb6e&language=sv&sort_by=popularity.desc&include_adult=false&include_video=false&page=1

    let url = 'https://api.themoviedb.org/3/discover/movie';
    url += "?api_key=" + api_key;
    url += "&language=" + language;
    url += "&include_adult=false";
    url += "&include_video=false";
    url += "&page=1";

    url += "&certification_country=US";

    if (params.certification != null) {
        url += "&certification=" + params.certification;
    }

    if (params.with_genres != null) {
        url += "&with_genres=" + params.with_genres;
    }

    if (params.without_genres != null) {
        url += "&without_genres=" + params.without_genres;
    }



    if (params.sort_by != null) {
        url += "&sort_by=" + params.sort_by;
    }
    else{
        url += "&sort_by=popularity.desc"
    }
    

    const response = await fetch(url);
    let movies = await response.json();
    movies = movies.results;

    console.log("discoverMoviesTmdb url" + url); // DEBUGGING
    //console.log("Discover: " + movies); // DEBUGGING

    return movies 
    
}

async function getRecommendationsTMDB(movie){
    console.log("//-----getRecommendationsTMDB()-----//") // DEBUGGING
        
    //https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=sv&page=1

    let url = 'https://api.themoviedb.org/3/movie/' + id;
    url += "/recommendations";
    url += "?api_key=" + api_key;
    url += "&language=" + language;
    url += "&page=1";

    let response = await fetch(url);
    let movies = await response.json();
    movies = movies.results;

    return movies;

}

//latest
//https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US

//upcoming
//https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1




// ---------- ---------- //


// RETURNS LIST OF MOVIES //
/* Hämtar en lista av trending filmer */
async function LoadTrendingMoviesTmdb(){
    console.log("//-----LoadTrendingMoviesTmdb()-----//") // DEBUGGING

    let url = 'https://api.themoviedb.org/3/trending/movie/day';
    url += "?api_key=" + api_key;
    url += "&language=" + language;
    url += '&include_adult=false';

    const response = await fetch(url);
    let movies = await response.json();
    movies = movies.results;

    console.log("LoadTrendingMoviesTmdb url" + url); // DEBUGGING
    //console.log(movies); // DEBUGGING
    return movies;

}

// RETURNS LIST OF MOVIES //
/* Hämtar en lista av top rated filmer */
async function LoadTopRatedMoviesTmdb(){
    console.log("//-----LoadTopRatedMoviesTmdb()-----//") // DEBUGGING

    let url = 'https://api.themoviedb.org/3/movie/top_rated';

    url += "?api_key=" + api_key;
    url += "&language=" + language;
    url += '&include_adult=false';
    url += '&page=1';

    const response = await fetch(url);
    let movies = await response.json();
    movies = movies.results;

    console.log("LoadTopRatedMoviesTmdb url" + url); // DEBUGGING
    //console.log(movies); // DEBUGGING
    return movies;

}

// RETURNS LIST OF MOVIES //
/* Hämtar en lista av populära filmer */
async function loadPopularMoviesTmdb() {
    console.log("//-----loadPopularMoviesTmdb()-----//") // DEBUGGING

    let url = 'https://api.themoviedb.org/3/movie/popular';

    url += "?api_key=" + api_key;
    url += "&language=" + language;
    url += '&include_adult=false';
    url += '&page=1';

    const response = await fetch(url);
    let movies = await response.json();
    movies = movies.results;

    console.log("loadPopularMoviesTmdb url" + url); // DEBUGGING
    //console.log(movies); // DEBUGGING
    return movies; 
    
}



async function getSimilarMoviesTmdb(movie) {
    console.log("//-----getSimilarMoviesTmdb()-----//") // DEBUGGING

    //https://api.themoviedb.org/3/movie/550/similar?api_key=837510eb0be61188d342d8c49173bb6e&language=en-US&page=1

    let url = 'https://api.themoviedb.org/3/movie/';
    url += movie.id;
    url += "/similar";
    url += "?api_key=" + api_key;
    url += "&language=" + language;
    url += '&include_adult=false';
    url += '&page=1';

    const response = await fetch(url);
    let movies = await response.json();
    movies = movies.results;

    console.log("getSimilarMoviesTmdb url" + url); // DEBUGGING
    //console.log(movies); // DEBUGGING
    return movies; 
    
}