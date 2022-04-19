var movieName = "avengers"
    //mostViral
    document.querySelector(".mostViral").addEventListener("click", (e)=>{
        document.querySelector(".hiddenDropdown").style.display = "block";
    })

     
    document.querySelector(".mostV").addEventListener("click", (e)=>{
        movieName = "the lord of the rings";
        document.querySelector(".container").innerHTML = null;
        count = 0;
        getDataForContainer("the lord of the rings");
        document.querySelector(".title").innerHTML = e.target.innerHTML;
        setTimeout(()=>{
            document.querySelector(".hiddenDropdown").style.display = "none";
        },100)
        
    })

    document.querySelector(".userS").addEventListener("click", (e)=>{
        movieName = "The Godfather";
        document.querySelector(".container").innerHTML = null;
        count = 0;
        getDataForContainer("The Godfather");
        document.querySelector(".title").innerHTML = e.target.innerHTML;
        setTimeout(()=>{
            document.querySelector(".hiddenDropdown").style.display = "none";
        },100)
    })

    document.querySelector(".highestS").addEventListener("click", (e)=>{
        movieName = "inception";
        document.querySelector(".container").innerHTML = null;
        count = 0;
        getDataForContainer("inception");
        document.querySelector(".title").innerHTML = e.target.innerHTML;
        setTimeout(()=>{
            document.querySelector(".hiddenDropdown").style.display = "none";
        },100)
    })

    //newest
    document.querySelector(".newest").addEventListener("click", (e)=>{
        document.querySelector(".newesthiddenDropdown").style.display = "block";
    })

    document.querySelector(".pop").addEventListener("click", (e)=>{
        movieName = "the dark knight";
        document.querySelector(".container").innerHTML = null;
        count = 0;
        getDataForContainer("the dark knight");
        document.querySelector("#newestTitle").innerHTML = e.target.innerHTML;
        setTimeout(()=>{
            document.querySelector(".newesthiddenDropdown").style.display = "none";
        },100)
    })

    document.querySelector(".news").addEventListener("click", (e)=>{
        movieName = "spider-man";
        document.querySelector(".container").innerHTML = null;
        count = 0;
        getDataForContainer("spider-man");
        document.querySelector("#newestTitle").innerHTML = e.target.innerHTML;
        setTimeout(()=>{
            document.querySelector(".newesthiddenDropdown").style.display = "none";
        },100)
    })

    document.querySelector(".best").addEventListener("click", (e)=>{
        movieName = "superman";
        document.querySelector(".container").innerHTML = null;
        count = 0;
        getDataForContainer("superman");
        document.querySelector("#newestTitle").innerHTML = e.target.innerHTML;
        setTimeout(()=>{
            document.querySelector(".newesthiddenDropdown").style.display = "none";
        },100)
    })

    let arr = ["james bond","rocky","star wars","joker","friends","thor","hulk"];
    let num = 0;
    document.querySelector(".ran").addEventListener("click", (e)=>{
        if(num === 6) num = 0;
        movieName = arr[num];
        document.querySelector(".container").innerHTML = null;
        count = 0;
        getDataForContainer(arr[num]);
        num++;
        document.querySelector("#newestTitle").innerHTML = e.target.innerHTML;
        setTimeout(()=>{
            document.querySelector(".newesthiddenDropdown").style.display = "none";
        },100)
    })


    //searchMovies
    let x;
    function debounce(){

        if(x){
            clearInterval(x);
        }

        x = setTimeout(()=>{
            getMovies();
        },500)
    }

    async function getMovies(){

        let name = document.querySelector(".searchMovies").value;
        if(name.length <= 2){
            document.querySelector(".searchDropdown").style.display = "none";
            return false;
        }
        let url = `https://www.omdbapi.com/?s=${name}&apikey=f97f7bae`;

        try{    
            let responce = await fetch(url);
            let result = await responce.json();
            appendOnSearchDiv(result.Search);
        }
        catch{
            console.log("something went wrong");
        }
    }

    function appendOnSearchDiv(data){

        document.querySelector(".searchDropdown").style.display = "block";
        document.querySelector(".searchDropdown").innerHTML = null;

        data.forEach((el)=>{

            let div = document.createElement("div");
            div.innerHTML = el.Title;
            div.onclick = function (){
                movieinfo1(el.Title);
            };

            document.querySelector(".searchDropdown").append(div);
        })
    }

    let count = 0;
    getDataForContainer(movieName);
    async function getDataForContainer(movieName){
        count++;

        let url = `https://www.omdbapi.com/?apikey=f97f7bae&s=${movieName}&page=${count}`;

        try{    
            let responce = await fetch(url);
            let result = await responce.json();
            appendOnContainer(result.Search);
        }
        catch{
            console.log("something went wrong");
        }
    }

    function appendOnContainer(movie){

        let x = ``;

        movie.forEach(({Title,Year,imdbID,Poster})=>{

            document.querySelector(".container").innerHTML += `<div class="card" onclick="movieinfo1(' + ${Title}+ ');">
                    <div class="cardImage">
                        <img src=${Poster} width="240" height="350" loading="lazy" alt="">
                    </div>
                   
                    <div class="cardText">
                        <div class="cardTitle">
                            ${Title}
                        </div>
                        <div class="cardComment">
                            <span>${Year}</span>
                            <span>IMDB - ${imdbID}</span>
                        </div>
                    </div>
            </div>`;
        })
        
    }
    
    let mainDiv = document.querySelector(".container");


    window.addEventListener("scroll", ()=>{

        if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
            getDataForContainer(movieName);
        }
    })


    async function movieinfo1(nameof){
        document.querySelector(".searchDropdown").style.display = "none";
        document.querySelector(".container").style.display = "none";
        document.getElementById("displayMovie").style.display = "block";
        let url = `https://www.omdbapi.com/?t=${nameof}&apikey=f97f7bae`;
        try{

            if(nameof.length <= 2){
                return false;
            }
            var mydata = await fetch(url);
            var res = await mydata.json();
            display(res);
        }
        catch(err){
            console.log(err);
        }
    }

    function display(obj){

        document.getElementById("displayMovie").innerHTML= null;

        let div1 = document.createElement("div");
        div1.setAttribute("id","title");

        let p1 = document.createElement("p");
        p1.setAttribute("id","tit");
        p1.innerHTML = obj.Title;

        let p2 = document.createElement("p");
        p2.innerHTML = `<b>Year</b>: ${obj.Year}`;

        let p3 = document.createElement("p");
        p3.innerHTML = `<b>Runtime</b>: ${obj.Runtime}`;

        let p4 = document.createElement("p");
        p4.innerHTML = `<b>IMDb Rating</b>: ${obj.imdbRating}`;

        if(obj.imdbRating > 8.5){
            p4.innerHTML = `<b>IMDb Rating</b>: ${obj.imdbRating} <b>Recommended</b>`;
        }

        let p5 = document.createElement("p");
        p5.innerHTML = `<b>IMDb Votes</b>: ${obj.imdbVotes}`;

        div1.append(p1,p2,p3,p4,p5);

        let div2 = document.createElement("div");
        div2.setAttribute("id","info");

        let div3 = document.createElement("div");
        div3.setAttribute("id","imgdiv");

        let img = document.createElement("img");
        img.src = obj.Poster;

        div3.append(img);

        let div4 = document.createElement("div");
        div4.setAttribute("id","information");

        let p6 = document.createElement("p");
        p6.innerHTML = obj.Plot + "<hr><br>";

        let p7 = document.createElement("p");
        p7.innerHTML = `<b>Director</b>: ${obj.Director} <hr>`;

        let p8 = document.createElement("p");
        p8.innerHTML = `<b>Writer</b>: ${obj.Writer} <hr>`;

        let p9 = document.createElement("p");
        p9.innerHTML = `<b>Genre</b>: ${obj.Genre} <hr>`;

        let p10 = document.createElement("p");
        p10.innerHTML = `<b>Stars</b>: ${obj.Actors} <hr>`;

        let p11 = document.createElement("p");
        p11.innerHTML = `<b>Language</b>: ${obj.Language} <hr>`;

        let p12 = document.createElement("p");
        p12.innerHTML = `<b>BoxOffice</b>: ${obj.BoxOffice} <hr>`;

        div4.append(p6,p7,p8,p9,p10,p11,p12);

        div2.append(div3,div4);

        document.getElementById("displayMovie").append(div1,div2);
    }