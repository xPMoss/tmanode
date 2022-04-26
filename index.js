// CRYPTO //
const crypto = require('crypto');
let jwt = require('jsonwebtoken');

// The Movie App - Google API
// themovieapp-googleapi
// Index.js

// IMPORT HTTP //
const http = require("http");

// IMPORT EXPRESS/EXPRESS-SESSION //
const express = require('express');
const session = require('express-session');

// IMPORT/SETUP REDIS //
//const redis = require('redis');
//const redisStore = require('connect-redis')(session);
//const client  = redis.createClient();

// IMPORT PATH //
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//const fs = require('fs').promises;

// Include fs module
const fs = require('fs');
const { json } = require('express/lib/response');

/*
// uncaughtException //
process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----')
    console.log(error)
    console.log('----- Exception origin -----')
    console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----')
    console.log(promise)
    console.log('----- Reason -----')
    console.log(reason)
})

// Throwing an exception
nonexistentFunc();
*/


// ---------- APP ---------- //
app.use(session({
    secret: 'secret',
    resave: true,
	saveUninitialized: true,
  }));
///app.use(express.static('./public'));
/*
app.use(session({
	secret: 'secret',
    //store: new redisStore({ host: mysql_host, port: 6379, client: client,ttl : 260}),
	resave: true,
	saveUninitialized: true,
    maxAge: Date.now() + (86400 * 1000)
}));
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- SERVER ---------- //
console.clear();
const port = 3000;
server.listen(process.env.PORT || port);
server.timeout = 0;
server.keepAliveTimeout = 0;

console.log('Server is running on port: ' + port);


// SÄKERHET/HASH PASSWORD //
function hash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    
    return hash.digest('hex');
  
}

app.post('/authFS', function(request, response) {
	console.log("//-----/authFS-----//");
	let username = request.body.username;
	let password = request.body.password;

    let user;
    let authorized = false;

    console.log("request.body.username: " + request.body.username);

	// Ensure the input fields exists and are not empty
	if (username && password) {

        let users = loadUsersFS();
        let hashedPassword = hash(password);

        for (let i = 0; i < users.length; i++) {
            if (username.toLowerCase() ==  users[i].username.toLowerCase()) {
                user = users[i];

                if (hashedPassword == users[i].password)  {
                    authorized = true;
                }
            }
            
        }

        if(authorized == true){
            request.session.loggedin = true;
			request.session.username = username;

            let today = new Date();  
            let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;

            user.last_login = dateTime;

            updateUsersFS(users);


            let sql = 'UPDATE users SET ';
            sql += `last_login="${dateTime}"`;
            sql += ` WHERE username="${username}"`;
            console.log("SQL: " + sql);

            console.log("request.session.username: " + request.session.username); // Debugging
            console.log("request.session.loggedin: " + request.session.loggedin); // Debugging

            // Redirect to home page
            response.redirect('/home');

        }
        else {

            let htmlCode = `<html lang="sv"><head>`
            htmlCode += `<meta charset="utf-8">`
            htmlCode += `<meta name="viewport" content="width=device-width, initial-scale=1">`
            htmlCode += `<title>The Movie App - Google API</title>`
            htmlCode += `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>`
            htmlCode += `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">`
            htmlCode += `<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>`
            htmlCode += `<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>`
            htmlCode += `</head>`
    
            htmlCode += `<div class="container-fluid margin-auto my-4" >`
            htmlCode += `<div class="row text-center">`
            htmlCode += `<h4 class="col-12">Fel inloggningsuppgifter!</h4>`
            htmlCode += `<div class="col-12 mb-4"></div>`
            htmlCode += `</div>`
            htmlCode += `<div class="row text-center">`
            htmlCode += `<form class="col-12" action="/login" method="get" id="">`
            htmlCode += `<button class="btn btn-primary" type="submit">Logga in</button>`
            htmlCode += `</form>`
            htmlCode += `</div>`
            htmlCode += `</div></html>`

            //response.writeHead(200, {"Content-Type": "text/html"});
            response.send(htmlCode);

        }			

	}
    else {
		response.send('Please enter Username and Password!');
		response.end();
	}

});

function MakeLoggin(request) {
    request.session.loggedin = true;
	request.session.username = "wemg";
}

//---------- ROUTES ---------- //
app.get('/', function(request, response) {
    console.log("//-----/-----//");
    console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);

	response.sendFile(path.join(__dirname + '/public/pages/start.html'));

});

app.get('/login', function(request, response) {
    console.log("//-----/-----//");
    console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);

	response.sendFile(path.join(__dirname + '/public/pages/login.html'));

});

app.get('/logout', function(request, response) {
    console.log("//-----/logout-----//");


    request.session.loggedin = false;
	request.session.username = "";
    
    console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);


	response.sendFile(path.join(__dirname + '/public/pages/login.html'));

});

app.get('/home', function(request, response) {
    console.log("//-----/home-----//");
    console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);

	// If the user is loggedin
	if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/public/pages/home.html'));
	} 
    else {
		// Not logged in
        response.sendFile(path.join(__dirname + '/public/pages/login.html'));

	}
	//response.end();
});

app.get('/discover', function(request, response) {

    console.log("//-----/movies-----//");
	console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);

	if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/public/pages/discover.html'));
	} 
    else {
		// Not logged in
        response.sendFile(path.join(__dirname + '/public/pages/login.html'));

	}
	//response.end();
});

app.get('/movies', function(request, response) {

    console.log("//-----/movies-----//");
	console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);

	if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/public/pages/movies.html'));
	} 
    else {
		// Not logged in
        response.sendFile(path.join(__dirname + '/public/pages/login.html'));

	}
	//response.end();
});

app.get('/lists', function(request, response) {
    console.log("//-----/movies-----//");
	console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);

	if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/public/pages/lists.html'));
	} 
    else {
		// Not logged in
        response.sendFile(path.join(__dirname + '/public/pages/login.html'));

	}
	//response.end();
});

app.get('/register', function(request, response) {
    console.log("//-----/register-----//");

	response.sendFile(path.join(__dirname + '/public/pages/register.html'));

});

app.get('/profile', function(request, response) {
    console.log("//-----/profile-----//");
    console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);

	// If the user is loggedin
	if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/public/pages/profile.html'));
	} 
    else {
		// Not logged in
        response.sendFile(path.join(__dirname + '/public/pages/login.html'));

	}
    
	//response.send();
});

app.get('/forgot', function(request, response) {
    console.log("//-----/profile-----//");
    console.log("request.session.username: " + request.session.username);
    console.log("request.session.loggedin: " + request.session.loggedin);

	response.sendFile(path.join(__dirname + '/public/pages/forgot_password.html'));
});



//----- API-FS -----//

function loadFS(type, user){
    console.log("//-----loadFS(" + type + ")-----//");

    let file = 'db/' + user.toLowerCase() + '/' + type + '.json';

    let rawdata = fs.readFileSync(file);
    let data = JSON.parse(rawdata);

    return data;

}

function updateFS(data_to_write, type, user){
    console.log("//-----updateFS(" + type + ")-----//");

    let file = 'db/' + user.toLowerCase() + '/' + type + '.json';

    let data;
    data = "[";
    data += "\n"

    for (let i = 0; i < data_to_write.length; i++) {
        data += JSON.stringify(data_to_write[i]);

        if (i < data_to_write.length-1) {
            data += ","
            data += "\n"
        }
        else{
            data += "\n"
        }
        
        
    }
    data += "]"


    fs.writeFile (file, data, function (err, data){
        //console.log("movies: " + movies);
    });

}

function sort(data_to_sort, type){
    // title
    data_to_sort.sort(function(a, b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });

    // id
}

// ----- MOVIES ----- //
function loadMoviesFS(type = "movies", user) {
    console.log("//-----loadMoviesFS()-----//");

    file = 'db/' + user.toLowerCase() + '/' + type + '.json';

    let rawdata = fs.readFileSync(file);
    let movies = JSON.parse(rawdata);

    return movies;
}

function updateMoviesFS(movies, user){
    console.log("//-----updateMoviesFS()-----//");

    file = 'db/' + user.toLowerCase() + '/movies.json';

    let data = movies;

    data = "[";
    data += "\n"

    for (let i = 0; i < movies.length; i++) {
        data += JSON.stringify(movies[i]);

        if (i < movies.length-1) {
            data += ","
            data += "\n"
        }
        else{
            data += "\n"
        }
        
        
    }
    data += "]"


    fs.writeFile (file, data, function (err, data){
        //console.log("movies: " + movies);
    });

}

function sortMovies(movies){
    movies.sort(function(a, b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
}

// GET MOVIES FROM FS //
app.get('/getMoviesFS', async function(req, res) {
    console.log("//-----/getMoviesFS-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);

    let user = req.session.username;

    file = 'db/' + user + '/movies.json';

    let movies = await loadFS("movies", user);

    let string = "Movies:";

    for (let i = 0; i < movies.length; i++) {
        string += i + ".[";
        string += movies[i].title;
        string += "]";
        
    }

    console.log(string);

    res.send(movies);

});

// GET MOVIE FROM FS //
app.get('/getMovieFS/:id', async function(req, res) {
    console.log("//-----post: /getMovieFS/:id-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);
    
    let movie;
    let id =  req.params.id;
    let user = req.session.username.toLowerCase();
    
    let movies = await loadMoviesFS("movies", user);

    let found = false;

    //console.log("movies" + movies)
    console.log("id to look for: " + id)

    for (var key in movies) {
        //console.log("key: "  + key)
        //console.log("movies[0]: "  + movies[key].id)
        if (movies[key].id == id) {
            found = true;
            movie = movies[key];
            console.log("found movie!!!!")
            console.log(movies[key])
        }
    }

    

    console.log("found: " + found)

    if (found == true) {
        console.log("Sending: " + movie)
        console.log(movie)
        res.send(movie);
    }
    else{
        res.sendStatus(208);
    }
    
    

    
});


// UPDATE MOVIE IN FS //
app.post('/updateMovieFS', async function(req, res) {
    console.log("//-----post: /updateMovieFS-----//");

    let movie =  req.body.movie;
    let user = req.session.username.toLowerCase();

    // TEMP
    /*
    user = "wemg" // temp //
    movie = {
        id: 354912,
        title: "Coco",
        seen: true,
        vote: 4,
        favorite: null,
        lists: ["barnfilmer"]

    };
    */

    console.log("lists movie: " + movie.lists);
    movie = {
        id: movie.id,
        title: movie.title,
        seen: movie.seen,
        vote: movie.vote,
        favorite: movie.favorite,
        hidden: movie.hidden,
        lists: movie.lists

    };
    
    let movies = await loadFS("movies", user);

    let string = "Movies:";
    for (let i = 0; i < movies.length; i++) {
        
        if (movies[i].id == movie.id) {
            movies[i] = movie;
            console.log("found movie: " + movie.title);
        }
        
        string += i + ".[";
        string += movies[i].title;
        string += "]";
        
    }
    console.log(string);

    await updateFS(movies, "movies", user);
    
  
    res.send(movie)
  
});

// ADD MOVIE TO FS //
app.post('/addMovieFS', function(req, res) {
    console.log("//-----post: /addMovieFS-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);
    
    let movie =  req.body.movie;
    let user = req.session.username.toLowerCase();

    console.log("req: " + req);
    //console.log(req);
    console.log("movie: " + movie);
    console.log(movie.title);
    
    movie.lists = new Array();

    movie_to_write = {
        id: movie.id,
        title: movie.title,
        seen: movie.seen,
        vote: movie.vote,
        favorite: movie.favorite,
        hidden: movie.hidden,
        lists: movie.lists

    };

    // Set undefined to empty
    for (var key in movie_to_write) {
        if (movie_to_write.hasOwnProperty(key)) {
            if (movie_to_write[key] == "undefined" || movie_to_write[key] == undefined) {
                movie_to_write[key] = "";
            }
            console.log(key + " -> " + movie_to_write[key]);
        }
    }

    
    let movies = loadFS("movies", user);

    let found = false;

    let string = "Movies:";
    for (let i = 0; i < movies.length; i++) {
        
        if (movies[i].id == movie.id) {
            movies[i] = movie;
            found = true;
            console.log("found movie: " +  movies[i].title);
        }
        
        string += i + ".[";
        string += movies[i].title;
        string += "]";
        
    }

    console.log(string);

    if (found == true) {
        res.sendStatus(208);

    }
    else if(found == false){
        movies.push(movie_to_write);
        sortMovies(movies);
        updateFS(movies, "movies", user);
        res.sendStatus(200);


    }

    
    

    
});

// Delete movie from FS
app.post('/deleteMovieFS', function(req, res) {
    console.log("//-----post: /addMovieFS-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);

    let movie =  req.body.movie;
    let user = req.session.username.toLowerCase();

    console.log("movie to delete: " + movie.title);
    
    let movies = loadFS("movies", user);

    let found = false;

    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id == movie.id) {
            found = true;
            movies.splice(i, 1);
        }
        

        
    }


    if (found == true) {
        updateFS(movies, "movies", user);
        console.log("movie deleted: " + movie.title);
        res.sendStatus(200);

    }
    else if(found == false){
        res.sendStatus(404);

    }
    
});


app.get('/getSeenMoviesFS', async function(req, res) {
    console.log("//-----post: /getSeenMoviesFS-----//");


 
    
});

app.get('/getSeenMovieFS', async function(req, res) {
    console.log("//-----get: /getSeenMovieFS-----//");


 
    
});

app.get('/getSeenMovieFS/:id', async function(req, res) {
    console.log("//-----get: /getSeenMovieFS-----//");


 
    
}); 

app.post('/addSeenMovieFS', async function(req, res) {
    console.log("//-----post: /addSeenMovieFS-----//");


 
    
}); 

app.post('/updateSeenMovieFS', async function(req, res) {
    console.log("//-----post: /updateSeenMovieFS-----//");


 
    
}); 

// ----- LISTS ----- //

function loadListsFS(user) {
    console.log("//-----loadListsFS()-----//");

    file = 'db/' + user.toLowerCase() + '/lists.json';

    let rawdata = fs.readFileSync(file);
    let lists = JSON.parse(rawdata);

    return lists;
}

function updateListsFS(user, lists){
    console.log("//-----updateListsFS()-----//");

    file = 'db/' + user.toLowerCase() + '/lists.json';

    let data = lists;

    data = "[";
    data += "\n"

    for (let i = 0; i < lists.length; i++) {
        data += JSON.stringify(lists[i]);

        if (i < lists.length-1) {
            data += ","
            data += "\n"
        }
        else{
            data += "\n"
        }
        
        
    }
    data += "]"

    fs.writeFile (file, data, function (err, data){
        //console.log("lists: " + lists);
    });

}

function sortLists(lists){
    lists.sort(function(a, b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
}

// Get lists from FS
app.get('/getListsFS', async function(req, res) {
    console.log("//-----/getListsFS-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);

    let user = req.session.username.toLowerCase();

    let lists = await loadListsFS(user);

    let string = "lists:";

    for (let i = 0; i < lists.length; i++) {
        string += i + ".[";
        string += lists[i].title;
        string += "]";
        
    }

    console.log(string);

    res.send(lists);
    
}); 

app.get('/getListFS/:title', async function(req, res) {
    console.log("//-----get: /getListFS/:id-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);
    
    let list;
    let title =  req.params.title;
    let user = req.session.username.toLowerCase();
    
    let lists = await loadListsFS(user);

    let found = false;

    console.log("lists" + lists)
    console.log("title to look for: " + title)

    for (var key in lists) {
        //console.log("key: "  + key)
        //console.log("movies[0]: "  + movies[key].id)
        if (lists[key].title == title) {
            found = true;
            list = lists[key];
            console.log("found list!!!!")
            console.log(lists[key])
        }
    }

    

    console.log("found: " + found)

    if (found == true) {
        console.log("Sending: " + list)
        console.log(list)
        res.send(list);
    }
    else{
        res.sendStatus(208);
    }


 
    
}); 

// Add list
app.post('/addListFS', function(req, res) {
    console.log("//-----post: /addListFS-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);
    
    let list =  req.body.list;
    let user = req.session.username.toLowerCase();

    console.log("req: " + req);
    //console.log(req);
    console.log("list: " + list);
    console.log(list.title);

    list_to_write = {
        id: list.id,
        title: list.title,
        movies: [""]

    };

    // Set undefined to empty
    for (var key in list_to_write) {
        if (list_to_write.hasOwnProperty(key)) {
            if (list_to_write[key] == "undefined" || list_to_write[key] == undefined) {
                list_to_write[key] = "";
            }
            console.log(key + " -> " + list_to_write[key]);
        }
    }

    
    let lists = loadListsFS(user);

    let found = false;

    let string = "lists:";
    for (let i = 0; i < lists.length; i++) {
        
        if (lists[i].title == list_to_write.title) {
            //lists[i] = list;
            found = true;
            console.log("found list: " +  lists[i].title);
        }
        
        string += i + ".[";
        string += lists[i].title;
        string += "]";
        
    }

    console.log(string);

    if (found == true) {
        res.sendStatus(208);

    }
    else if(found == false){
        lists.push(list_to_write);
        sortLists(lists);
        updateListsFS(user, lists);
        res.sendStatus(200);


    }

    
    

    
});

// Update list
app.post('/updateListFS', async function(req, res) {
    console.log("//-----post: /updateListFS-----//");

    let list =  req.body.list;
    let user = req.session.username.toLowerCase();

    list = {
        id: list.id,
        title: list.title,
        description: list.description

    };
    
    let lists = await loadListsFS(user);

    let string = "lists:";
    for (let i = 0; i < lists.length; i++) {
        
        if (lists[i].title == list.title) {
            lists[i] = list;
            console.log("found list: " + list.title);
        }
        
        string += i + ".[";
        string += lists[i].title;
        string += "]";
        
    }
    console.log(string);

    await updateFS(user, lists);
    
  
    res.send(list)

 
    
}); 

// ----- PREFS -----//
function loadPrefsFS(user){
    console.log("//-----loadPrefsFS()-----//");

    file = 'db/' + user.toLowerCase() + '/prefs.json';

    let rawdata = fs.readFileSync(file);
    let prefs = JSON.parse(rawdata);

    return prefs;
}

function updatePrefsFS(user, prefs){
    console.log("//-----updatePrefsFS()-----//");

    file = 'db/' + user.toLowerCase() + '/prefs.json';

    let data = prefs;

    
    data = "{";
    data += "\n"
    data += '"genres":'
    data += JSON.stringify(prefs.genres);
    data += ",\n"
    data += '"keywords":'
    data += JSON.stringify(prefs.keywords);
    data += ",\n"
    data += '"search":'
    data += JSON.stringify(prefs.search);
    data += "\n"
    data += "}"
    
    // TEST
    //data = JSON.stringify(prefs);


    fs.writeFile (file, data, function (err, data){
        //console.log("movies: " + movies);
    });

}

// Add prefs
app.post('/addPrefsFS', async function(req, res) {
    console.log("//-----post: /addPrefsFS-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);
    
    let params =  req.body.params;
    let user = req.session.username.toLowerCase();

    console.log("params: " + params);


    genres_to_write = params.genre;

    let prefs = await loadPrefsFS(user);

    let genres = prefs.genres;
    let keywords = prefs.keywords;
    let search = prefs.search;
    



    updatePrefsFS(user, prefs)

    search.push("hej");

    
    

    
    

    
});

app.get('/getPref/:params', async function(req, res) {
    console.log("//-----get: /getPref/:param-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);

    console.log(">>>>> params-start <<<<<") // debugging
    console.log(req.params.params) // debugging
    console.log(">>>>> params-end <<<<<") // debugging

    //console.log("req.params.username: " + req.params.username)
    let user = req.session.username.toLowerCase();
    //user = 'wemg';

    console.log("user: " + user);

    let prefs = await loadPrefsFS(user);
    console.log("prefs: " + prefs); // debugging
    console.log(prefs); // debugging

    let genres = prefs.genres;
    let keywords = prefs.keywords;
    let search = prefs.search;

    //updatePrefsFS(user, prefs)

    

    //search.push("hej");

    console.log(genres); // debugging


    if (req.params.params == "all") {
        res.send(prefs);
    }

    if(req.params.params == "genres") {
        res.send(genres);
    }

    if(req.params.params == "keywords") {
        res.send(keywords);
    }

    if(req.params.params == "search") {
        res.send(search);
    }


});



// ----- USERS ----- //

function loadUsersFS(){
    console.log("//-----loadUsersFS()-----//");

    file = 'db/users.json';

    let rawdata = fs.readFileSync(file);
    let users = JSON.parse(rawdata);

    return users;
}

function updateUsersFS(users){
    console.log("//-----updateUsersFS()-----//");

    file = 'db/users.json';

    let data = users;

    data = "[";
    data += "\n"

    for (let i = 0; i < users.length; i++) {
        data += JSON.stringify(users[i]);

        if (i < users.length-1) {
            data += ","
            data += "\n"
        }
        else{
            data += "\n"
        }
        
        
    }
    data += "]"

    fs.writeFile (file, data, function (err, data){
        //console.log("movies: " + movies);
    });

}

// CREATE USER FS //
app.post('/createUserFS', async function(req, res) {
    console.log("//-----post: /createUserFS-----//");
    console.log("//-----post: /createUser-----//");
    // MySql //
    let emailExist = false;
    let usernameExist = false;

    let users = await loadUsersFS();
    
    console.log("Sent:" + req.body.username + ", " + req.body.email);

    // Check username
    if(users.length > 0){
        console.log("users" + users);
        //console.log("User exists");
        //console.log("result:" + result);
        for (var key in users) {
            //console.log("key: "  + key)
            //console.log("movies[0]: "  + movies[key].id)
            if (users[key].username == req.body.username) {
                usernameExist = true;
                console.log("users Exist!!!!")

            }
        }


        for (var key in users) {
            //console.log("key: "  + key)
            //console.log("movies[0]: "  + movies[key].id)
            if (users[key].email == req.body.email) {
                emailExist = true;
                console.log("Email Exist!!!!")

            }
        }

        
    }

    if(emailExist == true && usernameExist == true){
        console.log("Email & usernamen exists");
        console.log("Forgot password?");

    }
    else if(emailExist == true && usernameExist == false){
        console.log("A user with that email exists!");
        console.log("Forgot password?");

    }
    else if(emailExist == false && usernameExist == true){
        console.log("A user with that username exists!");
        console.log("Forgot password?");

    }
    else{
        console.log('User [' + req.body.username + '] created');
        //res.send('User [' + req.body.username + '] created');

        let tempUsername = req.body.username.toLowerCase();
        console.log("tempUsername: " + tempUsername)

        let today = new Date();  
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let no = users[users.length - 1].id;
        no += 1;

        let hashedPassword = hash(req.body.password);

        let user_to_write = {
            id: no,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            firstname: "",
            surname: "",
            created: dateTime,
            last_login: dateTime
    
        };


        users.push(user_to_write);
        updateUsersFS(users);


        let dir = 'db/' + tempUsername;

        if (!fs.existsSync(dir) && tempUsername != undefined){
            fs.mkdirSync(dir);
        }
    
        let movieFile = 'db/' + tempUsername + '/movies.json';
    
        if (!fs.existsSync(movieFile) && tempUsername != undefined){
            fs.writeFile(movieFile, '[]', function (err) {
                if (err) throw err;
                console.log('Movie file created successfully.');
            });

        }

        let listsFile = 'db/' + tempUsername + '/lists.json';
    
        if (!fs.existsSync(listsFile) && tempUsername != undefined){
            fs.writeFile(listsFile, '[]', function (err) {
                if (err) throw err;
                console.log('List file created successfully.');
            });
            
        }

        let seenFile = 'db/' + tempUsername + '/seenMovies.json';
    
        if (!fs.existsSync(seenFile) && tempUsername != undefined){
            fs.writeFile(seenFile, '[]', function (err) {
                if (err) throw err;
                console.log('Seen file created successfully.');
            });
            
        }

        let prefsFile = 'db/' + tempUsername + '/prefs.json';
        let prefsData = '{';
        prefsData += '"genres":{"liked":"","disliked":[""]},'
        prefsData += '"keywords":{"liked":[""],"disliked":[""]},'
        prefsData += '"search":[""]'
        prefsData += '}'

        if (!fs.existsSync(prefsFile) && tempUsername != undefined){
            fs.writeFile(prefsFile, prefsData, function (err) {
                if (err) throw err;
                console.log('Prefs file created successfully.');
            });
            
        }

        req.session.loggedin = true;
        req.session.username = req.body.username;


        let pwd = "";
        for (let j = 0; j < req.body.password.length; j++) {
            pwd += "*";
                
        }

        pwd = "************";

        let htmlCode = `<html lang="sv"><head>`
        htmlCode += `<meta charset="utf-8">`
        htmlCode += `<meta name="viewport" content="width=device-width, initial-scale=1">`
        htmlCode += `<title>The Movie App - Google API</title>`
        htmlCode += `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>`
        htmlCode += `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">`
        htmlCode += `<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>`
        htmlCode += `<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>`
        htmlCode += `</head>`

        htmlCode += `<div class="container-fluid margin-auto my-4" >`
        htmlCode += `<div class="row text-center">`
        htmlCode += `<h4 class="col-12">Användare skapad:</h4>`
        htmlCode += `<div class="col-12 mb-4">Användarnamn: `+ req.body.username + `</br>`
        htmlCode += `Email: `+ req.body.email + `</br>`
        htmlCode += `Lösenord: `+ pwd + `</div>`
        htmlCode += `</div>`
        htmlCode += `<div class="row text-center">`
        htmlCode += `<form class="col-12" action="/home" method="get" id="">`
        htmlCode += `<button class="btn btn-primary" type="submit">Vidare</button>`
        htmlCode += `</form>`
        htmlCode += `</div>`
        htmlCode += `</div></html>`

       

        //response.writeHead(200, {"Content-Type": "text/html"});
        res.send(htmlCode);

        //res.send(htmlCode);
        

        //res.redirect('/home');

        }

    

    //send the data reae with the response
    console.log("post: /createUser");
    console.log("req.session.username: " + req.session.username);
    
}); 

// Update user
app.post('/updateUserFS', async function(req, res) {
    console.log("//-----post: /updateUserFS-----//");


 
    
}); 

// GET USER FS //
app.get('/getUserFS/:username', async function(req, res) {
    console.log("//-----get: /getUserFS-----//");
    console.log("request.session.username: " + req.session.username);
    console.log("request.session.loggedin: " + req.session.loggedin);

    //console.log("req.params.username: " + req.params.username)
    let user = req.params.username;

    if (user == undefined || user == "undefined") {
        user = req.session.username;
    }

    console.log("user: " + user);

    let users = await loadUsersFS();

    // Debugging //
    let string = "users:";

    for (let i = 0; i < users.length; i++) {
        string += i + ".[";
        string += users[i].username;
        string += "]";
            
    }
    // ---------- //

    console.log(string);

    let found = false;
    let data;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username.toLowerCase() == user.toLowerCase()) {
            console.log("Found: " + users[i].username);
            data = users[i];
            found = true;
            
        }
        
    }

    if (found == true) {
        let pwd = "";

        for (let j = 0; j < data.password.length; j++) {
            pwd += "*";
                
        }
        pwd = "************";

        data.password = pwd;

        res.send(data);
    }
    else if(found == false){
        console.log("Not found: ");
        data = "not found";
        res.sendStatus(404);
        //res.sendStatus(204);  // No Content

    }

    

    // Use fs.readFile() method to read the file
    /*
    let users = await fs.readFile(file, function(err, data){

        let users = JSON.parse(data);

        // Display the file content
        let string = "users:";

        for (let i = 0; i < users.length; i++) {
            string += i + ".[";
            string += users[i].username;
            string += "]";
            
        }

        console.log(string);

        
    });	
    */

    


});

// SEND NEW PSW FS //
app.post('/sendPassword', async function(req, res) {
    console.log("//-----post: /createUserFS-----//");
    console.log("//-----post: /createUser-----//");
    // MySql //
    let emailExist = false;
    let usernameExist = false;

    let users = await loadUsersFS();
    
    console.log("Sent:" + req.body.username + ", " + req.body.email);

    // Check username
    if(users.length > 0){
        console.log("users" + users);
        //console.log("User exists");
        //console.log("result:" + result);
        for (var key in users) {
            //console.log("key: "  + key)
            //console.log("movies[0]: "  + movies[key].id)
            if (users[key].username == req.body.username) {
                usernameExist = true;
                console.log("users Exist!!!!")

            }
        }


        for (var key in users) {
            //console.log("key: "  + key)
            //console.log("movies[0]: "  + movies[key].id)
            if (users[key].email == req.body.email) {
                emailExist = true;
                console.log("Email Exist!!!!")

            }
        }

        
    }

    if(emailExist == true && usernameExist == false){
        console.log("A user with that email exists!");
        console.log("Forgot password?");

    }
    else if(emailExist == false && usernameExist == true){
        console.log("A user with that username exists!");
        console.log("Forgot password?");

    }
    else{

        let htmlCode = `<html lang="sv"><head>`
        htmlCode += `<meta charset="utf-8">`
        htmlCode += `<meta name="viewport" content="width=device-width, initial-scale=1">`
        htmlCode += `<title>The Movie App - Google API</title>`
        htmlCode += `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>`
        htmlCode += `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">`
        htmlCode += `<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>`
        htmlCode += `<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>`
        htmlCode += `</head>`

        htmlCode += `<div class="container-fluid margin-auto my-4" >`
        htmlCode += `<div class="row text-center">`
        htmlCode += `<h4 class="col-12">Nytt lösenord skickat till:</h4>`
        htmlCode += `<div class="col-12 mb-4">`
        htmlCode += `Användarnamn: `+ req.body.username + `</br>`
        htmlCode += `Email: `+ req.body.email + `</br>`
        htmlCode += `</div>`
        htmlCode += `</div>`
        htmlCode += `<div class="row text-center">`
        htmlCode += `<form class="col-12" action="/login" method="get" id="">`
        htmlCode += `<button class="btn btn-primary" type="submit">Vidare</button>`
        htmlCode += `</form>`
        htmlCode += `</div>`
        htmlCode += `</div></html>`

        res.send(htmlCode);


        }

    

    //send the data reae with the response
    console.log("post: /createUser");
    console.log("req.session.username: " + req.session.username);
    
}); 




//---------- MISC ---------- //

