// ---------- BUTTONS.JS ---------- //



// Add movie button
class Addbtn{

    constructor(movie, type){
        this.type = type;
        this.movie = movie;

        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.id = "addContainer_" + movie.id;

        // Add Button
        this.addbtn = document.createElement("div");
        this.addbtn.id = "add_" + movie.id;
        
        this.addbtn.classList.add("btn");
        this.addbtn.classList.add("btn-primary");

        this.addbtn.setAttribute("type", movie.type);
        this.addbtn.setAttribute("display", type);
        this.addbtn.setAttribute("showLists", false);

        this.addbtn.innerHTML = "Add";

        if (type == "fullscreen") {
            this.fullscreen();
        }

        if (type == "list") {
            this.addbtn.style.fontSize = "1rem";
            this.list();
        }

        if (type == "poster") {
            this.poster();
        }
        
        this.addbtn.onclick = async function(e) { 
            e.preventDefault();

            let display = this.getAttribute("display");

            // Find Element and movie
            let id = this.id.replace("add_", "");
            let type = this.getAttribute("type");

            let movieElement;
            movieElement = document.getElementById(type + "_" + id);

            let movie = movieElement.movie;
            movie.showLists = true;

            if (display != "fullscreen") {
                movieElement.update(movie);
            }
            else{
                movieElement.updateShowMovie(movie);

            }
            
            //movieElement.render();

            console.log("Clicked add Movie: " + movie.title + ", id: " + movie.id + ", found: " + movie.found); // Debugging

            

        };

        if(movie.showLists == true){
            this.createForm();

        }

        if(movie.showLists == false){
            this.container.appendChild(this.addbtn);

        }

 


        //this.addEvent();
        
        return this.container

    }

    addEvent(){
        this.addbtn.onclick = async function(e) { 
            e.preventDefault();

            // Find Element and movie
            let id = this.id.replace("add_", "");
            let movieElement;
            let type = this.getAttribute("type");

            movieElement = document.getElementById(type + "_" + id);

            let movie = movieElement.movie;

            console.log("Clicked add Movie: " + movie.title + ", id: " + movie.id + ", found: " + movie.found); // Debugging

            let data = await addMovieDb(movie);      
            console.log("returned data: " + data); // DEBUGGING

            if (data == "Already Reported") {
                showAlert(movie, "exist") // Visa meddelande
                console.log("Movie already in list: " + movie.title); // DEBUGGING
            }
            else{
                console.log("If not in list add: " + movie.title) // DEBUGGING
                showAlert(movie, "add") // Visa meddelande
                if (type == "searchResult") {
                    await movieList.addMovie(movie);
                }
                
                await addMovieDb(movie);
                this.remove() // remove button

            }


        };


    }

    createForm(){
        this.container.innerHTML = "";
        //let movieList_topRatedMovies;
        //let movieList_popularMovies;

        this.bkg = document.createElement("div");
        this.bkg.id = "bkg";
        this.bkg.style.zIndex = "5500";
        this.bkg.style.position = "fixed";
        this.bkg.style.top = 0;
        this.bkg.style.left = 0;
        this.bkg.style.backgroundColor = "rgba(100, 100, 100, 0.8)";

        this.bkg.classList.add("py-4");
        this.bkg.classList.add("px-4");

        //bkg.classList.add("bg-secondary");
        this.bkg.style.width = "100vw";
        this.bkg.style.height = "110vh";


        //this.container.appendChild(this.bkg);

        if ( this.type == "trendingMovies" ) {
            movieList = movieList_trendingMovies;

        }

        
        // Form
        this.form = document.createElement("form");
        this.form.id = "form_" + this.movie.id;
        this.form.setAttribute("type", this.movie.type);
        this.form.setAttribute("display", this.type);
        //this.form.style.width = "100vw";
        //this.form.classList.add("bg-primary");

        let label = document.createElement("label");
        label.classList.add("btn");
        label.classList.add("btn-primary");
        label.innerHTML = "Add";
        this.form.appendChild(label);

        this.select = document.createElement("select");
        this.select.classList.add("form-control");
        this.select.id = "selectMovieList"
        this.select.size = 5;

        this.option;

        this.option = document.createElement("option");
        this.option.innerHTML = "Mina filmer";
        this.option.id = "option_all";
        this.option.setAttribute("movieList", "all");
        this.select.appendChild(this.option);

        
        for (let i = 0; i < movieLists.length; i++) {
            //console.log("Making options: " + i)
            let list = movieLists[i].title;
            this.option = document.createElement("option");
            this.option.innerHTML = list.charAt(0).toUpperCase() + list.slice(1);
            this.option.id = "option_" + list;
            this.option.setAttribute("movieList", list);
            console.log(this.movie.lists);
            console.log("list: "  + list)
            if (this.movie.lists.includes(list)) {

            }
            else{
                this.select.appendChild(this.option);
            }


            
            
        }

        this.form.appendChild(this.select);

        this.cancel = document.createElement("label");
        this.cancel.id = "cancel_" + this.movie.id;
        this.cancel.setAttribute("type", this.movie.type);
        this.cancel.setAttribute("display", this.type);
        this.cancel.classList.add("btn");
        this.cancel.classList.add("btn-danger");
        this.cancel.innerHTML = "Avbryt";
        this.form.appendChild(this.cancel);

        this.cancel.onclick = async function(e) { 
            e.preventDefault();

            let display = this.getAttribute("display");
            // Find Element and movie
            let id = this.id.replace("cancel_", "");
            let type = this.getAttribute("type");

            let movieElement;
            movieElement = document.getElementById(type + "_" + id);

            let movie = movieElement.movie;
            movie.showLists = false;

            if (display != "fullscreen") {
                movieElement.update(movie);
            }
            else{
                movieElement.updateShowMovie(movie);

            }

            console.log("Clicked add Movie: " + movie.title + ", id: " + movie.id + ", found: " + movie.found);

            //let bkg = document.getElementById("bkg");
            //bkg.remove();

        };

        this.form.addEventListener("change", async function() {
            
            let select = this.getElementsByTagName('select')[0];

            console.log("this.select.selectedIndex: " + select.selectedIndex)

            let object = select.options[select.selectedIndex];
            let list = object.getAttribute("movieList");
 
            console.log("Add to list: " + object.value)

            // Find Element and movie
            let id = this.id.replace("form_", "");
            let type = this.getAttribute("type");
            let display = this.getAttribute("display");
            
            console.log("type: " + type);
            console.log("display: " + display);

            let movieElement;
            movieElement = document.getElementById(type + "_" + id);

            console.log("this.id: " + movieElement)

            let movie = movieElement.movie;
            movie.showLists = true;

            let data = await addMovieDb(movie);      
            console.log("returned data: " + data); // DEBUGGING

            if (data == "Already Reported") {
                showAlert(movie, "exist") // Visa meddelande
                console.log("Movie already in list: " + movie.title); // DEBUGGING
            }
            else{
                console.log("If not in list add: " + movie.title) // DEBUGGING
                showAlert(movie, "add") // Visa meddelande
                if (type == "searchResult") {
                    await movieList.addMovie(movie);
                }
                
                //await addMovieDb(movie);

                if (type == "movie" || type == "searchResult") {
                    movieList.addMovieToList(movie, list);
    
                }
                if (type == "list") {
                    movieList_lists.addMovieToList(movie, list);
    
                }

                if (type == "trendingMovie" || type == "topRatedMovies" || type == "popularMovies") {
                    movie.lists.push(list);
                    updateMovieDB(movie);

                }

                


    

            }


            movie.showLists = false;

            if (display != "fullscreen") {
                movieElement.update(movie);
            }
            else{
                movieElement.updateShowMovie(movie);

            }


            //let bkg = document.getElementById("bkg");
            //bkg.remove();
            
            

        }); 

        this.container.style.zIndex = "6000";
        this.container.appendChild(this.form);

    }


    fullscreen(){

    }

    list(){
        //this.container.style.position = "absolute";
        this.container.style.left = 0;
        this.container.classList.add("m-2");
        this.container.classList.add("ml-2");
    }

    poster(){
        //this.container.style.position = "absolute";
        this.container.style.left = 0;
        this.container.classList.add("m-2");
        this.container.classList.add("ml-3");

    }

}

// Add movie to list button (OLD)
class ListBtn extends HTMLDivElement{

    constructor(movie, type){
        console.log("//-----ListBtn.constructor(" + movie.title + "])-----//"); // Debugging
        super();

        this.id = "ListBtn_" + movie.id;
        this.classList.add("mb-4");

        this.type = type;
        this.movie = movie;

        this.container = document.createElement("div");
        this.container.classList.add("mb-4");

        this.container.id = "addToListContainer_" + movie.id;

        // Add Button
        this.addbtn = document.createElement("div");
        this.addbtn.id = "add_" + movie.id;
        
        this.addbtn.classList.add("btn");
        this.addbtn.classList.add("btn-primary");

        this.addbtn.setAttribute("type", movie.type);
        this.addbtn.setAttribute("display", type);
        this.addbtn.setAttribute("showLists", false);

        this.addbtn.innerHTML = "Lägg i lista";

        if (type == "fullscreen") {
            this.fullscreen();
        }

        if (type == "list") {
            this.addbtn.style.fontSize = "1rem";
            this.list();
        }

        if (type == "poster") {
            this.poster();
        }
        
        this.addbtn.onclick = async function(e) { 
            e.preventDefault();

            let LocalScrollPosition = document.body.getBoundingClientRect().top;
            LocalScrollPosition = -LocalScrollPosition;

            let display = this.getAttribute("display");

            // Find Element and movie
            let id = this.id.replace("add_", "");
            let type = this.getAttribute("type");


            let movieElement;
            movieElement = document.getElementById(type + "_" + id);

            let movie = movieElement.movie;
            movie.showLists = true;

            let listBtn = document.getElementById("ListBtn_" + id);
            listBtn.update(movie);

            /*
            if (display != "fullscreen") {
                movieElement.update(movie);
            }
            else{
                movieElement.updateShowMovie(movie);

            }
            */
            
            //movieElement.render();

            console.log("Clicked add Movie: " + movie.title + ", id: " + movie.id + ", found: " + movie.found);

            //window.scrollTo(0, LocalScrollPosition);

        };

        /*
        if(movie.showLists == true){
            this.createForm();

        }

        if(movie.showLists == false){
            this.container.appendChild(this.addbtn);

        }
        */
        this.update = (movie) => {
            console.log("//-----ListBtn.update(" + movie.title + "])-----//"); // Debugging
            console.log(movie)

            
            if(movie.showLists == true){
                this.innerHTML = "";
                this.createForm(movie);
    
            }
            else{
                this.innerHTML = "";
                this.classList.remove("bg-primary")
                this.classList.remove("p-2")
                this.classList.remove("rounded")
                this.appendChild(this.addbtn);
    
            }

        }  

        if(movie.showLists == true){
            this.innerHTML = "";
            this.createForm(movie);

        }
        else{
            this.innerHTML = "";
            this.classList.remove("bg-primary")
            this.classList.remove("p-2")
            this.classList.remove("rounded")
            this.appendChild(this.addbtn);

        }

        //this.addEvent();
        return this;

    }

    addEvent(){
       


    }

    createForm(){
        console.log("//-----ListBtn.createForm(" + this.movie.title + "])-----//"); // Debugging
        console.log(this.movie)

        this.innerHTML = "";
        this.classList.add("bg-primary")
        this.classList.add("p-2")
        this.classList.add("rounded")
        
        //let movieList_topRatedMovies;
        //let movieList_popularMovies;


        if ( this.type == "trendingMovies" ) {
            movieList = movieList_trendingMovies;

        }

        
        // Form
        let addform = document.createElement("form");
        addform.id = "form_" + this.movie.id;
        addform.setAttribute("type", this.movie.type);
        addform.setAttribute("display", this.type);
        //this.form.style.width = "100vw";
        //this.form.classList.add("bg-primary");



        let label = document.createElement("label");
        //label.classList.add("btn");
        //label.classList.add("btn-primary");
        label.classList.add("ml-2");
        label.style.fontSize = "1.3rem";
        label.innerHTML = "Lägg i lista";
        addform.appendChild(label);

        // Cancel
        this.cancel = document.createElement("label");
        this.cancel.id = "cancel_" + this.movie.id;
        this.cancel.setAttribute("type", this.movie.type);
        this.cancel.setAttribute("display", this.type);
        this.cancel.classList.add("btn");
        this.cancel.classList.add("btn-danger");
        this.cancel.classList.add("float-right");
        
        this.cancel.innerHTML = "X";
        addform.appendChild(this.cancel);

        this.cancel.onclick = async function(e) { 
            e.preventDefault();

            let display = this.getAttribute("display");
            // Find Element and movie
            let id = this.id.replace("cancel_", "");
            let type = this.getAttribute("type");

            let movieElement;
            movieElement = document.getElementById(type + "_" + id);

            let movie = movieElement.movie;
            movie.showLists = false;

            let listBtn = document.getElementById("ListBtn_" + id);
            listBtn.update(movie);

            /*
            if (display != "fullscreen") {
                movieElement.update(movie);
            }
            else{
                movieElement.updateShowMovie(movie);

            }
            */

            console.log("Clicked add Movie: " + movie.title + ", id: " + movie.id + ", found: " + movie.found);

            //let bkg = document.getElementById("bkg");
            //bkg.remove();

        };

        this.select = document.createElement("select");
        this.select.classList.add("form-control");
        this.select.id = "selectMovieList"
        this.select.size = 5;

        this.option;
        
        this.option = document.createElement("option");
        this.option.innerHTML = "Välj lista";
        this.option.selected = true;
        this.option.disabled = true;
        this.option.hidden = true;
        this.select.appendChild(this.option);

        for (let i = 0; i < movieLists.length; i++) {
            //console.log("Making options: " + i)
            let list = movieLists[i].title;
            this.option = document.createElement("option");
            this.option.innerHTML = list.charAt(0).toUpperCase() + list.slice(1);
            this.option.id = "option_" + list;

            if (list == "all") {
                this.option.setAttribute("movieList", "all");
            }
            else{
                this.option.setAttribute("movieList", list);
            }
            
            console.log(this.movie.lists);
            console.log("list: "  + list)
            if (this.movie.lists.includes(list)) {
                this.option.classList.add("text-info")
            }
            else{

            }

            this.select.appendChild(this.option);


            
            
        }

        this.option = document.createElement("option");
        this.option.innerHTML = "Skapa ny lista...";
        this.option.id = "option_new";
        this.option.setAttribute("movieList", "new");
        this.select.appendChild(this.option);

        addform.appendChild(this.select);

        addform.addEventListener("change", async function() {
            
            let select = this.getElementsByTagName('select')[0];

            console.log("this.select.selectedIndex: " + select.selectedIndex)

            let object = select.options[select.selectedIndex];
            let list = object.getAttribute("movieList");
 
            console.log("Add to list: " + object.value)

            // Find Element and movie
            let id = this.id.replace("form_", "");
            let type = this.getAttribute("type");
            let display = this.getAttribute("display");
            
            let listBtn = document.getElementById("ListBtn_" + id);

            console.log("type: " + type);
            console.log("display: " + display);

            let movieElement;
            movieElement = document.getElementById(type + "_" + id);

            console.log("this.id: " + movieElement)

            let movie = movieElement.movie;
            //movie.showLists = true;

            let data = await addMovieDb(movie);      
            console.log("returned data: " + data); // DEBUGGING

            if (list == "new") {
                let createNewList = new CreateNewList(object.value, movie);
                //this.update();
            }

            

            if (data == "Already Reported" && list != "new") {
                console.log("If in list: " + movie.title) // DEBUGGING


                if (movie.lists.includes(list)) {
                    movie.showLists = true;

                    showAlert(movie, "exists_in_list", list) // Visa meddelande
                }
                else{
                    movie.lists.push(list);
                    await updateMovieDB(movie);
                    showAlert(movie, "add", list) // Visa meddelande

                    movie.showLists = false;
                    listBtn.update(movie);

                }


            }
            else if (list != "new"){
                console.log("If not in list add: " + movie.title) // DEBUGGING
                showAlert(movie, "add", list) // Visa meddelande

                movie.lists.push(list);
                await updateMovieDB(movie);

                console.log(movie)

                movie.showLists = false;
                listBtn.update(movie);
            }


            

            
           


        }); 

        this.style.zIndex = "6000";
        this.appendChild(addform);

    }


    fullscreen(){

    }

    list(){
        this.container.style.position = "absolute";
        this.container.style.left = 0;
        this.container.classList.add("m-2");
        this.container.classList.add("ml-2");
    }

    poster(){
        this.container.style.position = "absolute";
        this.container.style.left = 0;
        this.container.classList.add("m-2");
        this.container.classList.add("ml-3");

    }

}
customElements.define('list-element', ListBtn, {extends: 'div'});


// Mark as seen button
class SeenBtn{

    constructor(movie, type){
        // Seen Button
        this.seenBtn = document.createElement("div");
        this.seenBtn.id = "seen_" + movie.id;
        this.seenBtn.classList.add("mb-4")
        this.seenBtn.setAttribute("type", type)
        this.seenBtn.setAttribute("movieType", movie.type)
        this.seenBtn.style.zIndex = 100;

        this.icon;

        this.fontsize;

        if (type == "fullscreen") {
            this.fontsize = 3;
            this.fullscreen(movie);
 
        }

        if (type == "poster") {
            this.fontsize = 2;
            this.poster(movie);

        }

        if (type == "posterSmall") {
            this.fontsize = 1.7;
            this.posterSmall(movie);

        }

        
        if (type == "list") {
            this.fontsize = 2;
            this.list(movie);
        }

        if (type == "listItem") {
            this.fontsize = 2;
            this.listItem(movie);
        }


        this.seenBtn.update = (movie) => {
            console.log("update")
            this.seenBtn.innerHTML = "";
            console.log("this.ssenbtn" + this.seenBtn.fontSize)

            if (type == "fullscreen") {
                if (movie.seen == 1) {
                    this.seenBtn.classList.remove("btn-light");
                    this.seenBtn.classList.add("btn-success");

                    this.icon = new Icon("bi-eye-fill", "text-white", this.fontsize)
                    this.seenBtn.appendChild(this.icon);
        
                    this.seenBtn.innerHTML += " Seen";
                    
                }
                else{
                    this.seenBtn.classList.remove("btn-success");
                    this.seenBtn.classList.add("btn-light");

                    this.icon = new Icon("bi-eye-slash", "text-muted", this.fontsize)
                    this.seenBtn.appendChild(this.icon);
        
                    this.seenBtn.innerHTML += " Not seen";
                    
        
                }

            }

            if (type == "list") {
                if (movie.seen == 1) {
                    this.icon = new Icon("bi-eye-fill", "text-white", "1")
        
                }
                else{
                    this.icon = new Icon("bi-eye-slash", "text-muted", "1")        
        
                }
        
                this.seenBtn.appendChild(this.icon)
                
            }

            if (type == "poster") {
                if (movie.seen == 1) {
                    this.icon = new Icon("bi-eye-fill", "text-white", "2")
        
                }
                else{
                    this.icon = new Icon("bi-eye-slash", "text-muted", "2")        
        
                }
        
                this.seenBtn.appendChild(this.icon)
                
            }

            if (type == "listItem") {
                if (movie.seen == 1) {
                    this.icon = new Icon("bi-eye-fill", "text-white", "2")
        
                }
                else{
                    this.icon = new Icon("bi-eye-slash", "text-muted", "2")        
        
                }
        
                this.seenBtn.appendChild(this.icon)
                
            }

            if (type == "posterSmall") {
                if (movie.seen == 1) {
                    this.icon = new Icon("bi-eye-fill", "text-white", "1.7")
        
                }
                else{
                    this.icon = new Icon("bi-eye-slash", "text-muted", "1.7")        
        
                }
        
                this.seenBtn.appendChild(this.icon)
                
            }

        }

        this.addEvent();

        return this.seenBtn;

    }

    fullscreen(movie){
        this.seenBtn.style.position = "absolute";
        this.seenBtn.style.left = 0;
        this.seenBtn.style.top = 0;

        this.seenBtn.classList.add("p-0");
        this.seenBtn.classList.add("px-3");
        this.seenBtn.classList.add("m-0");
        this.seenBtn.classList.add("mx-4");


        if (movie.seen == 1) {
            this.icon = new Icon("bi-eye-fill", "text-white", this.fontsize)

        }
        else{
            this.icon = new Icon("bi-eye-slash", "text-muted", this.fontsize) 

        }

        this.seenBtn.appendChild(this.icon);

        /*
        this.seenBtn.classList.add("btn");
        this.seenBtn.classList.add("mr-2");

        
        if (movie.seen == 1) {
            this.seenBtn.classList.add("btn-success");

            this.icon = new Icon("bi-eye-fill", "text-white", this.fontsize)
            this.seenBtn.appendChild(this.icon);

            this.seenBtn.innerHTML += " Seen";
            
        }
        else{
            this.seenBtn.classList.add("btn-light");

            this.icon = new Icon("bi-eye-slash", "text-muted", this.fontsize)
            this.seenBtn.appendChild(this.icon);

            this.seenBtn.innerHTML += " Not seen";
            

        }
        */





    }

    list(movie){
        this.seenBtn.style.position = "absolute";
        this.seenBtn.style.left = 0;
        this.seenBtn.classList.add("mx-2");
        this.seenBtn.style.top = "-0.5rem";

        if (movie.seen == 1) {
            this.icon = new Icon("bi-eye-fill", "text-white", this.fontsize)

        }
        else{
            this.icon = new Icon("bi-eye-slash", "text-muted", this.fontsize)
                   

        }

        this.seenBtn.appendChild(this.icon);   


    }

    poster(movie){
        this.seenBtn.style.position = "absolute";
        this.seenBtn.style.left = 0;
        this.seenBtn.classList.add("mx-2");

        if (movie.seen == 1) {
            this.icon = new Icon("bi-eye-fill", "text-white", this.fontsize)

        }
        else{
            this.icon = new Icon("bi-eye-slash", "text-muted", this.fontsize)
                   

        }

        this.seenBtn.appendChild(this.icon);   


        
    }

    posterSmall(movie){
        this.seenBtn.style.position = "absolute";
        this.seenBtn.style.left = 0;
        this.seenBtn.classList.add("mx-2");

        if (movie.seen == 1) {
            this.icon = new Icon("bi-eye-fill", "text-white", this.fontsize)

        }
        else{
            this.icon = new Icon("bi-eye-slash", "text-muted", this.fontsize)
                   

        }

        this.seenBtn.appendChild(this.icon);   


        
    }

    listItem(movie){
        this.seenBtn.style.position = "absolute";
        this.seenBtn.style.left = 0;
        this.seenBtn.style.top = "-0.5rem";
        this.seenBtn.classList.add("mx-2");

        if (movie.seen == 1) {
            this.icon = new Icon("bi-eye-fill", "text-white", this.fontsize)

        }
        else{
            this.icon = new Icon("bi-eye-slash", "text-muted", this.fontsize)
                   

        }

        this.seenBtn.appendChild(this.icon);   


        
    }

    
    addEvent(){

        this.seenBtn.onclick = async function(e) { 
            e.preventDefault();

            // Find Element and movie
            let id = this.id.replace("seen_", "");
            let type = this.getAttribute("type")
            let movieType = this.getAttribute("movieType")
            let movieElement = document.getElementById(movieType + "_" + id);
            let movie = movieElement.movie;

            if (movie.seen == 1) {
                movie.seen = 0;
                showAlert(movie, "!seen") // Visa meddelande
            
            }
            else{
                movie.seen = 1;
                showAlert(movie, "seen") // Visa meddelande
            }


            await updateMovieDB(movie);
            movieElement.update(movie);

            //this.update(movie);

            if (type == "fullscreen") {
                await movieElement.updateShowMovie(movie);

            }

            if (type == "listItem") {
                //await movieList_lists.update();
            }


            if (movieType == "list") {
                let objects = $("[element='MovieElement']");
                //let objects = $("div:visible[id*='seen_']");
                //  $("input[id*='DiscountType']")
                console.log(objects)
                console.log(objects.length)

                for (let i = 0; i < objects.length; i++) {
                    let obj = objects[i];

                    if (obj.movie.id == movie.id) {
                        obj.movie.seen = movie.seen
                    }
                    console.log(obj.movie.title + ": seen: " + obj.movie.seen)
                    obj.update(obj.movie);
                    
                }
                
                //await movieList_lists.update();
            }


            

            

        };


    }

}

// Filter button
class FilterBtn{
    constructor(genre){
        this.active = false;
        this.name = genre.name;
        this.id = genre.id;

        this.tag;
    }

    render(){
        // Seen Button
        let filterBtn = document.createElement("div");
        filterBtn.id = "genre_" + this.id;
        filterBtn.setAttribute("active", 0);
        filterBtn.classList.add("btn");

        if (this.active == 0) {
            filterBtn.classList.remove("btn-success");
            filterBtn.classList.add("btn-outline-success");
        
            filterBtn.setAttribute("active", 0);
            
        }
        else {
            filterBtn.classList.remove("btn-outline-success");
            filterBtn.classList.add("btn-success");
        
            filterBtn.setAttribute("active", 1);
        }
        
        filterBtn.classList.add("mr-2");
        filterBtn.classList.add("mb-2");
        filterBtn.innerHTML = this.name;

        filterBtn.onclick = async function(e) { 
            e.preventDefault();

            var btn = e.currentTarget;
            var id = e.currentTarget.id;
            id = id.replace("genre_", "");

            
            
            for (let i = 0; i < movieGenreFilters.length; i++) {
                let _btn = movieGenreFilters[i];

                if (id == movieGenreFilters[i].id) {
                    if(movieGenreFilters[i].active == true){
                        movieGenreFilters[i].active = false;
                    }
                    else{
                        movieGenreFilters[i].active = true;
                    }

                    _btn.update(btn);
                    
                }

                
                
            }

            addGenreFilter(id);

            //renderGenreFilters();

            console.log("this: " + this);

        };

        this.tag = document.getElementById("genre_" + this.id);

        return filterBtn;

    }


    update(filterBtn){
        console.log("this: " + this);

        if (this.active == 0) {
            filterBtn.classList.remove("btn-success");
            filterBtn.classList.add("btn-outline-success");
        
            filterBtn.setAttribute("active", 0);
            
        }
        else {
            filterBtn.classList.remove("btn-outline-success");
            filterBtn.classList.add("btn-success");
        
            filterBtn.setAttribute("active", 1);
        }



    }





}

// Rate movie button
class Rating{
    constructor(movie, type){

        this.rating = document.createElement("div");
        this.rating.id = "rating_" + movie.id;
        this.rating.classList.add("col-12")
        this.rating.classList.add("m-0")
        this.rating.classList.add("p-0")

        this.render(movie, type);

        this.rating.update = (movie) => {
            this.render(movie, type);

        }


        return this.rating;

    }

    render(movie, type){
        let icon;   
        let size; 

        let string = "Ditt betyg: ";

        if (type == "fullscreen") {
            this.rating.classList.add("mb-4");

            this.rating.innerHTML = string;
            size = 1.6;
        }
        else{
            this.rating.innerHTML = "<small>" + string + "</small> ";
        }

        if (movie.vote == 1) {
            icon = new Icon("bi-star-fill", "", size);
            icon.id = "rate_" + movie.id;
            icon.setAttribute("rating", 1);
            icon.setAttribute("type", type);
            icon.setAttribute("movieType", movie.type);
            this.rating.appendChild(icon);

            for (let i = 0; i < 4; i++) {
                icon = new Icon("bi-star", "", size);
                icon.id = "rate_" + movie.id;
                icon.setAttribute("rating", 2 + i);
                icon.setAttribute("type", type);
                icon.setAttribute("movieType", movie.type);
                this.rating.appendChild(icon);
            }


        }
        else if (movie.vote == 2) {
            for (let i = 0; i < 2; i++) {
                icon = new Icon("bi-star-fill", "", size);
                icon.id = "rate_" + movie.id;
                icon.setAttribute("rating", 1 + i);
                icon.setAttribute("type", type);
                icon.setAttribute("movieType", movie.type);
                this.rating.appendChild(icon);
            }

            for (let i = 0; i < 3; i++) {
                icon = new Icon("bi-star", "", size);
                icon.id = "rate_" + movie.id;
                icon.setAttribute("rating", 3 + i);
                icon.setAttribute("type", type);
                icon.setAttribute("movieType", movie.type);
                this.rating.appendChild(icon);
            }

        }
        else if (movie.vote == 3) {
            for (let i = 0; i < 3; i++) {
                icon = new Icon("bi-star-fill", "", size);
                icon.id = "rate_" + movie.id;
                icon.setAttribute("rating", 1 + i);
                icon.setAttribute("type", type);
                icon.setAttribute("movieType", movie.type);
                this.rating.appendChild(icon);
            }

            for (let i = 0; i < 2; i++) {
                icon = new Icon("bi-star", "", size);
                icon.id = "rate_" + movie.id;
                icon.setAttribute("rating", 4 + i);
                icon.setAttribute("type", type);
                icon.setAttribute("movieType", movie.type);
                this.rating.appendChild(icon);
            }

        }
        else if (movie.vote == 4) {
            for (let i = 0; i < 4; i++) {
                icon = new Icon("bi-star-fill", "", size);
                icon.id = "rate_" + movie.id;
                icon.setAttribute("rating", 1 + i);
                icon.setAttribute("type", type);
                icon.setAttribute("movieType", movie.type);
                this.rating.appendChild(icon);
            }

            icon = new Icon("bi-star", "", size);
            icon.id = "rate_" + movie.id;
            icon.setAttribute("rating", 5);
            icon.setAttribute("type", type);
            icon.setAttribute("movieType", movie.type);
            this.rating.appendChild(icon);

        }
        else if (movie.vote == 5) {
            for (let i = 0; i < 5; i++) {
                icon = new Icon("bi-star-fill", "", size);
                icon.id = "rate_" + movie.id;
                icon.setAttribute("rating", 1 + i);
                icon.setAttribute("type", type);
                icon.setAttribute("movieType", movie.type);
                this.rating.appendChild(icon);
            }


        }
        else{
            for (let i = 0; i < 5; i++) {
                icon = new Icon("bi-star", "text-muted", size)
                icon.id = "rate_" + movie.id;
                icon.setAttribute("rating", 1 + i);
                icon.setAttribute("type", type);
                icon.setAttribute("movieType", movie.type);
                this.rating.appendChild(icon);
            }

        }



    }



}

// Delete movie button
class DeletBtn{

    constructor(movie, type){
        // Remove button 
        this.deletBtn = document.createElement("div");
        this.deletBtn.id = "delete_" + movie.id;

        this.deletBtn.classList.add("mb-4")
        this.deletBtn.classList.add("btn");
        this.deletBtn.classList.add("btn-danger");

        this.deletBtn.setAttribute("display", type)
        this.deletBtn.setAttribute("list", type)

        if (type == "fullscreen") {
            this.fullscreen();
        }

        if (type == "list") {
            this.deletBtn.style.fontSize = "1rem";
            this.list();
        }

        if (type == "poster") {
            this.poster();
        }

        if (type == "listItem") {
            this.listItem();
            this.deletBtn.style.fontSize = "0.5rem";
            this.deletBtn.innerHTML = "Ta bort";
        }

        if (type == "posterSmall") {
            this.posterSmall();
            this.deletBtn.style.fontSize = "0.7rem";
            this.deletBtn.innerHTML = "Ta bort";
        }

        this.deletBtn.setAttribute("type", movie.type)

        if (movie.type == "movie") {
            this.deletBtn.innerHTML = "Ta bort";
        }

        if (movie.type == "searchResult") {
            this.deletBtn.innerHTML = "X";
        }

        this.deletBtn.update = (added) => {


        }
        

        // Remove
        this.deletBtn.onclick = async function(e) { 
            e.preventDefault();

            let type = this.getAttribute("type");

            // Find Element and movie
            let id = this.id.replace("delete_", "");
            let movieElement = document.getElementById( type + "_" + id);
            let activelist = movieElement.getAttribute("activelist");
            let display = this.getAttribute("display");

            console.log("Clicked remove! " + movieElement.id);

            let movie = movieElement.movie;

            if (activelist == "all") {
                //deleteMovieDB(movie);
                //movieList.removeMovie(movie)
                //movieList.update();
            }
            //movieList.removeMovie(movie);
            //deleteMovieDB(movie);
            //this.remove() // remove button

            if (type == "movie") {
                //deleteMovieDB(movie);
                //movieElement.update();
                await showAlertConfirm(movie, "Some text", display, activelist);
            }

            if (type == "searchResult") {
                movieList_search.removeMovie(movie);
                movieElement.update(movie);
                await showAlert(movie, "remove_seacrh");
            }
            
            if (type == "list") {
                //movieList_lists.removeMovieFromList(movie);
                let list = movieElement.getAttribute("list");
                let movielists = movie.lists;
                const result = movielists.filter(mlist => mlist == list);

                const index = movielists.indexOf(list);
                if (index > -1) {
                    movielists.splice(index, 1); // 2nd parameter means remove one item only
                }

                if (movielists < 1) {
                    movielists.push("all");
                }

                await updateMovieDB(movie)

                console.log(movielists);

                movieElement.update(movie);
                movieList_lists.update();
                
                await showAlert(movie, "remove", list);

  
            }

            //this.remove() // remove button

            //showAlert(movie, "remove") // Visa meddelande

        };


        return this.deletBtn;

    }

    render(){


    }

    fullscreen(){

    }

    list(){
        this.deletBtn.style.position = "absolute";
        this.deletBtn.style.right = 0;
        this.deletBtn.classList.add("m-2");
        this.deletBtn.classList.add("mr-3");
    }

    posterSmall(){
        this.deletBtn.style.position = "absolute";
        this.deletBtn.style.right = 0;
        this.deletBtn.classList.add("m-2");
        this.deletBtn.classList.add("mr-3");
    }

    poster(){
        this.deletBtn.style.position = "absolute";
        this.deletBtn.style.right = 0;
        this.deletBtn.classList.add("m-2");
        this.deletBtn.classList.add("mr-3");
        

    }

    listItem(){
        this.deletBtn.style.position = "absolute";
        this.deletBtn.style.right = 0;
        this.deletBtn.style.top = 0;
        this.deletBtn.classList.add("m-2");
        this.deletBtn.classList.add("mr-3");
        

    }



}

// Add movie to list button
class addToListBtn{
    constructor(movie, type){
        // Ad to list
        this.addtolistbtn = document.createElement("div");
        this.addtolistbtn.id = "atlb_" + movie.id;
        this.addtolistbtn.classList.add("btn");
        this.addtolistbtn.classList.add("btn-primary");
        this.addtolistbtn.setAttribute("type", movie.type);

        this.addtolistbtn.innerHTML = "Add to list";


        this.addtolistbtn.onclick = async function(e) { 
            e.preventDefault();

            // Find Element and movie
            let id = this.id.replace("atlb_", "");
            let movieElement;
            let type = this.getAttribute("type");

            movieElement = document.getElementById(type + "_" + id);

            let movie = movieElement.movie;

             
            movieList.addMovieToList(movie, "fantasy");

        };
        

        return this.addtolistbtn;


    }



}


// To top button
class ToTop{
    constructor(){
        let container = document.createElement("div");
        container.id = "toTop";
        container.style.position = "fixed";
        container.style.zIndex = 9000;
        container.style.bottom = 0;
        container.style.right = 0;

        //container.style.width = "10vw";
        //container.style.height = "10vw";

        container.style.display = "none";
        container.style.cursor = "pointer";
        container.classList.add("mx-4")
        container.classList.add("my-3")

        container.onclick = async function(e) { 
            e.preventDefault();

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });



        };

        let icon = new Icon("bi-arrow-up-circle-fill", "text-primary", 4);
        icon.style.position = "absolute";
        container.appendChild(icon);

        icon = new Icon("bi-arrow-up-circle", "text-light", 4);
        icon.style.bottom = 0;
        icon.style.right = 0;
        container.appendChild(icon);


        return container;
    }
}

