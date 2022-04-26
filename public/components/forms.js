// ---------- FORMS.JS ---------- //


// Show movies in list...
class ListForm extends HTMLFormElement {
    constructor(movieList){
        super();
        
        console.log("<| new ListForm(" + movieList.type + ") |>"); // Debugging
        console.log("this: " + this); // Debugging

        this.id = "movie-list-form";

        this.movieLists = movieList.movieLists;



        this.container;
        this.container = document.getElementById("movieListsForm");

        this.classList.add("form");

        this.createOptions();
        this.addEvent();
        

        this.update = () => {
            //console.log("updating: " + this.select.id) // Debugging

            console.log("updating: movie-list-form" + this) // Debugging
            this.innerHTML = "";

            this.createOptions();
            this.addEvent();


        }

        

        this.container.appendChild(this);
        
    }

    createOptions(){
        this.select = document.createElement("select");
        this.select.classList.add("form-control");
        this.select.id = "selectMovieList"

        this.option;

        this.option = document.createElement("option");
        this.option.innerHTML = "Alla filmer";
        this.option.id = "option_all";
        this.option.setAttribute("movieList", "all");
        this.select.appendChild(this.option);

        for (let i = 0; i < this.movieLists.length; i++) {
            //console.log("Making options: " + i) // Debugging
            let list = this.movieLists[i].title;
            this.option = document.createElement("option");
            this.option.innerHTML = list.charAt(0).toUpperCase() + list.slice(1);
            this.option.id = "option_" + list;
            this.option.setAttribute("movieList", list);
            this.select.appendChild(this.option);
            
        }

        this.option = document.createElement("option");
        this.option.innerHTML = "Skapa ny lista...";
        this.option.id = "option_new";
        this.option.setAttribute("movieList", "new");
        this.select.appendChild(this.option);

        this.appendChild(this.select);
        
    }

    addEvent(){

        this.addEventListener("change", function() {
            
            console.log("this: " + this) // Debugging
            
            let object = this.select.options[this.select.selectedIndex];
            let list = object.getAttribute("movieList");
            let id = this.id.replace("option_", "");

            console.log("Changed to list: " + object.value) // Debugging

            if (list == "new") {
                let movie = {
                    id: null,
                    typ: null,
                }
                let createNewList = new CreateNewList("movie-list-form", movie);
                //this.update();
            }
            else{
                movieList.showList(list);
            }
            

        }); 



    }
}
customElements.define('form-element', ListForm, {extends: 'form'});

// Sort mvoies by...
class SortForm{
    constructor(_movieList){
        console.log("<| new SortForm(" + _movieList.type + ") |>"); // Debugging

        let container;

        if (_movieList.type == "movies") {
            container = document.getElementById("sortMoviesForm");
        }

        if (_movieList.type == "searchResults") {
            container = document.getElementById("sortSearchForm");

        }

        let form = document.createElement("form");
        form.classList.add("form");

        let select = document.createElement("select");
        select.classList.add("form-control");

        if (_movieList.type == "movies") {
            select.id = "selectMovie"
        }

        if (_movieList.type == "searchResults") {
            select.id = "selectSearch"

        }

        // select.options[select.selectedIndex].value
        let run;
        //run = _movieList.sortMovies(select.options[select.selectedIndex].value, 'reverse');
        //select.setAttribute("onchange", "_movieList.sortMovies(" + this + ", '')");
        // add event handler to update the cookie each time you change the select
        select.addEventListener("change", function() {

            let object = this.options[this.selectedIndex];
            let order = object.getAttribute("order");

            let list;

            if (this.id == "selectMovie") {
                list = movieList;
                
            }
    
            if (this.id == "selectSearch") {
                list = movieList_search;
    
            }

            list.sortMovies(this.options[this.selectedIndex].id, order);

        }); 

        let option = document.createElement("option");
        option.innerHTML = "Sortera efter titel (A...Ö)";
        option.id = "title";
        option.setAttribute("order", "");
        select.appendChild(option);

        option = document.createElement("option");
        option.innerHTML = "Sortera efter titel (Ö...A)";
        option.id = "title";
        option.setAttribute("order", "reverse");
        select.appendChild(option);

        option = document.createElement("option");
        option.innerHTML = "Sortera efter betyg (10...1)";
        option.id = "tmdb_rating";
        option.setAttribute("order", "reverse");
        select.appendChild(option);

        option = document.createElement("option");
        option.innerHTML = "Sortera efter betyg (1...10)";
        option.id = "tmdb_rating";
        option.setAttribute("order", "");
        select.appendChild(option);

        option = document.createElement("option");
        option.innerHTML = "Sortera efter år (Nyast)";
        option.id = "year";
        option.setAttribute("order", "reverse");
        select.appendChild(option);

        option = document.createElement("option");
        option.innerHTML = "Sortera efter år (Äldst)";
        option.id = "year";
        option.setAttribute("order", "");
        select.appendChild(option);

        form.appendChild(select);
        container.appendChild(form);
    }

}

// Show movies as...
class ShowAsForm{
    constructor(movieList){
        console.log("<| new ShowAs(" + movieList.type + ") |>"); // Debugging
        this.showAs;

        if (movieList.type == "movies") {
            this.showAs = document.getElementById("showAs_movies");
        }

        if (movieList.type == "searchResults") {
            this.showAs = document.getElementById("showAs_search");
            this.showAs.style.display = "hidden";
        }
        
        let header = document.createElement("div");
        header.classList.add("mb-2")
        header.innerHTML = "Visa som: ";
        this.showAs.appendChild(header);

        this.posterBtn = document.createElement("div");
        this.posterBtn.id = movieList.type;
        this.posterBtn.classList.add("btn");
        this.posterBtn.classList.add("mr-2");
        this.posterBtn.innerHTML = "Poster info";

        this.listBtn = document.createElement("div");
        this.listBtn.id = movieList.type;
        this.listBtn.classList.add("btn");
        this.listBtn.classList.add("mr-2");
        this.listBtn.innerHTML = "Lista";

        this.posterSmallBtn = document.createElement("div");
        this.posterSmallBtn.id = movieList.type;
        this.posterSmallBtn.classList.add("btn");
        this.posterSmallBtn.classList.add("mr-2");
        this.posterSmallBtn.innerHTML = "Liten";
    

        if (movieList.showAs == "poster") {
            this.posterBtn.classList.add("btn-outline-primary");
            this.listBtn.classList.add("btn-outline-primary");
            this.posterSmallBtn.classList.add("btn-outline-primary");

            this.posterBtn.classList.add("active");
        }

        if (movieList.showAs == "list"){
            this.posterBtn.classList.add("btn-outline-primary");
            this.listBtn.classList.add("btn-outline-primary");
            this.posterSmallBtn.classList.add("btn-outline-primary");

            this.listBtn.classList.add("active");
        }

        if (movieList.showAs == "posterSmall"){
            this.posterBtn.classList.add("btn-outline-primary");
            this.listBtn.classList.add("btn-outline-primary");
            this.posterSmallBtn.classList.add("btn-outline-primary");

            this.posterSmallBtn.classList.add("active");

        }

        this.events();

        this.showAs.appendChild(this.posterBtn);
        this.showAs.appendChild(this.listBtn);
        this.showAs.appendChild(this.posterSmallBtn);


        this.posterBtn.update = () => {
            this.posterBtn.classList.remove("active");
            this.listBtn.classList.remove("active");
            this.posterSmallBtn.classList.remove("active");

            if (movieList.showAs == "poster") {
                this.posterBtn.classList.add("active");
            }
    
            if (movieList.showAs == "list"){
                this.listBtn.classList.add("active");
            }

            if (movieList.showAs == "posterSmall"){
                this.posterSmallBtn.classList.add("active");
            }

        }

        this.listBtn.update = () => {
            this.posterBtn.classList.remove("active");
            this.listBtn.classList.remove("active");
            this.posterSmallBtn.classList.remove("active");

            if (movieList.showAs == "poster") {
                this.posterBtn.classList.add("active");
            }
    
            if (movieList.showAs == "list"){
                this.listBtn.classList.add("active");
            }

            if (movieList.showAs == "posterSmall"){
                this.posterSmallBtn.classList.add("active");
            }

        }

        this.posterSmallBtn.update = () => {
            this.posterBtn.classList.remove("active");
            this.listBtn.classList.remove("active");
            this.posterSmallBtn.classList.remove("active");

            if (movieList.showAs == "poster") {
                this.posterBtn.classList.add("active");
            }
    
            if (movieList.showAs == "list"){
                this.listBtn.classList.add("active");
            }

            if (movieList.showAs == "posterSmall"){
                this.posterSmallBtn.classList.add("active");
            }

        }

        /*
        this.poster = document.createElement("i");
        this.poster.id = _movieList.type;
        this.poster.classList.add("btn");
        this.poster.classList.add("bi");
        this.poster.classList.add("bi-file");
        this.poster.style.fontSize = "2rem";
        this.poster.classList.add("m-0");
        this.poster.classList.add("p-0");
        

        this.list = document.createElement("i");
        this.list.id = _movieList.type;
        this.list.classList.add("btn");
        this.list.classList.add("bi");
        this.list.classList.add("bi-list");
        this.list.style.fontSize = "2rem";
        this.list.classList.add("m-0");
        this.list.classList.add("p-0");

        if (_movieList.showAs == "poster") {
            this.list.classList.add("btn-primary");
            this.list.classList.add("btn-outline-secondary");
        }

        if (_movieList.showAs == "list"){
            this.list.classList.add("btn-primary");

        }

        this.list.update = (movie) => {
            this.listBtn.className = ""; // Reset classes
            this.posterBtn.className = ""; // Reset classes

            this.listBtn.classList.add("btn");
            this.posterBtn.classList.add("btn");

            if (_movieList.showAs == "poster") {
                this.listBtn.classList.add("btn-outline-secondary");
                this.posterBtn.classList.add("btn-primary");
            }
    
            if (_movieList.showAs == "list"){
                this.listBtn.classList.add("btn-primary");
                this.posterBtn.classList.add("btn-outline-secondary");
            }

    

            

        }
        */


        this.events();

        //showAs.appendChild(this.poster);
        //showAs.appendChild(this.list);

        

    }


    events(){
        this.posterSmallBtn.onclick = async function(e) { 
            e.preventDefault();

            // Find Element and movie
            //let id = this.id.replace("delete_", "");
            //let movieElement = document.getElementById("movie_" + id);
            //let movie = movieElement.movie;

            let movieElements;
            let type = this.id;

            if(type == "movies"){
                movieList.showAs = "posterSmall";
                movieElements = movieList.movieElements;
            }

            if(type == "searchResults"){
                movieList_search.showAs = "posterSmall";
                movieElements = movieList_search.movieElements
            }
 
            for (let i = 0; i < movieElements.length; i++) {
                movieElements[i].renderAs = "posterSmall";
                movieElements[i].render();


            }

            this.update();

        };


        this.listBtn.onclick = async function(e) { 
            e.preventDefault();

            // Find Element and movie
            //let id = this.id.replace("delete_", "");
            //let movieElement = document.getElementById("movie_" + id);
            //let movie = movieElement.movie;

            let movieElements;
            let type = this.id;

            if(type == "movies"){
                movieList.showAs = "list";
                movieElements = movieList.movieElements;
            }

            if(type == "searchResults"){
                movieList_search.showAs = "list";
                movieElements = movieList_search.movieElements
            }
 
            for (let i = 0; i < movieElements.length; i++) {
                movieElements[i].renderAs = "list";
                movieElements[i].render();


            }

            this.update();

        };


        this.posterBtn.onclick = async function(e) { 
            e.preventDefault();

            // Find Element and movie
            //let id = this.id.replace("delete_", "");
            //let movieElement = document.getElementById("movie_" + id);
            //let movie = movieElement.movie;

            let movieElements;
            let type = this.id;

            if(type == "movies"){
                movieList.showAs = "poster";
                movieElements = movieList.movieElements
            }

            if(type == "searchResults"){
                movieList_search.showAs = "poster";
                movieElements = movieList_search.movieElements
            }
 
            for (let i = 0; i < movieElements.length; i++) {
                movieElements[i].renderAs = "poster";
                movieElements[i].render();


            }

            this.update();
  

        };




    }

}