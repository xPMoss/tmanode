// ---------- USER_COMPONENTS.JS ---------- //

// User //
class User{
    constructor(){
        console.log("//-----User()-----//"); // 
        this.id;
        this.username;
        this.email;
        this.password;
        this.firstname;
        this.surname;
        this.birthday;
        this.gender;
        this.address;
        this.last_login;
        this.created;
        this.role;

        this.prefs;

    }

    async init(){
        
        let user = await getUserFS();

        console.log("//-----User.init(" + user.username + ")-----//")

        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.firstname = user.firstname;
        this.surname = user.surname;
        this.birthday = user.birthday;
        this.gender = user.gender;
        this.address = user.address;
        this.last_login = user.last_login;
        this.created = user.created;
        this.role = user.role;

        this.prefs = await new Prefs();
        console.log(this.prefs)

        this.translation = new Translation();

    }
}

// UserElement //
class UserElement extends HTMLDivElement {
    constructor(user){
        super();

        this.user = user;
        console.log(this.user)

        if(location.pathname=="/profile"){
            this.container = document.getElementById("profile");
        }

        if(location.pathname=="/home"){
            this.container = document.getElementById("homeHeader");
        }

        

    }

    async init(){
        console.log("//-----UserElement.init()-----//")

    }


    update(){
        console.log("//-----UserElement.update()-----//")
        this.render();

    }

    renderHome(){
        console.log("//-----UserElement.renderHome()-----//")

        this.innerHTML = ""; // Reset
        this.className = ""; // Reset classes
        this.classList.add("row")

        let user = this.user;
        
        let container = document.createElement("div");
        container.id = this.id;
        container.classList.add("col-12");
        //container.classList.add("mt-4");

        let p = document.createElement("div");

        let string = "";

        string += "Välkommen" ;

        if(user.firstname != null && user.firstname != undefined && user.firstname != "") {
            string +=" " + user.firstname;
        }
        else{
            string +=" " + user.username;
        }
        
        string += "</br>";
        string += "";


        p.innerHTML = string;

        container.appendChild(p);

        this.appendChild(container);

        this.container.appendChild(this);


    }

    async renderProfile(){
        console.log("//-----UserElement.renderProfile()-----//")
        this.innerHTML = ""; // Reset
        this.className = ""; // Reset classes

        let user = this.user;
        
        let container = document.createElement("div");
        container.id = this.id;
        container.classList.add("col");

        let p = document.createElement("div");

        let string = "";

        string += "Användarnamn: " + user.username;
        string += "<br/>";

        string += "Lösenord: " + user.password;
        string += "<br/>";
       
        string += "Email: " + user.email;

        string += "<br/>";
        string += "Namn: ";
        if (user.firstname != null) {
            string += user.firstname;
        }

        if (user.surname != null) {
            string += " ";
            string += user.surname;
        }
        
        
        if (user.birthday != null) {
            string += "<br/>";
            string += "Födelsedag: ";
            string += getDate(user.birthday);
        }

        let prefs = await getPrefsDB("all");
        this.prefs = prefs;

        if (user.prefs.genres.liked.length > 0) {
            let genres = user.prefs.genres.liked;
            string += "<br/><br/>";
            string += "Gillade genrer: ";
            for (let i = 0; i < genres.length; i++) {
                string += genres[i].name;

                if (i < genres.length-1) {
                    string += ", ";
                }
                
            }
            
        }

        if (user.prefs.genres.disliked.length > 0) {
            let genres = user.prefs.genres.disliked;
            string += "<br/>";
            string += "Ogillade genrer: ";
            for (let i = 0; i < genres.length; i++) {
                string += genres[i].name;

                if (i < genres.length-1) {
                    string += ", ";
                }
                
            }
            
        }

        if (user.prefs.keywords.liked.length > 0 || user.prefs.keywords.disliked.length > 0) {
            string += "<br/>";
        }

        if (user.prefs.keywords.liked.length > 0) {
            let keywords = user.prefs.keywords.liked;
            string += "<br/>";
            string += "Gillade sökord: ";
            for (let i = 0; i < keywords.length; i++) {
                string += keywords[i].name;

                if (i < keywords.length-1) {
                    string += ", ";
                }
                
            }
            
        }

        if (user.prefs.keywords.disliked.length > 0) {
            let keywords = user.prefs.keywords.disliked;
            string += "<br/>";
            string += "Ogillade sökord: ";
            for (let i = 0; i < keywords.length; i++) {
                string += keywords[i].name;

                if (i < keywords.length-1) {
                    string += ", ";
                }
                
            }
            
        }

        if (user.prefs.search.length > 0 && user.prefssearch != "undefined") {
            string += "<br/>";
        }

        if (user.prefs.search.length > 0 && user.prefssearch != "undefined") {
            string += "<br/>";
            let search = user.prefs.search;
            string += "Sökhistorik: ";
            for (let i = 0; i < search.length; i++) {
                string += search[i];

                if (i < search.length-1) {
                    string += ", ";
                }
                
            }
        }



        

        p.innerHTML = string;

        container.appendChild(p);

        this.appendChild(container);

        this.container.appendChild(this);
        
    }

}

customElements.define('user-element', UserElement, {extends: 'div'});

// Prefs //
class Prefs{
    constructor(){
        this.language = language;
        this.region = region;

        this.prefs;

        this.genres;
        this.keywords
        this.search;

        this.certification = null;
        this.with_genres = null;
        this.without_genres = null;
        this.sort_by = "popularity.desc";

        this.init();


    }

    async init(){
        console.log("//-----Prefs.init()-----//")
        let prefs = await getPrefsDB("all");
        this.prefs = prefs;

        this.genres = {
            liked: prefs.genres.liked,
            disliked: prefs.genres.disliked,
        }

        // Set liked genres
        let value = "";
        for (let i = 0; i < this.prefs.genres.liked.length; i++) {
            value +=  this.prefs.genres.liked[i].id;

            if (i < this.prefs.genres.liked.length-1) {
                value += ",";
            }
        }
        this.with_genres = value;

        // Set disliked genres
        value = "";
        for (let i = 0; i < this.prefs.genres.disliked.length; i++) {
            value +=  this.prefs.genres.disliked[i].id;

            if (i < this.prefs.genres.disliked.length-1) {
                value += ",";
            }
        }
        this.without_genres = value;


        this.keywords = {
            liked: prefs.keywords.liked,
            disliked: prefs.keywords.disliked,
        }

        this.search = prefs.search;

    }

    update(){


    }



}

// Translation //
class Translation{
    constructor(type){
        this.language = language;
        this.region = region;

        if (this.language = "sv") {
            this.sv(type);
        }




        //topRatedMovies 
        //popularMovies
        //teasers
        //lists
        //movies
        //searchResults
    }

    sv(type){
        this.loading = "Laddar";
        this.trending_movies = "Trendande filmer";
        this.top_rated_movies = "Filmer med toppbetyg";
        this.popular_movies = "Populära filmer"
        this.profile = "Profil"
        this.discover = "Filmtips";

        if (type == "discovers") {
            this.type = "Filmtips";
        }

        if (type == "trendingMovies") {
            this.type = "Trendande filmer";
        }

        if (type == "topRatedMovies") {
            this.type = "Filmer med toppbetyg";
        }

        if (type == "popularMovies") {
            this.type = "Populära filmer";
        }

        if (type == "teasers") {
            this.type = "Teasers";
        }

        if (type == "movies") {
            this.type = "Filmer";
        }

        if (type == "searchResults") {
            this.type = "Sökresultat";
        }

        if (type == "lists") {
            this.type = "Listor";
        }

    }



}


