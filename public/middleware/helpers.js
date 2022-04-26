
// ----- TIME ----- //
function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    //return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
    return rhours + "h " + rminutes + "m";
}

function getYear(date){
    var y = new Date(date);
    var year = y.getFullYear(); // returns year

    return year;
}

function getDate(date){
  var y = new Date(date);
  let day = y.getDate();
  let month = y.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  let year =  y.getFullYear();
  let datum = year + "-" + month + "-" + day; 

  return datum;
}


// ----- MISC ----- //
function delay(delayInms) {
  console.log("<| delay(" + delayInms + "ms) |>")
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

// ---------- MSG ---------- //
// ALERT //
/* Vissa meddelande ifall film tas bort, läggs till eller filmlista töms*/
function showAlert(movie, method, extra, list){
  console.log("//-----showAlert()-----//")
  document.body.appendChild(new Alert(movie, method, extra, list)); // Skapa nytt meddelande

}

function showAlertConfirm(movie, _string, display, list){
  console.log("//-----showAlertConfirm()-----//")
  document.body.appendChild(new AlertConfirm(movie, _string, display, list)); // Skapa nytt meddelande

}

// ----- SORT ----- //
// SORT MOVIES BY: (..., ..., ...) //
async function sortMovies(list, method, order) {


  //fruits.sort();
  // fruits.reverse();
  //cars.sort(function(a, b){return a.year - b.year});

  // By title //
  if (method == "title") {
    await list.sort(function(a, b){
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }

  // By release date //
  if (method == "year") {
    await list.sort(function(a, b){return a.year - b.year});
  }

  // By id //
  if (method == "id") {
    await list.sort(function(a, b){return a.id - b.id});
  }

  // By budget //
  if (method == "budget") {
    await list.sort(function(a, b){return a.budget - b.budget});
  }

  // By rating //
  if (method == "tmdb_rating") {
    await list.sort(function(a, b){return a.vote_average - b.vote_average});
  }
  

  if (order == "reverse") {
    await list.reverse();
  }
      
}

