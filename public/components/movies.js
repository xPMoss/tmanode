// ---------- MOVIE_COMPONENTS.JS ---------- //



class Movie{
    constructor(movie, type){
        console.log("Creating Movie: " + type) // Debugging

        this.backdrop_path;
        this.belongs_to_collection;
        this.budget;
        this.genres;
        this.homepage;
        this.id = movie.id;
        this.imdb_id;
        this.original_language;
        this.original_title;
        this.overview;
        this.popularity;
        this.poster_path;
        this.production_companies;
        this.production_countries;
        this.release_date;
        this.revenue;
        this.runtime;
        this.spoken_languages;
        this.status;
        this.tagline;
        this.title;
        this.video;
        this.vote_average;
        this.vote_count;
        this.director;
        this.actors;

        this.found = false;

        this.type = type;

        this.lists = new Array();

        if (this.type == "movie" || this.type == "list") {
            this.vote = movie.vote;
            this.lists = movie.lists;
            this.seen = movie.seen;

            this.found = true;
            
            this.inlists = movie.lists;
            this.inlistsArray;
            //this.setMovieLists();

            console.log("this.lists: " + this.lists);
            //console.log("Found: " + this.found) // Debugging
            
        }

        if (this.type != "movie") {
           
            
        }

        if(this.type == "searchResult"){

        }
        
        //console.log("movie.type: " + type + ", found: " + this.found) // Debugging
        
        this.providers;
        this.hidden = false;
        this.year;

        this.showLists = false;
        this.firstLoad = 1;
    }

    async init(){
        if (this.type != "movie" && this.type != "teaser") {
            let found_movie = await getMovieDB(this);

            //console.log("found_movie: " + found_movie) // Debugging
            //console.log(found_movie) // Debugging

            if (found_movie == 208) {
                this.found = false;
            }
            else{
                this.found = true;
                this.lists = found_movie.lists;
                this.seen = found_movie.seen;
            }

        }

        //console.log("movie.type: " + this.type + ", found: " + this.found) // Debugging

        
        

        //console.log("//-----init()-----//"); // Debugging
        let movie = await loadMovieTmdb(this.id)

        this.adult = movie.adult; //0. adult
        this.backdrop_path = movie.backdrop_path; //1. backdrop_path
        this.belongs_to_collection = movie.belongs_to_collection; //2. belongs_to_collection
        this.budget = movie.budget; //3. budget
        this.genres = movie.genres; //4. genres
        this.homepage = movie.homepage; //5. homepage
        this.id = movie.id; //6. id
        this.imdb_id = movie.imdb_id; //7. imdb_id
        this.original_language = movie.original_language; //8. original_language
        this.original_title = movie.original_title; //9. original_title
        this.overview = movie.overview; //10. overview
        this.popularity = movie.popularity; //11. popularity
        this.poster_path = movie.poster_path; //12. poster_path
        this.production_companies = movie.production_companies; //13. production_companies
        this.production_countries = movie.production_countries; //14. production_countries
        this.release_date = movie.release_date; //15. release_date
        this.revenue = movie.revenue; //16. revenue
        this.runtime = movie.runtime; //17. runtime
        this.spoken_languages = movie.spoken_languages; //18. spoken_languages
        this.status = movie.status; //19. status
        this.tagline = movie.tagline; //20. tagline
        this.title = movie.title; //21. title
        this.video = movie.video; //22. video
        this.vote_average = movie.vote_average; //23. vote_average
        this.vote_count = movie.vote_count; //24. vote_count
        //25. director
        //26. actors
        //27. seen

        
        this.year = getYear(this.release_date);
        //let movie = await loadMovieTmdb(data.id)
        //console.log("Tmdb Movie: " + movie.genres)

        let providers = await loadProviderFromTMDB(this.id)
        let go = false;

        if (providers.results.SE != undefined) {
            if (providers.results.SE.flatrate != undefined) {
                go = true
            }
        }

        if (go) {
            this.providers = providers.results.SE.flatrate;
            
        }
        else{
            //console.log("SE.Flatrate: undefined")
        }

        
        //console.log("Movie: ")


        this.firstLoad = 0;
    }

    setMovieLists(){
        console.log("//-----MovieList.setMovieLists(" + this.type + ")-----//"); // Debugging

        let lists;

        lists = this.inlists;
        lists = lists.split(",");

        lists = lists.filter(Boolean);

        lists = lists = [...new Set(lists)];
        lists.sort();

        // Debugging
        let string = "Lists in movie: ";
        for (let i = 0; i < lists.length; i++) {
            string += i + ".[";
            string += lists[i];
            string += "]";
            
        }

        this.inlistsArray = lists;
        console.log(string);


    }

    async update(movie){

        this.hidden = movie.hidden;
        this.showLists = movie.showLists;

        this.found = false;

        if (this.type != "teaser") {
            let found_movie = await getMovieDB(this);

            if (found_movie == 208) {
                this.found = false;
            }
            else{
                this.found = true;
            }

            this.lists = movie.lists;
        }
        


        this.type = movie.type;

        if (this.type == "movie" || this.type == "list") {
            this.vote = movie.vote;
            this.lists = movie.lists;
            this.seen = movie.seen;

            this.found = true;

            
        }


        
    }


}

class MovieElement extends HTMLDivElement {
    constructor(movie, type, renderAs) {
        super(); // always call super() first in the constructor.

        console.log("Creating MovieElement: " + type) // Debugging

        this.animate = true;
        this.updateScroll = true;

        this.movie = new Movie(movie, type);
        this.type = type;

        this.firstLoad = 1;
        this.renderAs = renderAs;

        this.year;

        this.setAttribute("element", "MovieElement");

        this.activeList = "all"
        this.setAttribute("activeList", "all");
        /*
        this.update = (type) => {
            this.update;

        }
        */
        
    }

    async init(){
        await this.movie.init();

        this.firstLoad = 0;
    }

    update(movie){
        console.log("MovieElement update()")
        /*
        if(this.movie.type == "searchResult"){
            let movies = movieList.movieElements;

            for (let i = 0; i < movies.length; i++) {
                let movie_id = movies[i].movie.id;

                if (this.id == movie_id) {
                    this.movie.found = true;
                    //console.log("Found: " + this.found)
                }
                
            }


        }
        */

        this.movie.update(movie);
        this.render();
        this.setEventListeners();

    }

    render(){
        console.log("//-----MovieElement.render(" + this.type + ")-----//"); // Debugging

        let movie = this.movie;
        this.id = movie.type + "_" + movie.id;
        
        this.innerHTML = ""; // Reset
        this.className = ""; // Reset classes

        let container;

        //renderAs = "list";

        if (this.renderAs == "list" && this.type != "list") {
            container = this.list();
            
        }

        if (this.renderAs == "poster" && this.type != "list") {
            container = this.poster();
            
        }

        if(this.renderAs == "posterSmall" && this.type != "list" ){
            container = this.posterSmall();
            
        }

        if(this.renderAs == "hero" && this.type != "list" ){
            container = this.hero();
            
        }

        if(this.type == "list"){
            container = this.listItem();
        }

        
        // Hide if hidden
        if (movie.hidden) {
            console.log("Movie is hidden")
            this.style.display = "none";
        }
        else{
            this.style.display = "block";
        }

        
        this.appendChild(container);
        

    }

    list(){
        let movie = this.movie;

        this.classList.add("col-12");
        this.classList.add("mb-2");
        this.classList.add("px-3");
        this.classList.add("px-sm-4");

        let container = document.createElement("div");
        container.id = "container_" + movie.id;
        container.classList.add("row");
        container.classList.add("pb-2");
        container.classList.add("border-bottom");

        /*
        let head = document.createElement("div");
        head.id = "head_" + movie.id;
        head.classList.add("row");

        let body = document.createElement("div");
        body.id = "body_" + movie.id;
        body.classList.add("row");
        */

        // LEFT //  
        let left = document.createElement("div");
        left.id = "left_" + movie.id;
        left.classList.add("col-3");
        left.classList.add("col-sm-auto");
        left.classList.add("m-0");
        left.classList.add("p-0");

        // Seen button
        this.seenBtn_list = new SeenBtn(movie, "list");
        if (movie.type == "movie") {
            left.appendChild(this.seenBtn_list);

        }

        // Add button
        this.addbtn_list = new Addbtn(movie, "list");
        if (movie.found == false && movie.type == "searchResult") {
            left.appendChild(this.addbtn_list);

        }

        // Poster
        this.poster_list = new Poster(movie, "list");
        left.appendChild(this.poster_list);

        // Right //  
        let middle = document.createElement("div");
        middle.id = "middle_" + movie.id;
        middle.classList.add("col-5");
        middle.classList.add("col-sm");
        middle.classList.add("mr-0");
        middle.classList.add("pr-0");
  
        
        
        // Movie info
        this.movieInfo_list = new MovieInfo(movie, "list");
        middle.appendChild(this.movieInfo_list);

        // Right //  
        let right = document.createElement("div");
        right.id = "right_" + movie.id;
        right.classList.add("col-4");
        right.classList.add("col-sm-2");
        right.classList.add("ml-0");
        right.classList.add("pl-0");
        

        // Remove button 
        this.deletBtn_list = new DeletBtn(movie, "list");
        if (movie.type == "movie" || movie.type == "searchResult") {
            right.appendChild(this.deletBtn_list);
        }

        /*
        let foot = document.createElement("div");
        foot.id = "foot_" + movie.id;
        foot.classList.add("row");
        foot.classList.add("bg-dark");
        //foot.classList.add("mb-4");
        */

        container.appendChild(left);
        container.appendChild(middle);
        container.appendChild(right);

        return container;

    }

    poster(){
        let movie = this.movie;

        this.classList.add("col-6");
        this.classList.add("col-sm-3");
        this.classList.add("col-md-2");
        this.classList.add("pr-4");
        this.classList.add("mb-0");
        this.classList.add("mb-sm-2");
        //this.classList.add("px-3");
        //this.classList.add("px-sm-4");

        
        let container = document.createElement("div");
        container.id = "container_" + movie.id;
        
        // HEAD //  
        let head = document.createElement("div");
        head.id = "head_" + movie.id;
        head.classList.add("row");
        
        // BODY //  
        let body = document.createElement("div");
        body.id = "body_" + movie.id;
        body.classList.add("row");

        // FOOT //
        let foot = document.createElement("div");
        foot.id = "foot_" + movie.id;
        foot.classList.add("row");

        // Poster
        this.poster_poster = new Poster(movie, "poster");
        body.appendChild(this.poster_poster);
        if (movie.type != "movie" || movie.type != "searchResult") {
            this.poster_poster.classList.add("mb-2");
        }

        /*
        // Add button
        this.addbtn_poster = new Addbtn(movie, "poster");
        if (movie.found == false && movie.type == "searchResult") {
            body.appendChild(this.addbtn_poster);

        }
        */

        // Add button
        this.listBtn_fullscreen = new ListBtn(movie, "fullscreen");
        if (movie.type != "teaser" && movie.type == "searchResult") {
            //body.appendChild(this.listBtn_fullscreen);
        }

        // Seen button
        this.seenBtn_poster = new SeenBtn(movie, "poster");
        if (movie.type == "movie") {
            body.appendChild(this.seenBtn_poster);

        }
        

        // Remove button 
        this.deletBtn_poster = new DeletBtn(movie, "poster");
        if (movie.type == "movie" || movie.type == "searchResult") {
            body.appendChild(this.deletBtn_poster);
        }
        
        

        // Movie info
        this.movieInfo_poster = new MovieInfo(movie, "poster");
        if (movie.type == "movie" || movie.type == "searchResult") {
            foot.appendChild(this.movieInfo_poster);
        }
        

        

        container.appendChild(head);
        container.appendChild(body);
        container.appendChild(foot);

        return container;

    }

    posterSmall(){
        let movie = this.movie;

        this.classList.add("col-4");
        this.classList.add("col-sm-2");
        this.classList.add("col-md-2");
        this.classList.add("pr-4");
        this.classList.add("mb-0");
        this.classList.add("mb-sm-2");
        //this.classList.add("px-3");
        //this.classList.add("px-sm-4");

        
        let container = document.createElement("div");
        container.id = "container_" + movie.id;
        
        // HEAD //  
        let head = document.createElement("div");
        head.id = "head_" + movie.id;
        head.classList.add("row");
        
        // BODY //  
        let body = document.createElement("div");
        body.id = "body_" + movie.id;
        body.classList.add("row");

        // FOOT //
        let foot = document.createElement("div");
        foot.id = "foot_" + movie.id;
        foot.classList.add("row");

        // Poster
        this.poster_poster = new Poster(movie, "poster");
        body.appendChild(this.poster_poster);
        if (movie.type != "movie" || movie.type != "searchResult") {
            this.poster_poster.classList.add("mb-2");
        }

        // Add button
        this.addbtn_poster = new Addbtn(movie, "poster");
        if (movie.found == false && movie.type == "searchResult") {
            body.appendChild(this.addbtn_poster);

        }

        // Seen button
        this.seenBtn_poster = new SeenBtn(movie, "posterSmall");
        if (movie.type == "movie") {
            body.appendChild(this.seenBtn_poster);

        }
        

        // Remove button 
        this.deletBtn_poster = new DeletBtn(movie, "posterSmall");
        if (movie.type == "movie" || movie.type == "searchResult") {
            body.appendChild(this.deletBtn_poster);
        }
        
        

        // Movie info
        this.movieInfo_poster = new MovieInfo(movie, "poster");
        if (movie.type == "movie" || movie.type == "searchResult") {
            //foot.appendChild(this.movieInfo_poster);
        }
        

        

        container.appendChild(head);
        container.appendChild(body);
        container.appendChild(foot);

        return container;

    }

    listItem(){
        let movie = this.movie;
        
        this.classList.add("col-4");
        this.classList.add("col-sm-2");
        this.classList.add("col-md-2");
        this.classList.add("col-lg-1");
        this.classList.add("mb-2");
        this.classList.add("px-1");
        this.classList.add("px-sm-2");

        let container = document.createElement("div");
        container.id = "container_" + movie.id;

        let head = document.createElement("div");
        head.id = "head_" + movie.id;
        //container.classList.add("col-12");
        //container.innerHTML = movie.title;

        // Poster
        this.poster_poster = new Poster(movie, "listItem");
        head.appendChild(this.poster_poster);

        // Seen button
        this.seenBtn_listItem = new SeenBtn(movie, "listItem");
        if (movie.type == "list") {
            head.appendChild(this.seenBtn_listItem);

        }
        
        // Remove button 
        this.deletBtn_listItem = new DeletBtn(movie, "listItem");
        if (movie.type == "list") {
            head.appendChild(this.deletBtn_listItem);
        }

        let foot = document.createElement("div");
        foot.id = "container_" + movie.id;

        let string = "";
        
        string += "<small>";
        string += "<text style='font-size:0.9rem; font-weight: 600;'>" + movie.title + "&nbsp;</text>";
        
        if (movie.release_date != "") {
            string += "<text>(" + getYear(movie.release_date) + ")</text>";
        }

        foot.innerHTML += string;

        container.appendChild(head);
        container.appendChild(foot);
        
        return container;
    }

    hero(){
        let movie = this.movie;

        this.classList.add("col-12");
        this.classList.add("p-0");
        this.classList.add("pr-2");
        this.classList.add("m-0");
        this.classList.add("mb-2");
        //this.classList.add("px-3");
        //this.classList.add("px-sm-4");

        
        let container = document.createElement("div");
        container.id = "container_" + movie.id;
        
        // HEAD //  
        let head = document.createElement("div");
        head.id = "head_" + movie.id;
        head.classList.add("row");
        
        // BODY //  
        let body = document.createElement("div");
        body.id = "body_" + movie.id;
        body.classList.add("row");

        // FOOT //
        let foot = document.createElement("div");
        foot.id = "foot_" + movie.id;
        foot.classList.add("row");

        // Hero
        this.heroImage_hero = new HeroImage(movie, "hero");
        this.appendChild(this.heroImage_hero);


        // Add button
        this.addbtn_poster = new Addbtn(movie, "poster");
        if (movie.found == false && movie.type == "searchResult") {
            body.appendChild(this.addbtn_poster);

        }

        // Seen button
        this.seenBtn_poster = new SeenBtn(movie, "posterSmall");
        if (movie.type == "movie") {
            body.appendChild(this.seenBtn_poster);

        }
        

        // Remove button 
        this.deletBtn_poster = new DeletBtn(movie, "posterSmall");
        if (movie.type == "movie" || movie.type == "searchResult") {
            body.appendChild(this.deletBtn_poster);
        }
        
        

        // Movie info
        this.movieInfo_poster = new MovieInfo(movie, "poster");
        if (movie.type == "movie" || movie.type == "searchResult") {
            //foot.appendChild(this.movieInfo_poster);
        }


        

        //container.appendChild(head);
        //container.appendChild(body);
        //container.appendChild(foot);

        return container;

    }
    

    setEventListeners(){
        //console.log("//-----SETEVENTLISTENERS-----//");


    }

    async updateShowMovie(movie){

        this.animate = false;
        this.updateScroll = false;

        this.movie.update(movie);

        let LocalScrollPosition = document.body.getBoundingClientRect().top;
        LocalScrollPosition = -LocalScrollPosition;

        let fullscreen = document.getElementById("fullscreen_" + movie.id);
        fullscreen.remove();
        await this.showMovie(movie);

        window.scrollTo(0, LocalScrollPosition);

        this.animate = true;
        this.updateScroll = true;

    }

    async showMovie(movie){
        if(movie == "" || movie == undefined || movie == "undefined" || movie == null || movie == "null"){
            movie = this.movie;
        }
        

        if (this.updateScroll == true) {
            this.GlobalScrollPosition = document.body.getBoundingClientRect().top;
            this.GlobalScrollPosition = -this.GlobalScrollPosition;

        }
        
        let holder = document.createElement("div");
        holder.id = "fullscreen_" + movie.id;
        holder.style.zIndex = 1000;
        holder.style.position = "fixed";
        holder.style.top = 0;
        holder.style.left = 0;

        let container = document.createElement("div");
        container.id = "container_fullscreen_" + movie.id;
        container.style.position = "absolute";
        container.style.zIndex = 1100;
        container.style.top = 0;
        container.style.left = 0;
        container.style.width = "100vw";
        container.style.minHeight = "100vh";
        container.style.backgroundColor = "rgba(250,250,250,1)";
        container.style.color = "white";

        let BkgImage = document.createElement("div");
        BkgImage.id = "BkgGradient";
        BkgImage.style.position = "fixed";
        BkgImage.style.top = 0;
        BkgImage.style.left = 0;
        BkgImage.style.width = "100vw";
        BkgImage.style.minHeight = "110vh";
        let bkg = "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;
        BkgImage.style.background = "rgba(250,250,250,0.5) url('" + bkg + "') no-repeat top left";
        BkgImage.style.backgroundSize = "cover";


        let BkgGradient = document.createElement("div");
        BkgGradient.id = "BkgImage";
        BkgGradient.style.position = "fixed";
        BkgGradient.style.top = 0;
        BkgGradient.style.left = 0;
        BkgGradient.style.width = "100vw";
        BkgGradient.style.minHeight = "110vh";
        BkgGradient.style.background = "linear-gradient(to right, rgba(30, 30, 30, 1) 0, rgba(50, 50, 50, 0.9) 100%)";

        

        let row = document.createElement("div");
        row.id = "row_" + movie.id;
        row.classList.add("row");

        // Left //  
        let l = document.createElement("div");
        l.classList.add("col-12");
        l.classList.add("col-sm-4");
        l.classList.add("col-md-5");
        l.classList.add("col-lg-4");
        l.classList.add("mt-0");
        l.classList.add("mt-sm-4");


        // Poster
        this.poster_fullscreen = new Poster(movie, "fullscreen");
        l.appendChild(this.poster_fullscreen);

        // Seen button
        this.seenBtn_fullscreen = new SeenBtn(movie, "fullscreen");
        if (movie.type == "movie" || movie.type == "list" && movie.type != "teaser") {
            l.appendChild(this.seenBtn_fullscreen);

        }

        // Right //  
        let r = document.createElement("div");
        r.classList.add("col-12");
        r.classList.add("col-sm-8");
        r.classList.add("col-md-7");
        r.classList.add("col-lg-8");

        
        // Movie info
        this.movieInfo_fullscreen = new MovieInfo(movie, "fullscreen");
        r.appendChild(this.movieInfo_fullscreen);


        let rating_fullscreen = new Rating(movie, "fullscreen");
        if (movie.seen && movie.type == "movie") {
            r.appendChild(rating_fullscreen);
            
        }

        if (!movie.seen){
            this.movieInfo_fullscreen.classList.add("mb-4")
        }

        // Add button
        this.listBtn_fullscreen = new ListBtn(movie, "fullscreen");
        if(movie.found == false) {
            //r.appendChild(this.addbtn_fullscreen);

        }

        if (movie.type != "teaser") {
            r.appendChild(this.listBtn_fullscreen);
        }
        

        // Remove button 
        this.deletBtn_fullscreen = new DeletBtn(movie, "fullscreen");
        if(movie.type == "movie" && movie.type != "teaser") {
            r.appendChild(this.deletBtn_fullscreen);

        }

        let content = document.createElement("div");
        content.classList.add("p-4");
        content.style.position = "absolute";
        content.style.zIndex = 1200;

        // Backdrops
        let backdrops;
        backdrops = document.createElement("div");
        backdrops.id = "backdrops_" + movie.id;
        backdrops.classList.add("row")
        //backdrops.classList.add("mt-4")
        backdrops.classList.add("pt-2")
        backdrops.classList.add("pb-4")
        backdrops.classList.add("pl-3")
        //backdrops.classList.add("border-top")

        let images = await getImagesTmdb(movie);
        console.log("//!!!: " + movie.title + "id: " + movie.id);
        console.log(images);

        let backdropsArray = new Array();

        for (let i = 0; i < images.backdrops.length; i++) {
            backdropsArray.push(images.backdrops[i])

        }

        if (backdropsArray.length >= 4) {
            for (let i = 0; i < 4; i++) {
            

                let file_path = images.backdrops[i].file_path;
                let teaserImage = new TeaserImage(movie, "fullscreen", file_path);
                teaserImage.classList.add("col-6")
                teaserImage.classList.add("col-sm-4")
                teaserImage.classList.add("col-md-3")
                teaserImage.classList.add("m-0")
                teaserImage.classList.add("p-0")
                teaserImage.classList.add("pr-3")
                teaserImage.classList.add("pb-3")
                backdrops.appendChild(teaserImage);
                
                
            }
        }
        

        if (backdropsArray.length < 4) {
            for (let j = 0; j < backdropsArray.length; j++) {
                let file_path = images.backdrops[j].file_path;
                let teaserImage = new TeaserImage(movie, "fullscreen", file_path);
                teaserImage.classList.add("col-6")
                teaserImage.classList.add("col-sm-4")
                teaserImage.classList.add("col-md-3")
                teaserImage.classList.add("m-0")
                teaserImage.classList.add("p-0")
                teaserImage.classList.add("pr-3")
                teaserImage.classList.add("pb-3")
                backdrops.appendChild(teaserImage);
            }
        }


        // Similar
        let similarMovies = await getSimilarMoviesTmdb(movie);

        let bottom;
        bottom = document.createElement("div");
        bottom.id = "bottom_" + movie.id;
        bottom.classList.add("row")
        //bottom.classList.add("mt-4")
        bottom.classList.add("pt-4")
        bottom.classList.add("pl-3")
        bottom.classList.add("border-top")

        let headerText = document.createElement("h4");
        headerText.classList.add("col-12")
        headerText.classList.add("p-0")
        headerText.classList.add("m-0")
        headerText.classList.add("mb-3")
        headerText.innerHTML = "Liknande filmer [W.I.P]"
        if (movie.type != "teaser") {
            bottom.appendChild(headerText);

        }
        
        
        for (let i = 0; i < similarMovies.length; i++) {
            
            let sMovie;
            sMovie = document.createElement("div");
            sMovie.classList.add("col-6")
            sMovie.classList.add("col-sm-3")
            sMovie.classList.add("col-md-2")
            sMovie.classList.add("m-0")
            sMovie.classList.add("p-0")
            sMovie.classList.add("pr-3")
            sMovie.classList.add("pb-3")

            let image = document.createElement("img");
            image.classList.add("img-fluid");
            image.classList.add("m-0")
            image.classList.add("p-0")

            let size = {
                x: document.body.offsetWidth,
                y: document.body.offsetHeight
            }

            //500x750

            if (movie.poster_path == null) {
                image.src = "https://via.placeholder.com/" + 400 + "x" + 600;
            }
            else{
                image.src = "https://image.tmdb.org/t/p/w400/" + similarMovies[i].poster_path;
        
            }

            //image.src = "https://image.tmdb.org/t/p/w200/" + similarMovies[i].poster_path;
            sMovie.appendChild(image);

            //sMovie.innerHTML += "<small>" + similarMovies[i].title + "</small>";

            bottom.appendChild(sMovie);
            
            
        }

        //bottom.appendChild(sMovie_row);

        // ---------- //
        row.appendChild(l);
        row.appendChild(r);
        
        content.appendChild(row);
        content.appendChild(backdrops);
        if (movie.type != "teaser") {
            content.appendChild(bottom);

        }
        
        
        container.appendChild(BkgImage);
        container.appendChild(BkgGradient);
        container.appendChild(content);

        // CLOSE BUTTON //
        let containerCloseBtn = document.createElement("div");
        containerCloseBtn.id = "containerclose_" + movie.id;
        containerCloseBtn.style.position = "absolute";
        containerCloseBtn.style.top = "0";
        containerCloseBtn.style.right = "0";
        containerCloseBtn.style.zIndex = 1300;
        containerCloseBtn.classList.add("p-3");

        let closeBtn = document.createElement("div");
        closeBtn.id = "close_" + movie.id;
        closeBtn.setAttribute("type", movie.type);
        //closeBtn.style.position = "";
        //closeBtn.style.zIndex = 1300;
        closeBtn.style.fontSize = "1.5rem";
        closeBtn.style.top = 0;
        closeBtn.style.right = 0;
        closeBtn.classList.add("btn");
        closeBtn.classList.add("btn-danger");
        closeBtn.classList.add("m-4");
        closeBtn.classList.add("px-3");
        closeBtn.innerHTML = "X"

        closeBtn.onclick = async function(e) { 
            e.preventDefault();

            //let element = this.parentElement;

             // Find Element and movie
            let id = this.id.replace("close_", "");
            let movieElement;
            let type = this.getAttribute("type");
 
            movieElement = document.getElementById(type + "_" + id);
            let movie = movieElement.movie;

            movieElement.hideMovie(movie);

            /*
            movie.showLists = false;

            movieElement.update(movie);

            console.log("GlobalScrollPosition: " + GlobalScrollPosition);
            window.scrollTo(0, this.GlobalScrollPosition);
            element.remove();
            */
            
        };

        containerCloseBtn.appendChild(closeBtn);
        container.appendChild(containerCloseBtn);

        //document.body.style.overflow = 'hidden';


        //return container;
        holder.appendChild(container);
        document.body.appendChild(holder);

        this.objects = {
            holder: holder,
            container: container,
            row: row,
            closeBtn: closeBtn,
            content: content,
        };

        if (this.animate == true) {
            await this.animateInShowMovie(this.objects)
            
            
        }
        else{


        }

        holder.style.position = "absolute";

        /*
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
        */
    }

    async animateInShowMovie(objects){
        objects.container.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ], 
            {
    
                fill: 'forwards',
                easing: 'ease',
                duration: 500
            }
        );

        objects.closeBtn.animate(
            [
                { transform: 'translateX(-100vw)' },
                { transform: 'translateX(0px)' }
            ], 
            {
    
                fill: 'forwards',
                easing: 'ease',
                duration: 500
            }
        );

        objects.content.animate(
            [
                { transform: 'translateX(-100vw)' },
                { transform: 'translateX(0px)' }
            ], 
            {
    
                fill: 'forwards',
                easing: 'ease',
                duration: 500
            }
        );


        await delay(500);
        window.scrollTo(0, 0);

        objects.holder.style.position = "absolute";

    }

    async hideMovie(movie){
        let holder = document.getElementById("fullscreen_" + movie.id);

        // Find Element and movie
       let movieElement = document.getElementById(movie.type + "_" + movie.id);
       movie = movieElement.movie;
       movie.showLists = false;

       movieElement.update(movie);

       console.log("this.GlobalScrollPosition: " + this.GlobalScrollPosition);
       
       await this.animateOutShowMovie(this.objects)
       
       //window.scrollTo(0, GlobalScrollPosition);
       
    }

    async animateOutShowMovie(objects){
        objects.holder.style.position = "fixed";
        await window.scrollTo(0, this.GlobalScrollPosition);
        

        objects.container.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ], 
            {
    
                fill: 'forwards',
                easing: 'ease',
                duration: 500
            }
        );

        objects.closeBtn.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(0)' }
            ], 
            {
    
                fill: 'forwards',
                easing: 'ease',
                duration: 500
            }
        );

        objects.content.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(0)' }
            ], 
            {
    
                fill: 'forwards',
                easing: 'ease',
                duration: 500
            }
        );


        await delay(500);
        objects.holder.remove();

        

    }



}

customElements.define('movie-element', MovieElement, {extends: 'div'});

class MovieList{

    constructor(type){
        console.log("//-----new MovieList(" + type + ")-----//"); // Debugging

        this.firstLoad = 1;

        this.type = type;
        this.translation = new Translation(type);

        this.movieElements = new Array();
        this.movieLists = new Array();

        this.empty = false;
        this.filters = new Array();

        this.sortForm;
        this.showAsForm;

        this.container;

        this.showAs = "poster";

        if (this.type != "movies" && this.type != "searchResults") {
            this.showAs = "posterSmall";
        }

        this.sorting = {
            method: "title",
            order: ""
        };

        this.container = document.getElementById(this.type);
        
        this.create();

    }

    async create(){
        console.log("//-----MovieList.create(" + this.type + ")-----//"); // Debugging
        let type = this.type;

        await this.load();

        await this.render().then(async (value) => {
            this.firstLoad = 0;
  
        });
        
       
    }

    
    update(){
        console.log("//-----MovieList.update(" + this.type + ")-----//"); // Debugging

        if (this.type != "searchResults") {
            this.sortMovies(this.sorting.method, this.sorting.order);
            
        }
        

        for (let i = 0; i < this.movieElements.length; i++) {
            this.movieElements[i].update(this.movieElements[i].movie);

        }

        if (this.type == "lists") {
            this.renderLists();
        }
        else{
            this.renderMovies();
        }
        
    }

    updateMovie(movie){
        console.log("//-----MovieList.updateMovie( type:[" + this.type + "] movie:[" + movie.title + "] )-----//");

        console.log("Looking for id: " + movie.id);

        let debugString = ""; // Debugging
        debugString += "Movies in this.movieElements: "

        for (let i = 0; i < this.movieElements.length; i++) {
            let m = this.movieElements[i].movie;

            debugString += "["; // Debugging
            debugString += m.title + " id: " + m.id; // Debugging
            debugString += "]"; // Debugging
            

            if (m.id == movie.id) {
                console.log("Found movie: " + m.title);
                m.update(movie);
            }
            

        }

        console.log(debugString);

    }

    delete(){
        this.remove();
    }
    
    async load(){
        if (this.type != "searchResults") {
            await this.loadMovies();
            await this.loadMovieLists();
        }
        
    }


    async render(){

        if (this.type == "movies" || this.type == "searchResults") {
            if (this.type == "movies") {
                this.listForm = new ListForm(this);
            }
            if (this.empty == false) {
                this.sortForm = new SortForm(this);
                this.showAsForm = new ShowAsForm(this);
            }
                
                
        }
        
        
        if (this.type != "lists") {
            this.renderMovies();

        }
        else{
            this.renderLists();
           

        }

    }

    // ----- Lists ----- //
    async renderLists(){
        console.log("//-----MovieList.renderMovies(" + this.type + ")-----//"); // Debugging

        this.container.innerHTML = "";
        let type = this.type;
        type = type.slice(0, -1);

        let movieElement;

        for (let i = 0; i < this.movieLists.length; i++) {
            
            let ml = this.movieLists[i];

            console.log("List i: " + i + ". " + ml.title) // Debugging

            let col = document.createElement("div");
            col.classList.add("col-12");
            col.classList.add("mb-4");
            col.id = "list_" + ml.title;

            let containerList = document.createElement("div");
            containerList.id = "rowlist_" + ml.title;
            containerList.setAttribute("list", ml.title)
            containerList.classList.add("row");

            let title = document.createElement("div");
            title.id = "title_" + ml.title;
            title.setAttribute("list", ml.title)
            title.classList.add("col-12");
            title.classList.add("m-1");
            title.classList.add("p-1");
            title.classList.add("mb-2");
            //title.classList.add("px-3");
            //title.classList.add("px-sm-4");

            let titleText = ml.title.charAt(0).toUpperCase() + ml.title.slice(1);
            title.innerHTML = "<h4 class='m-0 p-0'>" + titleText + "</h4>";
            if (ml.description != null) {
                title.innerHTML += "<p class='m-0 p-0'>" + ml.description + "</p>";
            }

            containerList.appendChild(title);

            let empty = true;

            for (let j = 0; j < this.movieElements.length; j++) {

                let me = this.movieElements[j];

                if (me.movie.lists.includes(ml.title)) {
                    empty = false;

                    movieElement = new MovieElement(me.movie, type, this.showAs);
                    await movieElement.init()
                    movieElement.render();
                    movieElement.setAttribute("list", ml.title)
                    //movieElement.setEventListeners();

                    containerList.appendChild(movieElement);
 
                }
                
            }


            if (empty == true) {
                let info = document.createElement("div");
                info.id = "infoList_" + ml.title;
                info.classList.add("col-12");
                info.classList.add("mb-2");
                //info.classList.add("px-3");
                //info.classList.add("px-sm-4");

                info.innerHTML = "Listan [" + titleText + "] är tom";

                containerList.appendChild(info);
            }

            col.appendChild(containerList);
            this.container.appendChild(col);
        }


    }

    async loadMovieLists(){
        console.log("//-----MovieList.loadMovieLists(" + this.type + ")-----//"); // Debugging

        if (this.type == "movies" || this.type == "lists") {
            let movieLists = await getListsDB();
            this.movieLists = movieLists;

            // Debugging
            let string = "this.movieLists: ";
            for (let i = 0; i < this.movieLists.length; i++) {
                string += i + ".[";
                string += this.movieLists[i].title;
                string += "]";
                
            }

            console.log(string);
        }

        


    }

    addList(name){
        console.log("//-----MovieList.addList(" + this.type + "[" + name + "])-----//");

        let no = this.movieLists[this.movieLists.length - 1].id;
        no = parseInt(no);
        no += 1;

        let list = {
            id: no,
            title: name.toLowerCase()
        }

        this.movieLists.push(list);

        this.movieLists.sort(function(a, b){
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        
        addListDb(list);
        this.listForm.update();

        /*
        let type = this.type;
        type = type.slice(0, -1);

        let movieElement = new MovieElement(movie, type, this.showAs);
        await movieElement.init()
        movieElement.render();
        movieElement.setEventListeners();

        this.movieElements.push(movieElement);
        console.log("this.firstLoad: " + this.firstLoad);
        if (this.firstLoad != 1) {
            movieList.update();
        }
        */
        
        //console.log("MovieList.movie: " + movieElement.movie.title);

        
        //console.log("this.movieElements.length: " + this.movieElements.length);



    }

    showList(list){
        console.log("//-----MovieList.showList(" + list + ")-----//"); // Debugging
        let movieElements = this.movieElements;
        console.log("list: " + list)

        let moviesInfo = document.getElementById("moviesInfo");
        moviesInfo.innerHTML = "";

        let empty = true;
        this.empty = true;

        for (let i = 0; i < movieElements.length; i++) {
            console.log("iteration: " + i)
            let movieElement = movieElements[i];
            let movie = movieElements[i].movie;
            //console.log("lists: " + movie.lists[0])
            movie.hidden = true;
            if (movie.lists.includes(list)) {
                movie.hidden = false;
                empty = false;
                this.empty = false;

                movieElement.activeList = list;
                movieElement.setAttribute("activeList", list)
            }

            if (list == "all") {
                movie.hidden = false;
                empty = false;
                this.empty = false;
                
                movieElement.activeList = "all";
                movieElement.setAttribute("activeList", "all")
            }
            
            movieElement.update(movieElement.movie);
            
        }

        if (empty == true) {
            let info = document.createElement("div");
            info.id = "infoList_" + list;
            info.classList.add("col-12");
            info.classList.add("m-0");
            info.classList.add("p-0");

            info.innerHTML = "Listan [" + list + "] är tom.";
            info.innerHTML += "</br>";
            info.innerHTML += "Lägg till filmer i listan genom att"
            info.innerHTML += "<a href='/home'> söka </a>";
            info.innerHTML +=  "eller";
            info.innerHTML += "<a href='/home'> upptäcka </a>";
            info.innerHTML += "filmer.";
            
            moviesInfo.appendChild(info);
        }



    }

    // ----- Movies ----- //
    async loadMovies(){
        console.log("//-----MovieList.loadMovies(" + this.type + ")-----//"); // Debugging

        let type = this.type;
        let movies;

        // Set header
        let wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
        let translationType = this.translation.type;
        let hta = translationType.match(wordRegex);
        let headerText = "";
    
        for (let i = 0; i < hta.length; i++) {
            hta[i] = hta[i].charAt(0).toUpperCase() + hta[i].substr(1);
            headerText += hta[i];
            headerText += " ";
        }

        if (this.translation.language == "sv") {
            headerText = this.translation.type;
        }

        if (type == "discovers") {
            headerText += "</br>";
            headerText += "<small>Filmer vi tror du kommer gilla</small>";
        }

        let header = document.getElementById(type + "Header");

        if (this.type != "teasers") {
            header.innerHTML = headerText;
        }


        
        // Loading...
        let info = document.getElementById(type + "Info");
        info.innerHTML = this.translation.loading;
        await delay(250);
        info.innerHTML = this.translation.loading + ".";
        await delay(250);
        info.innerHTML = this.translation.loading + "..";
        await delay(250);
        info.innerHTML = this.translation.loading + "...";

        if (this.type == "movies" || this.type == "lists") {
            movies = await getMoviesDB();

        }
    
        if (type == "trendingMovies") {
            movies = await LoadTrendingMoviesTmdb();
        }
    
        if (type == "topRatedMovies") {
            movies = await LoadTopRatedMoviesTmdb();
        }
    
        if (type == "popularMovies" || type == "teasers") {
            movies = await loadPopularMoviesTmdb();
            console.log("!!!!! Loading movies !!!!")
        }

        if (type == "discovers") {
            console.log("<<<<<<| user.prefs |>>>>>")
            console.log(user.prefs)
            let prefs = await new Prefs();
            console.log("<<< prefs >>>")
            console.log("<<< user.prefs >>>" + user.prefs.without_genres)

            movies = await discoverMoviesTmdb(user.prefs);
            console.log("!!!!! Loading movies !!!!")
        }

        if (type != "teasers" && type != "trendingMovies" && type != "topRatedMovies" && type != "popularMovies" && type != "discovers") {
            for (let i = 0; i < movies.length; i++) {
                let movie = movies[i];
                
                movie.renderAs = "poster";

                await this.addMovie(movie);
                //await this.renderMovies();
        
            }
        }

        if (type == "trendingMovies" || type == "topRatedMovies" || type == "popularMovies" || type == "discovers") {
            for (let i = 0; i < 7; i++) {
                let movie = movies[i];

                if (i == 0) {
                    console.log("render.as: hero")
                    movie.renderAs = "hero";
                }
                else{
                    movie.renderAs = "posterSmall";
                }
               
                
        
                await this.addMovie(movie);
                //await this.renderMovies();
        
            }
        }

        if (type == "teasers") {
            for (let i = 0; i < 6; i++) {
                let movie = movies[i];

                movie.renderAs = "posterSmall";

                await this.addMovie(movie);
                //await this.renderMovies();
        
            }
        }

        
        

        await delay(100);
        info.innerHTML = ""
    
        // Debugging
        let string = "";
    
        for (let i = 0; i < movies.length; i++) {
            let movie = movies[i];
            string += "[" + i + "." + movie.title + "]";
    
        }
    
    
    }

    sortMovies(method, order) {

        console.log("//-----sortMovies(" + this.type + "[" + this.sorting.method + "][" + this.sorting.order + "])-----//");

        //this.movieElements.sort(function(a, b){return a.movie.year - b.movie.year});
        //fruits.sort();
        // fruits.reverse();
        //cars.sort(function(a, b){return a.year - b.year});
        /*
        list.sort(function(a, b) {
            var keyA = a.movie.title.toLowerCase(),
            keyB = b.movie.title.toLowerCase();
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        */

       let list = this.movieElements;
       console.log("Sorting List: " + typeof list + ", " + list.length)
        // By title //
        if (method == "title") {
          this.movieElements.sort(function(a, b){
            let x = a.movie.title.toLowerCase();
            let y = b.movie.title.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          });
        }

        // popularity //
        if (method == "popularity") {
            list.sort(function(a, b){return a.movie.popularity - b.movie.popularity});
        }
        
        // By release date //
        if (method == "year") {
          list.sort(function(a, b){return a.movie.year - b.movie.year});
        }
      
        // By id //
        if (method == "id") {
          list.sort(function(a, b){return a.movie.id - b.movie.id});
        }
      
        // By budget //
        if (method == "budget") {
          list.sort(function(a, b){return a.movie.budget - b.movie.budget});
        }
      
        // By rating //
        if (method == "tmdb_rating") {
          list.sort(function(a, b){return a.movie.vote_average - b.movie.vote_average});
        }
        
      
        if (order == "reverse") {
          list.reverse();
        }

        console.log("Sorting List: " + typeof list + ", " + list.length)

        this.renderMovies();
            
    }

    renderMovies(){
        console.log("//-----MovieList.renderMovies(" + this.type + ")-----//"); // Debugging

        let string = "Rendering [" + this.movieElements.length + "] movies: "; // Debugging

        this.container.innerHTML = "";

        for (let i = 0; i < this.movieElements.length; i++) {
            let movieElement = this.movieElements[i];

            this.container.appendChild(movieElement);

            string += "[" + i + "." + movieElement.movie.title + "]"; // Debugging
            
        }
        
        console.log(string); // Debugging


    }
  
    async addMovieToList(movie, list){
        console.log("//-----MovieList.addMovieToList(" + this.type + "[" + movie.title + "])-----//");

        let movieElements = this.movieElements;
        let movie_to_update;
        console.log("list: " + list)

        for (let i = 0; i < movieElements.length; i++) {
            console.log("iteration: " + i)
            let movieElement = movieElements[i];
            movie_to_update = movieElement.movie;
            //console.log("lists: " + movie.lists[0])

            if (movie_to_update.id == movie.id) {
                console.log("Found movie: " + movie.title)

                console.log("typeof" + typeof movie_to_update.lists);

                if (typeof movie_to_update.lists == "string") {
                    console.log("is string");
                    let newArray = [list];
                    console.log(newArray);
                    movie_to_update.lists = newArray;
                    console.log("movie_to_update.inlists: " + movie_to_update.lists);
                    await updateMovieDB(movie_to_update);

                }

                if (movie_to_update.lists.includes(list)) {
                    console.log("already in list");

                }
                else {
                    console.log("movie.inlists: " + movie_to_update.lists);
                    movie_to_update.lists.push(list);
                    movie_to_update.lists.sort();
        
                    await updateMovieDB(movie_to_update);
        
        
                }
            }

            

            
        }

    }

    async removeMovieFromList(movie, list){
        console.log("//-----MovieList.removeMovieFromList( type:[" + this.type + "] movie:[" + movie.title + "], list:[" + list + "])-----//");

        let movieElements = this.movieElements;
        let movie_to_update = movie;
        let lists = movie.lists;
        let index;

        let debugString = ""; // Debugging
        debugString += "Lists in movie: "

        for (let i = 0; i < lists.length; i++) {
            if (list == lists[i]) {
                debugString += "X"; // DebuggingebugString
                index = i;
            }

            debugString += "["; // Debugging
            debugString += lists[i]; // Debugging
            debugString += "]"; // Debugging
            
            
        }
        console.log(debugString); // Debugging

        lists.splice(index, 1);
        movie_to_update.lists = lists;

        debugString = ""; // Debugging
        debugString += "Lists in movie: "

        for (let i = 0; i < lists.length; i++) {
            if (list == lists[i]) {
                debugString += "X"; // DebuggingebugString
            }

            debugString += "["; // Debugging
            debugString += lists[i]; // Debugging
            debugString += "]"; // Debugging
            
            
        }

        console.log(debugString); // Debugging

        await updateMovieDB(movie_to_update);
        
        console.log("movie_to_update.lists: " + movie_to_update.lists); // Debugging


        if (movie_to_update.lists == undefined || movie_to_update.lists == "undefined" || movie_to_update.lists == "") {
            await movieList.removeMovie(movie_to_update);
            await deleteMovieDB(movie_to_update);
        }
        else{
            await this.updateMovie(movie_to_update);
            this.showList(list);
        }






        /*
        for (let i = 0; i < movieElements.length; i++) {
            console.log("iteration: " + i)
            let movieElement = movieElements[i];
            movie_to_update = movieElement.movie;
            //console.log("lists: " + movie.lists[0])

            if (movie_to_update.id == movie.id) {
                console.log("Found movie: " + movie.title)

                console.log("typeof" + typeof movie_to_update.lists);

                if (typeof movie_to_update.lists == "string") {
                    console.log("is string");
                    let newArray = [list];
                    console.log(newArray);
                    movie_to_update.lists = newArray;
                    console.log("movie_to_update.inlists: " + movie_to_update.lists);
                    updateMovieDB(movie_to_update);

                }

                if (movie_to_update.lists.includes(list)) {
                    console.log("found list in movie lists");

                }
                else {
                    console.log("movie.inlists: " + movie_to_update.lists);
                    movie_to_update.lists.push(list);
                    movie_to_update.lists.sort();
        
                    updateMovieDB(movie_to_update);

                }
            }
            
        }
        */




    }

    async addMovie(movie){
        console.log("//-----MovieList.addMovie(" + this.type + "[" + movie.title + "])-----//"); // Debugging

        let type = this.type;
        type = type.slice(0, -1);

        if(movie.renderAs == "" || movie.renderAs == undefined || movie.renderAs == "undefined" || movie.renderAs == null || movie.renderAs == "null"){
            movie.renderAs = "poster"
        }

        let movieElement = new MovieElement(movie, type, this.showAs);
        await movieElement.init()
        movieElement.renderAs = movie.renderAs;
        movieElement.render();
        movieElement.setEventListeners();

        this.movieElements.push(movieElement);

        if (this.firstLoad != 1 && this.type != "searchResults") {
            movieList.update();
        }
        

    }

    removeMovie(movie){
        console.log("//-----removeMovie(" + this.type + ")-----//"); // Debugging

        let movieList = this.movieElements;

        
        for (let i = 0; i < this.movieElements.length; i++) {
            
            if (movie.id == this.movieElements[i].movie.id) {
                //console.log(i + ". " + movies[i].title + ", " + movies[i]); // Debugging
                this.movieElements.splice(i, 1);
            }

        }

        // Find Element and movie
        let movieElement = document.getElementById(movie.type + "_" + movie.id);

        movieElement.remove();

        if (this.type == "searchResults") {
            movieList_search.update(movie);
            
        }

    }

    closeMovie(){
        console.log("//-----closeMovie(" + this.type + ")-----//"); // Debugging

        let movieList = this.movieElements;

        
        for (let i = 0; i < this.movieElements.length; i++) {
            
            if (movie.id == this.movieElements[i].movie.id) {
                //console.log(i + ". " + movies[i].title + ", " + movies[i]); // Debugging
                this.movieElements.splice(i, 1);
            }

        }

        // Find Element and movie
        let movieElement = document.getElementById("movie_" + movie.id);

        movieElement.remove();

        if (this.type == "movies") {
            movieList_search.update();
            
        }



    }

    /*
    updateMovie(movie){
        console.log("//-----updateMovie(" + this.type + ")-----//"); // Debugging

        for (let i = 0; i < this.movieElements.length; i++) {

            if (movie.id == this.movieElements[i].movie.id) {
                this.movieElements[i].update(movie);
            }

        }

    }
    */

    // ----- ----- //
    rateMovie(movie, rating) {
        console.log("//-----rateMovie(" + movie.title + ", " + rating + ", " + this.type + ")-----//"); // Debugging

        for (let i = 0; i < this.movieElements.length; i++) {

            if (movie.id == this.movieElements[i].movie.id) {
                this.movieElements[i].movie.vote = rating;

            }

        }

        this.updateMovie(movie);

      
    }

}

// Genre
class Genre{
    constructor(genre){
        this.id = genre.id;
        this.name = genre.name;
        this.hidden = true;

    }


}





