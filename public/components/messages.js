// ---------- MESSAGES.JS ---------- //




// Alert with confirm
class AlertConfirm{
    constructor(movie, string, display, list) {
        this.movie = movie;
        this.string = string;
        this.display = display;
        this.list = list;

        console.log("this.list: " + this.list)
        this.bkg = document.createElement("div");

        let container = this.render();

        this.events();

        this.bkg.appendChild(container);

        return this.bkg;

    }

    render(bkg){
        
        this.bkg.id = "alertConfirm";
        this.bkg.style.zIndex = "5500";
        this.bkg.style.position = "fixed";
        this.bkg.style.top = 0;
        this.bkg.style.left = 0;
        this.bkg.style.backgroundColor = "rgba(100, 100, 100, 0.8)";

        this.bkg.classList.add("py-4");
        this.bkg.classList.add("px-4");

        //bkg.classList.add("bg-secondary");
        this.bkg.style.width = "100vw";
        this.bkg.style.height = "100vh";
        this.bkg.onclick = function(e) { 
            e.preventDefault();
            //this.remove();

        };

        let container = document.createElement("div");
        //container.classList.add("");

        container.style.zIndex = "6000";
        //container.id = "alertConfirm";
        container.classList.add("col-12");
        container.classList.add("col-sm-10");
        container.classList.add("col-md-8");
        container.classList.add("col-lg-6");
        container.classList.add("col-xl-4");
        container.classList.add("m-auto");
        
        container.classList.add("py-2");
        container.classList.add("border");
        container.classList.add("alert");
        container.classList.add("alert-light");

        // Head
        let head = document.createElement("h4");
        head.classList.add("row");
        head.classList.add("pt-2");
        head.classList.add("pb-3");
        head.classList.add("px-2");
        head.classList.add("border-bottom");

        let header = document.createElement("div");
        header.classList.add("col");
        header.innerHTML = "Är du säker?";
        head.appendChild(header);

        this.closeAlertConfirm = document.createElement("div");
        this.closeAlertConfirm.classList.add("col-auto");
        this.closeAlertConfirm.classList.add("float-right");
        
        this.closeAlertConfirm.classList.add("close");
        this.closeAlertConfirm.setAttribute("type", "button");
        //closeAlertConfirm.classList.add("btn-danger");
        this.closeAlertConfirm.innerHTML = "X";
        // Close

        head.appendChild(this.closeAlertConfirm);
        
        // Body
        let body = document.createElement("div");
        body.classList.add("row");
        body.classList.add("pt-3");
        body.classList.add("pb-4");
        body.classList.add("px-2");
        body.classList.add("border-bottom");

        let text = document.createElement("div");
        text.classList.add("col");
        let string = "";
        string += "Ta bort ";
        string += "<b>" + this.movie.title + "</b>";

        if (this.list == "all") {
            string += " från <b>alla din listor</b>?";
        }
        else{
            string += " från listan <b>" + this.list + "</b>?";

        }
        
        
        text.innerHTML = string;
        body.appendChild(text);

        // Foot
        let foot = document.createElement("div");
        foot.classList.add("row");
        foot.classList.add("pt-3");
        foot.classList.add("pb-2");
        foot.classList.add("px-2");

        // Cancel
        this.cancel = document.createElement("div");
        this.cancel.classList.add("col-auto");
        this.cancel.classList.add("mr-2");
        this.cancel.classList.add("float-left");
        this.cancel.classList.add("btn");
        this.cancel.classList.add("btn-light");
        this.cancel.innerHTML = "Avbryt";

        foot.appendChild(this.cancel);

        let spacer = document.createElement("div");
        spacer.classList.add("col");
        foot.appendChild(spacer);

        // Confirm
        this.confirm = document.createElement("div");
        this.confirm.id = "confirm_" + this.movie.id;
        this.confirm.setAttribute("display", this.display)
        this.confirm.setAttribute("activelist", this.list)
        this.confirm.classList.add("col-auto");
        this.confirm.classList.add("float-right");
        this.confirm.classList.add("btn");
        this.confirm.classList.add("btn-danger");
        this.confirm.innerHTML = "Ta bort";

        foot.appendChild(this.confirm);

        container.appendChild(head);
        container.appendChild(body);
        container.appendChild(foot);

        //head.appendChild(closeAlertConfirm);
        /*
        setTimeout(function removeMe(){
            $('#alert').remove();
        }, 2000);
        */

        return container;
        

    }

    events(){

        //Close
        this.closeAlertConfirm.onclick = function(e) { 
            e.preventDefault();

            let alertConfirm = document.getElementById("alertConfirm");
            alertConfirm.remove();
            

        };

        // Cancel
        this.cancel.onclick = function(e) { 
            e.preventDefault();

            let alertConfirm = document.getElementById("alertConfirm");
            alertConfirm.remove();
            

        };

        // confirm
        this.confirm.onclick = async function(e) { 
            e.preventDefault();

            // Find Element and movie
            let id = this.id.replace("confirm_", "");
            let movieElement = document.getElementById("movie_" + id);
            let movie = movieElement.movie;

            let display = this.getAttribute("display")
            let activelist = this.getAttribute("activelist")
            
            console.log("Clicked remove! this.list: " + activelist)
            
            if (activelist == "all") {
                await movieList.removeMovie(movie);
                await deleteMovieDB(movie);
            }
            else{
                await movieList.removeMovieFromList(movie, activelist);


            }
            
            //movieElement.update(movie);

            if (display == "fullscreen") {
                let element = document.getElementById("delete_" + id);
                let element_display = element.getAttribute("display");
                if (element_display == "fullscreen") {
                    element.remove();
                }
                
            }

            let alertConfirm = document.getElementById("alertConfirm");
            alertConfirm.remove();

            if (activelist == "all") {
                //movie, _string, extra, list
                showAlert(movie, "remove_from_all_lists", "", activelist) // Visa meddelande
            }
            else{
                showAlert(movie, "remove_from_list", "", activelist) // 

            }
            
            

        };



    }

}

// Alert
class Alert{
    constructor(movie, method, extra, list) {

        let div = document.createElement("div");
        div.style.zIndex = "10000";
        div.classList.add("alert");

        if(method == "empty input"){
            div.classList.add("alert-warning");
            div.innerHTML = extra;
        }

        
        if(method == "remove_from_all_lists"){
            div.classList.add("alert-warning");
            div.innerHTML = "<b>" + movie.title + "</b> togs bort från alla listor!";
        }

        if(method == "remove_from_list"){
            div.classList.add("alert-warning");
            div.innerHTML = "<b>" + movie.title + "</b> togs bort från listan <b>" + list + "</b>!";
        }
        

        if(method == "add"){
            div.classList.add("alert-primary");
            div.innerHTML = "<b>" + movie.title + "</b> las till i [" + extra + "]!";
        }
        else if(method == "remove"){
            div.classList.add("alert-warning");
            div.innerHTML = "<b>" + movie.title + "</b> togs bort från [" + extra + "]!";
            
        }
        else if(method == "clear"){
            div.classList.add("alert-warning");
            div.innerHTML = "Dina filmer tömdes!";
        }
        else if(method == "remove_seacrh"){
            div.classList.add("alert-warning");
            div.innerHTML = "<b>" + movie.title + "</b>";
            div.innerHTML += " togs bort från söklistan!";
        }

        
        if(method == "seen"){
            div.classList.add("alert-primary");
            div.innerHTML = "<b>" + movie.title + "</b> taggades som sedd!";
        }
        else if(method == "!seen"){
            div.classList.add("alert-warning");
            div.innerHTML = "<b>" + movie.title + "</b> taggades som inte sedd!";
            
        }

        if(method == "exist"){
            div.classList.add("alert-warning");
            div.innerHTML = "<b>" + movie.title + "</b> finns redan i dina filmer!";
        }

        if(method == "add_list"){
            div.classList.add("alert-primary");
            div.innerHTML = "Ny lista skapad: ";
            div.innerHTML += "<b>" + movie + "</b>";

        }

        if(method == "exists_list"){
            div.classList.add("alert-warning");
            div.innerHTML = "En lista med namn [";
            div.innerHTML += "<b>" + movie + "</b>";
            div.innerHTML += "] finns redan!";

        }

        if(method == "exists_in_list"){
            div.classList.add("alert-warning");
            div.innerHTML = "Filmen finns redan i listan [";
            div.innerHTML += extra;
            div.innerHTML += "]!";

        }


        div.classList.add("fixed-bottom");

        div.id = "alert";
        div.setAttribute("role", "alert");

        $('#closeAlert').click(function() {
            $('#alert').remove();
        });

        setTimeout(function removeMe(){
            $('#alert').remove();
        }, 4000);

        return div;

    }

}

// Create new list with confirm
class CreateNewList{
    constructor(formtype, movie) {
        let value = null;
        let bkg = document.createElement("div");
        bkg.id = "createNewList";
        bkg.style.zIndex = "5500";
        bkg.style.position = "fixed";
        bkg.style.top = 0;
        bkg.style.left = 0;
        bkg.style.backgroundColor = "rgba(100, 100, 100, 0.8)";

        bkg.classList.add("py-4");
        bkg.classList.add("px-4");

        //bkg.classList.add("bg-secondary");
        bkg.style.width = "100vw";
        bkg.style.height = "100vh";

        let container = document.createElement("div");
        //container.classList.add("");

        container.style.zIndex = "6000";
        //container.id = "alertConfirm";
        container.classList.add("col-12");
        container.classList.add("col-sm-10");
        container.classList.add("col-md-8");
        container.classList.add("col-lg-6");
        container.classList.add("col-xl-4");
        container.classList.add("m-auto");
        
        container.classList.add("py-2");
        container.classList.add("border");
        container.classList.add("alert");
        container.classList.add("alert-light");

        // Head
        let head = document.createElement("h4");
        head.classList.add("row");
        head.classList.add("pt-2");
        head.classList.add("pb-3");
        head.classList.add("px-2");
        head.classList.add("border-bottom");

        let header = document.createElement("div");
        header.classList.add("col");
        header.innerHTML = "Skapa lista och lägg till film";
        head.appendChild(header);

        let close = document.createElement("div");
        close.classList.add("col-auto");
        close.classList.add("float-right");
        
        close.classList.add("close");
        close.setAttribute("type", "button");
        //closeAlertConfirm.classList.add("btn-danger");
        close.innerHTML = "X";
        // Close
        close.onclick = function(e) { 
            e.preventDefault();

            let createNewList = document.getElementById("createNewList");
            createNewList.remove();
            

        };
        head.appendChild(close);
        
        // Body
        let body = document.createElement("div");
        body.classList.add("row");
        body.classList.add("pt-3");
        body.classList.add("pb-4");
        body.classList.add("px-4");
        body.classList.add("border-bottom");

        let form = this.createForm();
        body.appendChild(form);

        // Foot
        let foot = document.createElement("div");
        foot.classList.add("row");
        foot.classList.add("pt-3");
        foot.classList.add("pb-2");
        foot.classList.add("px-2");

        let cancel = document.createElement("div");
        cancel.classList.add("col-auto");
        cancel.classList.add("mr-2");
        cancel.classList.add("float-left");
        cancel.classList.add("btn");
        cancel.classList.add("btn-light");
        cancel.innerHTML = "Avbryt";
        // Cancel
        cancel.onclick = function(e) { 
            e.preventDefault();

            let createNewList = document.getElementById("createNewList");
            createNewList.remove();
            

        };
        foot.appendChild(cancel);

        let spacer = document.createElement("div");
        spacer.classList.add("col");
        foot.appendChild(spacer);

        // confirm
        this.confirm = document.createElement("div");
        this.confirm.id = "confirm_list";
        this.confirm.setAttribute("value", value)
        this.confirm.setAttribute("formtype", formtype)
        this.confirm.setAttribute("movie-id", movie.id)
        this.confirm.setAttribute("type", movie.type)
        this.confirm.classList.add("col-auto");
        this.confirm.classList.add("float-right");
        this.confirm.classList.add("btn");
        this.confirm.classList.add("btn-primary");
        this.confirm.innerHTML = "Skapa";

        // confirm event
        this.confirm.onclick = async function(e) { 
            e.preventDefault();

            let value = this.getAttribute("value");
            let formtype = this.getAttribute("formtype");
            let movieElement;
            let movie;

            // Find Element and movie
            let id = this.getAttribute("movie-id");
            let type = this.getAttribute("type");
            if (formtype != "movie-list-form") {
                movieElement = document.getElementById(type + "_" + id);
                movie = movieElement.movie;
            }
            

            let list = {
                id: 1,
                title: value.toLowerCase()
            }

            let empty = true;

            if (value != null && value != "null") {
                empty = false;
            }
            else{
                showAlert("", "empty input", "Namnfältet är tomt! Skriv in namn på ny lista", ""); // Visa meddelande
            }

            console.log("list.title: " + list.title); // DEBUGGING
            console.log("value: " + value); // DEBUGGING

            let data = await getListDB(list);      
            console.log("returned list data: " + data); // DEBUGGING

            if (data == 208 && empty == false) {
                
                if (formtype == "movie-list-form" || movie.type == "movie") {
                    console.log("movie-list-form"); // DEBUGGING
                    movieList.addList(value);
    
                }
                else{
                    addListDb(list);

                }

                // Add movie to list
                if (formtype != "movie-list-form") {
                    console.log("................................")
                    console.log("................................")
                    console.log("................................")
                    console.log(movie)
                    console.log(movie.lists)
                    console.log("................................")
                    console.log("................................")
                    console.log("................................")

                    movie.lists.push(list.title);
                    await updateMovieDB(movie);
                    movie.showLists = false;

                    let listBtn = document.getElementById("ListBtn_" + id);
                    await listBtn.update(movie);
                    
                    

                    console.log("................................")
                    console.log("................................")
                    console.log("................................")
                    console.log(listBtn)
                    console.log("................................")
                    console.log("................................")
                    console.log("................................")

                    
                    await movieElement.updateShowMovie(movie);

                    console.log("................................")
                    console.log("................................")
                    console.log("................................")
                    console.log(movie)
                    console.log(movie.lists)
                    console.log("................................")
                    console.log("................................")
                    console.log("................................")
                }
                



                console.log("value: " + value)

                let createNewList = document.getElementById("createNewList");
                createNewList.remove();
                
                showAlert(value, "add_list") // Visa meddelande
            
            }
            else if(empty == false){
                showAlert(value, "exists_list") // Visa meddelande

            }
    
            //movieList.addList(value);   



        };
        foot.appendChild(this.confirm);

        container.appendChild(head);
        container.appendChild(body);
        container.appendChild(foot);

        //head.appendChild(closeAlertConfirm);
        /*
        setTimeout(function removeMe(){
            $('#alert').remove();
        }, 2000);
        */

        bkg.appendChild(container);

        document.body.appendChild(bkg);

    }

    createForm(){

        /* 
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
               
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

<input class="form-control" type="text" id="search" name="search" placeholder="Sök efter en film..." value=""></input>
                    
                </div>
                <button class="btn btn-primary" type="submit" value="Search">Sök</button>
                <button class="btn btn-danger" id="clearSearch" >Rensa</button>


        */

        let form = document.createElement("form");
        //form.classList.add("");

        let div = document.createElement("div");
        div.classList.add("form-group");

        let label = document.createElement("label");
        label.innerHTML = "Ange namn på ny lista";

        let input = document.createElement("input");
        input.classList.add("form-control");

        input.addEventListener("change", function() {
            let confirm_list = document.getElementById("confirm_list");
            confirm_list.setAttribute("value", this.value)
            //confirm_list.innerHTML = "";
            //confirm_list.innerHTML = this.value;
            console.log("Changed value: " + this.value)

        }); 



        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);

        return form;

    }
}