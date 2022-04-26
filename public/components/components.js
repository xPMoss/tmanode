// ---------- COMPONENTS.JS ---------- //


// Movie poster
class Poster{

    constructor(movie, type){
        let image = document.createElement("img");
        image.classList.add("img-fluid");
        image.id = "poster_" + movie.id;
        image.setAttribute("type", movie.type);
        let size = {
            x:300,
            y:200
        }

        let src;

        if (type == "fullscreen") {
            size.x = 500;
            size.y = 750;
        }

        if (type == "poster" || type == "list" || type == "listItem") {
            size.x = 200;
            size.y = 300;
            image.style.cursor = "pointer";
        }


        if (type == "list" || type == "listItem") {
            image.width = 100;


        }

        if (movie.poster_path == null || movie.poster_path == "null") {
            src = "https://via.placeholder.com/" + size.x + "x" + size.y;
        }
        else{
            src = "https://image.tmdb.org/t/p/w" + size.x + "/" + movie.poster_path;

        }

        image.src = src;


        if (type != "fullscreen") {
            image.onclick = async function(e) { 
                e.preventDefault();
    
                let type = this.getAttribute("type");
                // Find Element and movie
                let id = this.id.replace("poster_", "");
                let movieElement = document.getElementById(type + "_" + id);
                let movie = movieElement.movie;
    
                console.log(movie) // Debugging
    
                movieElement.showMovie();
                
    
            };
        }
        

        

        return image;


    }

    fullscreen(movie){

    }

    list(movie){

    }

    poster(movie){

        /*
        image.onclick = async function(e) { 
            e.preventDefault();
            let parent =  e.target.parentElement.parentElement;
            console.log("Parent: " + parent.id); // Debugging

            let type = parent.getAttribute("object_type"); 

            

            var id = e.currentTarget.id;
            id = id.replace("image_", "");

            console.log("Clicked Movie: " + id); // Debugging
            let movie = await findMovie(id, type);
            
            showMovie(movie);

        };
        */
        
    }

    listItem(movie){




    }


}

// Teaser imaage
class TeaserImage{

    constructor(movie, type, file_path){
        let image = document.createElement("img");
        image.classList.add("img-fluid");
        image.id = "teaserImage_" + movie.id;
        image.setAttribute("type", movie.type);
        let size = {
            x:300,
            y:200
        }

        let src;

        if (type == "fullscreen") {
            size.x = 500;
            size.y = 750;
        }

        if (type == "poster" || type == "list" || type == "listItem") {
            size.x = 300;
            size.y = 200;
            image.style.cursor = "pointer";
        }


        if (type == "list" || type == "listItem") {
            image.width = 100;


        }

        size.x = 300;
        size.y = 450;

        if (movie.poster_path == null) {
            src = "https://via.placeholder.com/" + size.y + "x" + size.x;
        }
        else{
            src = "https://image.tmdb.org/t/p/w" + size.x + "/" + file_path;

        }

        image.src = src;


        if (type != "fullscreen") {
            image.onclick = async function(e) { 
                e.preventDefault();
    
                let type = this.getAttribute("type");
                // Find Element and movie
                let id = this.id.replace("poster_", "");
                let movieElement = document.getElementById(type + "_" + id);
                let movie = movieElement.movie;
    
                console.log(movie) // Debugging
    
                movieElement.showMovie();
                
    
            };
        }
        

        

        return image;


    }

    fullscreen(movie){

    }

    list(movie){

    }

    poster(movie){


        
    }

    listItem(movie){




    }


}

// Teaser imaage
class HeroImage{

    constructor(movie, type){
        let container = document.createElement("div");
        container.classList.add("row");
        container.classList.add("p-2");
        container.classList.add("m-0");
        //container.classList.add("mr-auto");
        //container.classList.add("ml-auto");



        let image = document.createElement("img");
        image.classList.add("col-12")
        image.classList.add("col-sm-9")
        image.classList.add("col-md-7")
        image.classList.add("p-0")
        image.classList.add("img-fluid");
        image.id = "heroImage_" + movie.id;
        image.setAttribute("type", movie.type);
        
        let size = {
            x:300,
            y:200
        }

        let src;

        if (type == "fullscreen") {
            size.x = 500;
            size.y = 750;
        }

        if (type == "poster" || type == "list" || type == "listItem" || type == "hero") {
            size.x = 300;
            size.y = 200;
            image.style.cursor = "pointer";
        }


        if (type == "list" || type == "listItem") {
            image.width = 100;


        }

        size.x = 300;
        size.y = 450;

        if (movie.poster_path == null) {
            src = "https://via.placeholder.com/" + size.y + "x" + size.x;
        }
        else{
            src = "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;

        }

        image.src = src;
        //image.style.opacity = 0;
        

        if (type != "fullscreen") {
            image.onclick = async function(e) { 
                e.preventDefault();
    
                let type = this.getAttribute("type");
                // Find Element and movie
                let id = this.id.replace("heroImage_", "");
                let movieElement = document.getElementById(type + "_" + id);
                let movie = movieElement.movie;
    
                console.log(movie) // Debugging
    
                movieElement.showMovie();
                
    
            };
        }

        let movieContainer = document.createElement("div");
        movieContainer.classList.add("row");
        movieContainer.classList.add("mx-2");
        movieContainer.classList.add("mx-sm-0");
        movieContainer.classList.add("my-4");
        movieContainer.classList.add("my-sm-2");
        movieContainer.classList.add("p-0");
        movieContainer.classList.add("p-sm-2");
        movieContainer.classList.add("p-md-0");
        movieContainer.style.position = "absolute";
        movieContainer.style.zIndex = 100;
        



        let poster = document.createElement("img");
        poster.id = "poster_" + movie.id;
        poster.setAttribute("type", movie.type);
        poster.classList.add("img-fluid");
        poster.setAttribute("type", movie.type);
        let poster_src;
        if (movie.poster_path == null) {
            poster_src = "https://via.placeholder.com/" + size.y + "x" + size.x;
        }
        else{
            poster_src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;

        }
        poster.src = poster_src;


        let movieText = document.createElement("div");
        movieText.classList.add("text-black");
        //movieText.classList.add("p-4");
        //movieText.classList.add("pt-0");
        movieText.style.fontSize = "0.8rem"
        //movieText.style.background = "rgba(40, 40, 40, 0.5)";
        //movieText.classList.add("bg-primary");
        //line-height: 80%'

        let string = ""

        
        string += "<text style='font-size: 1rem; font-weight: 600;'>" + movie.title + "&nbsp;</text>";
        string += "<text>(" + getYear(movie.release_date) + ")</text>";
        string += "<br/>";

        string += "<text style='font-weight: 600;'>Genre: </text>";
        for (let i = 0; i < movie.genres.length; i++) {
            string += movie.genres[i].name;

            if (i < movie.genres.length-1) {
                string += ", ";
            }
            
        }
        
        string += "<br/>";
        string += "<text style='font-weight: 600;'>Längd: </text>" + timeConvert(movie.runtime);
        string += "<br/>";
        string += "<div><text style='font-weight: 600;'>Betyg: </text>" + movie.vote_average  + "</div>";
        

        movieText.innerHTML = string;


        let left = document.createElement("div");
        left.id = "left";
        left.classList.add("col-4")
        left.classList.add("col-sm-3")
        left.classList.add("col-md-2")
        left.classList.add("m-0")
        left.classList.add("p-0")
        left.classList.add("pr-2")

        let middle = document.createElement("div");
        middle.id = "middle";
        //middle.classList.add("col-8")
        middle.classList.add("col-8")
        middle.classList.add("col-sm-9")
        middle.classList.add("col-md-10")
        middle.classList.add("py-2")
        middle.classList.add("px-4")
        middle.style.background = "rgba(255, 255, 255, 0.7)";


        left.appendChild(poster);
        middle.appendChild(movieText);
        //right.appendChild();

        container.appendChild(left);
        container.appendChild(middle);
        //container.appendChild(right);
        //container.appendChild(gradient);

        
        container.style.background = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0) 100%)";
        container.style.background += ", url('"+src+"')";
        container.style.backgroundSize =  "cover";

        //movieContainer.appendChild(poster);
        //movieContainer.appendChild(movieText);
        //container.appendChild(movieContainer);

        poster.style.cursor = "pointer";

        if (type != "fullscreen") {
            poster.onclick = async function(e) { 
                e.preventDefault();
    
                let type = this.getAttribute("type");
                console.log("type in hero: " + type + "<-------") // Debugging

                // Find Element and movie
                let id = this.id.replace("poster_", "");
                console.log("id in hero: " + type + "<-------") // Debugging
                let movieElement = document.getElementById(type + "_" + id);

                console.log("Movie in hero: " + movieElement + "<-------") // Debugging
    
                let movie = movieElement.movie;
    
                console.log("Movie in hero: " + movie.title + "<-------") // Debugging
    
                movieElement.showMovie();
                
    
            };
        }

        return container;


    }

    fullscreen(movie){

    }

    list(movie){

    }

    poster(movie){


        
    }

    listItem(movie){




    }


}

// Movie info
class MovieInfo{

    constructor(movie, type){
        let movieInfo = document.createElement("p");

        if (type == "fullscreen") {
            movieInfo = this.fullscreen(movie);
        }

        if (type == "poster") {
            movieInfo = this.poster(movie);
        }

        if (type == "list") {
            movieInfo = this.list(movie);
        }

        return movieInfo;
    }

    fullscreen(movie){
        let movieInfo = document.createElement("p");
        movieInfo.classList.add("col-12");
        movieInfo.classList.add("m-0");
        movieInfo.classList.add("p-0");
        movieInfo.classList.add("mt-4");
        movieInfo.classList.add("mb-2");
        

        let string = "";
        string += "<text style='font-size:1.4rem; font-weight: 600; line-height: 80%'>" + movie.title + "&nbsp;</text>";
        string += "<text>(" + getYear(movie.release_date) + ")</text>";
        string += "<br/>";

        string += "<text style='font-weight: 600;'>Genre: </text>";
        for (let i = 0; i < movie.genres.length; i++) {
            string += movie.genres[i].name;

            if (i < movie.genres.length-1) {
                string += ", ";
            }
            
        }
        
        string += "<br/>";
        string += "<text style='font-weight: 600;'>Längd: </text>" + timeConvert(movie.runtime);
        string += "<br/>";
        string += "<div><text style='font-weight: 600;'>Tmdb betyg: </text>" + movie.vote_average  + "</div>";
        string += "<div class='my-2'><text style='font-weight: 600;'>Översikt: </text>" + movie.overview + "</div>";
        string += "<div><text style='font-weight: 600;'>Leverantörer: </text>";
        
        let go = false;

        if (movie.providers != undefined) {
            go = true

            for (let i = 0; i < movie.providers.length; i++) {
                if (movie.providers[i].provider_name == "Disney Plus") {
                    string += movie.providers[i].provider_name;
                }
                else{
                    string += movie.providers[i].provider_name;
                }

                
    
                if (i < movie.providers.length-1) {
                    string += ", ";
                }
                
            }
        }

        if(!go){
            string += "<text class='text-info'>Inga svenska</text>";
            console.log("SE.Flatrate: undefined") // Debugging
        }
        string += "</div>";

        //string += "<br/>";
        //string += "ID: " + movie.id + "";

        movieInfo.innerHTML += string;

        return movieInfo;
    }

    list(movie){
        let movieInfo = document.createElement("p");
        movieInfo.style.lineHeight  = "100%";

        let string = "";
        
        string += "<small>";
        string += "<text style='font-size:0.9rem; font-weight: 600;'>" + movie.title + "&nbsp;</text>";
        
        if (movie.release_date != "") {
            string += "<text>(" + getYear(movie.release_date) + ")</text>";
        }

        string += "<br/>";
        string += "Genre: ";
        for (let i = 0; i < movie.genres.length; i++) {
            string += movie.genres[i].name;

            if (i < movie.genres.length-1) {
                string += ", ";
            }
            
        }
        string += "<br/>";
        string += "Längd: " + timeConvert(movie.runtime);
        string += "<br/>";
        string += "Tmdb betyg: " + movie.vote_average;
 
        /*
        let overview = movie.overview.substring(0, 200);
        overview += "...";
        string += "<div class='my-2'><text style='font-weight: 600;'>Översikt: </text>" + overview + "</div>";
        */

        // Providers
        string += "<br/>";
        string += "Leverantörer: ";
        let go = false;

        if (movie.providers != undefined) {
            go = true

            for (let i = 0; i < movie.providers.length; i++) {
                string += movie.providers[i].provider_name;
    
                if (i < movie.providers.length-1) {
                    string += ", ";
                }
                
            }
        }

        if(!go){
            string += "<text class='text-info'>Inga svenska</text>";
            //console.log("SE.Flatrate: undefined") // Debugging
        }
       
        string += "</small>";
        
        movieInfo.innerHTML += string;

        return movieInfo;
    }

    poster(movie){
        let movieInfo = document.createElement("p");
        movieInfo.style.lineHeight  = "90%";

        let string = "";
        string += "<small>";

        string += "<text style='font-size:0.9rem; font-weight: 600;'>" + movie.title + "&nbsp;</text>";
        
        if (movie.release_date != "") {
            string += "<text>(" + getYear(movie.release_date) + ")</text>";
        }
        //string += "<br/>";
        //string += this.id;
        string += "<br/>";
        string += "Genre: ";
        for (let i = 0; i < movie.genres.length; i++) {
            string += movie.genres[i].name;

            if (i < movie.genres.length-1) {
                string += ", ";
            }
            
        }
        string += "<br/>";
        string += "Längd: " + timeConvert(movie.runtime);
        string += "<br/>";
        string += "Tmdb betyg: " + movie.vote_average;

        // Providers
        string += "<br/>";
        string += "Leverantörer: ";
        let go = false;

        if (movie.providers != undefined) {
            go = true

            for (let i = 0; i < movie.providers.length; i++) {
                string += movie.providers[i].provider_name;
    
                if (i < movie.providers.length-1) {
                    string += ", ";
                }
                
            }
        }

        if(!go){
            string += "<text class='text-info'>Inga svenska</text>";
            //console.log("SE.Flatrate: undefined") // Debugging
        }
       
        string += "</small>";
        
        movieInfo.innerHTML += string;

        return movieInfo;
    }




}

// Bootstrap icons
class Icon {
    constructor(_icon, color, size) {
        this.icon = document.createElement("i");

        this.icon.update = (movie) => {


        }

        if (_icon == "bi-arrow-up-circle") {
            this.icon.classList.add("bi");
            this.icon.classList.add("bi-arrow-up-circle");
        }

        if (_icon == "bi-arrow-up-circle-fill") {
            this.icon.classList.add("bi");
            this.icon.classList.add("bi-arrow-up-circle-fill");
        }

        if (_icon == "bi-star-fill") {
            this.icon.classList.add("bi");
            this.icon.classList.add("bi-star-fill");
        }

        if (_icon == "bi-star") {
            this.icon.classList.add("bi");
            this.icon.classList.add("bi-star");
        }

        if (_icon == "bi-star" || _icon == "bi-star-fill") {
            
            this.icon.onclick = async function(e) { 
                e.preventDefault();
    
                let rating = this.getAttribute("rating");
                let type = this.getAttribute("type");
                let movieType = this.getAttribute("movieType");

                // Find Element and movie
                let id = this.id.replace("rate_", "");
                let movieElement = document.getElementById(movieType + "_" + id);
                let movie = movieElement.movie;

                let ratingElement = document.getElementById("rating_" + id);

                //let btn = e.currentTarget;
                //let id = btn.id;
                movie.vote = rating;
                updateMovieDB(movie);
                
                ratingElement.update(movie, "");

                await updateMovieDB(movie);

                
    
                console.log("// ----- RATE BTN ----- //"); // Debugging
                console.log("Title: " + movie.title); // Debugging
                console.log("Rate: " + rating); // Debugging
    
            };
            

            /*
            icon.onclick = async function(e) { 
                e.preventDefault();
    
                let scrollPosition = document.body.getBoundingClientRect().top;
                scrollPosition = -scrollPosition;

                // Find Element and movie
                let id = this.id.replace("delete_", "");
                let movieElement = document.getElementById( type + "_" + id);

                let btn = e.currentTarget;
                let id = btn.id;
                let rating = btn.getAttribute("rating");
                let type = btn.getAttribute("type");

                id = id.replace("rate_", "");

                let movie = await findMovie(id, "movies");
                await rateMovie(movie, rating, type);
                window.scrollTo(0, scrollPosition);
    
                console.log("// ----- RATE BTN ----- //"); // Debugging
                console.log("Title: " + movie.title); // Debugging
                console.log("Rate: " + rating); // Debugging
    
            };
            */

            this.icon.style.cursor = "pointer";
        }

        if (_icon == "bi-eye-fill") {
            this.icon.classList.add("bi");
            this.icon.classList.add("bi-eye-fill");
        }

        if (_icon == "bi-eye-slash") {
            this.icon.classList.add("bi");
            this.icon.classList.add("bi-eye-slash");
        }

        if (_icon == "bi-eye-fill" || _icon == "bi-eye-slash") {
            this.icon.style.cursor = "pointer";
        }

        if (_icon == "plus-circle") {
            
        }

        if (_icon == "plus-circle-dotted") {
            
        }

        if (_icon == "plus-circle-fill") {
        }

        // Set props
        if(color){
            this.icon.classList.add(color);

        }

        if(size){
            this.icon.style.fontSize = size + "rem";

            if(size >= 1 && size <= 1.2){
                //icon.classList.add("ml-1");


            }

            if(size > 1.2 && size <= 1.4){
                //icon.classList.add("ml-2");


            }

            if(size > 1.4 && size <= 1.6){
                //icon.classList.add("ml-3");


            }

            if(size > 1.6 && size <= 1.8){
                //icon.classList.add("ml-4");


            }
            
        }
        
        
        
        //icon.width = 32;
        //icon.height = 32;
        
        return this.icon;


    }


}


