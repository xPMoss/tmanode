
let inc = 0;

let country = "Sweden";
let api_key = "837510eb0be61188d342d8c49173bb6e";
let language = "sv";
let region = "SE";

let user;
let userElement;

let authorised = false;

let GlobalScrollPosition = document.body.getBoundingClientRect().top;
        
let movieLists = new Array;



startGlobals();

document.body.onscroll = function(){
    let position = document.body.getBoundingClientRect().top;
    //console.log("position: " + position);

    let toTop = document.getElementById("toTop");

    if (position < -100) {
        
        toTop.style.display = "block";
    }
    else{
        toTop.style.display = "none";

    }

}; 

async function startGlobals() {
    console.log("//-----globals.start()-----//")

    await document.body.appendChild(new ToTop());

    if(location.pathname != "/"){
        movieLists = await getListsDB();
        console.log("............................... ");
        console.log("............................... ");
        console.log("movieLists " + movieLists);
        console.log("............................... ");
        console.log("............................... ");

    }
    
    

}

// ---------- INIT ---------- //
async function set(data) {
    

}

// ---------- LOAD FROM DB ---------- //
async function get() {


            
}



// ---------- Nav ---------- //


