// ----- ADD/DELETE/UPDATE ----- //




// Prefs //
async function getPrefsDB(type) {
  console.log("//-----getPrefsDB()-----//") // DEBUGGING

  let url = '/getPref/' + type;
      
  let response = await fetch(url);
  let data = await response.json();
          
  return data;
          
}

// Movies //
async function getMoviesDB() {
  console.log("//-----getMoviesFS()-----//") // DEBUGGING

  let url = '/getMoviesFS';
      
  let response = await fetch(url);
  let data = await response.json();

  console.log("Returned movies:") // DEBUGGING
  console.log(data) // DEBUGGING
  return data;
          
}

async function getMovieDB(movie) {
  console.log("//-----getMovieDB()-----//")

  //movie = JSON.stringify(movie);


  let response = await fetch("/getMovieFS/" + movie.id, {
    method: 'GET',
  });

  let data;
  if (response.status == 200) {
      data = await response.json();
  }

  if (response.status == 208) {
      data = 208;
  }

  return data;

}

async function addMovieDb(movie){
  console.log("//-----addMovieDb()-----//")
  console.log("Movie to send: " + movie.id + ", " + movie.title)

  let url = '/addMovieFS';
  
  let res_status;
  let res_data;

  let response = await $.post( url,  
  { 
    movie: movie,
  },
  function(data, status, jqXHR) {// success callback
    console.log('status: ' + status + ', data: ' + data);

    res_data = data;
    res_status = status;
  });

  return res_data;
  /*
  let data;
  if (response.status == 200) {
      data = await response.json();
  }

  if (response.status == 404) {
      data = 404;
  }
          
  return data;
  */
  

};

async function updateMovieDB(movie_to_update) {
  console.log("//-----updateMovieDB()-----//")

  $.post( "/updateMovieFS",  
  { 
    movie: movie_to_update,
  });

}

async function deleteMovieDB(movie){
  console.log("//-----deleteMovieDB()-----//")
  for (let i = 0; i < movies.length; i++) {
      if (movie.id == movies[i].id) {
          console.log("Found movie to delete: " + movie.title);

      }
  }

  $.post( "/deleteMovieFS",  
    { 
      movie: movie, 
    });

  

};

// Lists //
async function getListsDB() {
  console.log("//-----getListsFS()-----//") // Debugging

  let url = '/getListsFS';
      
  let response = await fetch(url);
  let data = await response.json();
          
  return data;
          
}

async function getListDB(list) {
  console.log("//-----getListDB()-----//") // Debugging

  //movie = JSON.stringify(movie);


  let response = await fetch("/getListFS/" + list.title, {
    method: 'GET',
  });

  let data;
  if (response.status == 200) {
      data = await response.json();
  }

  if (response.status == 208) {
      data = 208;
  }

  return data;

}

async function addListDb(list){
  console.log("//-----addListDb()-----//") // Debugging
  console.log("List to send: " + list.id + ", " + list.title) // Debugging

  let url = '/addListFS';
  
  let res_status;
  let res_data;

  let response = await $.post( url,  
  { 
    list: list,
  },
  function(data, status, jqXHR) {// success callback
    console.log('status: ' + status + ', data: ' + data); // Debugging

    res_data = data;
    res_status = status;
  });

  return res_data;
  /*
  let data;
  if (response.status == 200) {
      data = await response.json();
  }

  if (response.status == 404) {
      data = 404;
  }
          
  return data;
  */
  

};

async function updateList(list_to_update){
  $.post( "/updateListFS",  
  { 
    list: list_to_update,
  });

}

// Users //
async function updateUser(user_to_update){
  $.post( "/updateUserFS",  
  { 
    user: user_to_update,
  });

}

async function getUserFS(username) {
  console.log("//-----getUserFS()-----//")

  let url = '/getUserFS/' + username;
      
  let response = await fetch(url);

  let data;
  if (response.status == 200) {
      data = await response.json();
  }

  if (response.status == 404) {
      data = 404;
  }

  //console.log(response) // DEBUGGING
  //console.log(response.status) // DEBUGGING

  return data;
          
}
