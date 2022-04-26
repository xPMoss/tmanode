// ---------- LISTS.JS ---------- //


let lists = document.getElementById("lists");


let movieList_lists;

startLists();

async function startLists() {
    // Load user
    user = await new User();
    await user.init();

    userElement = await new UserElement(user);
    //userElement.renderHome();

    movieList_lists = new MovieList("lists");

}