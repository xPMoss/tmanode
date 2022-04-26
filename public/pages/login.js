// ---------- LOGIN.JS ---------- //

startLogin();

async function startLogin() {
    //await socket.emit('create user', new User(user));
    //await socket.emit('login', new User(user))
    /*
    let movie = {
        title:"Saw XIII"
    }

    showAlertConfirm(movie, "Some text");
    */

    //let data = await getUser();
    //console.log("Curr User: " + data);
    //await setUser(data);

}

// ---------- INIT ---------- //
async function setUser(data) {
    currUser = new User(data);

}

function login(login) {
    event.preventDefault();

    // /auth
    
}


// ---------- LOAD FROM DB ---------- //
async function getUser() {

    let url = '/getUser';
        
    let response = await fetch(url);
    let data = await response.json();
            
        
    //console.log("Movies inside fetchMovies: " + JSON.stringify(data));

    console.log("getUser")
    console.log("Loaded user: " + data)
    return data;
            
}