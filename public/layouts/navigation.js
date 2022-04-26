

window.onload = async function(){
    //await startNavigation();
    //await setNavigation();

    let navigation = await new Navigation();
}

class Navigation{
    constructor(){
        let nav = document.createElement("div");
        nav.id = "nav";
        nav.classList.add("container-fluid")
        nav.classList.add("bkg-blue")

        let row = document.createElement("div");
        row.id = "new_row";
        row.classList.add("row")

        let navObjects = [
            {id:"homeNav", title:"Hem", link:"/home"},
            {id:"moviesNav", title:"Mina filmer", link:"/movies"},
            //{id:"listsNav", title:"Listor", link:"/lists"},
            {id:"empty", title:"empty", link:"empty"},
            {id:"profileNav", title:"Listor", link:"/profile"},
        ]

        console.log("navObjects: " + navObjects.length);

        for (let i = 0; i < navObjects.length; i++) {
            let obj = navObjects[i];

            let link = document.createElement("a");
            

            if (obj.id != "profileNav" && obj.id != "empty") {
                link.classList.add("btn")
                link.classList.add("col-auto")
                link.classList.add("pt-3")
                link.style.fontSize = "1rem";
                link.id = obj.id;
                link.innerHTML = obj.title;


            }

            if(obj.id == "profileNav"){
                let icon = document.createElement("i");
                icon.classList.add("bi")
                icon.classList.add("bi-person-fill")
                icon.classList.add("float-right")
                icon.classList.add("p-2")
                icon.classList.add("btn")
                icon.id = obj.id;
                icon.style.fontSize = "1.5rem";
                link.appendChild(icon);

                
            }

            if(obj.id != "empty"){
                link.setAttribute("href", obj.link);
            }
            
            if(obj.id == "empty"){
                link = document.createElement("div");
                link.classList.add("col")
            }

            
            row.appendChild(link);

        }


        nav.appendChild(row);
        document.body.prepend(nav);

        setNavigation();

    }

    setNavigation(){
        let home = document.getElementById("homeNav");
        let movies = document.getElementById("moviesNav");
        let lists = document.getElementById("listsNav");
        let profile = document.getElementById("profileNav");
    
        if(location.pathname=="/home"){
            let btn = home;
            btn.style.fontWeight = "bold";
            btn.style.color = "white";
    
        }
    
        if(location.pathname=="/movies"){
            let btn = movies;
            btn.style.fontWeight = "bold";
            btn.style.color = "white";
    
        }
    
        if(location.pathname=="/lists"){
            let btn = lists;
            btn.style.fontWeight = "bold";
            btn.style.color = "white";
    
        }
    
        if(location.pathname=="/profile"){
            let btn = profile;
            btn.style.fontWeight = "bold";
            btn.style.color = "white";
    
        }
    }

}

async function startNavigation(){
    

    await nav.load("navigation.html");

    
    await $("#nav").load("navigation.html");
}

async function setNavigation(){

    let home = document.getElementById("homeNav");
    let movies = document.getElementById("moviesNav");
    let lists = document.getElementById("listsNav");
    let profile = document.getElementById("profileNav");

    if(location.pathname=="/home"){
        let btn = home;
        btn.style.fontWeight = "bold";
        btn.style.color = "white";

    }

    if(location.pathname=="/movies"){
        let btn = movies;
        btn.style.fontWeight = "bold";
        btn.style.color = "white";

    }

    if(location.pathname=="/lists"){
        let btn = lists;
        btn.style.fontWeight = "bold";
        btn.style.color = "white";

    }

    if(location.pathname=="/profile"){
        let btn = profile;
        btn.style.fontWeight = "bold";
        btn.style.color = "white";

    }
}