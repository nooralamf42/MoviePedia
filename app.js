const API = "https://www.omdbapi.com/?apikey=f0e27930&t="

// to get a random movie on start
const randomMovies = ["avatar", "dangal", "WALL-E", "up", "prey", "sultan", "spider man", "batman", "itaewon class", "my love from another star", "reply 1988", "fight for my way"]
let randomMovie = randomMovies[Math.floor(Math.random() * randomMovies.length)]

// function to get data from api and pass it in the demo container
getData = (n) => {
    document.querySelector(".notFoundContainer").classList.add("notFoundHidden")
    loadingScreen.classList.add("loading-screen")
    hide.classList.add("hide")
    fetch(API+ n).then((response) => {
        return response.json();
    }).then((data) => {
        loadingScreen.classList.remove("loading-screen")
        if(data.Poster == "N/A")
            demoImg.src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg"
        else
            demoImg.src = data.Poster;
        
        if(data.Response == "False"){
            document.querySelector(".notFoundContainer").classList.remove("notFoundHidden")
        }
        else{
            hide.classList.remove("hide")
            movieName.innerText = data.Title;
            plot.innerHTML = `<em>${data.Plot}</em>`;
            released.innerText = "Released on: " + data.Released;
            runtime.innerText = "Runtime: " + data.Runtime;
            genre.innerText = "Genre: " + data.Genre;
            director.innerText = "Director: " + data.Director;
            actors.innerText = "Actors: " + data.Actors;
            language.innerText = "Language: " + data.Language;
            awards.innerText = "Awards: " + data.Awards;
            rating.innerText = "imdb Rating: " + data.imdbRating;

            // converting dollar into inr
            boxOffice.innerText = `Box Office: ₹${Math.round(eval(data.BoxOffice.replace(/,/g, '').replace("$","")*82.18))}`;
        }
        }
    )
}

// getting movie details on pressing enter
userInput.onkeydown = (k) =>{
    if(userInput.value != "")
        if(k.key == "Enter")
            getData(userInput.value)
}

// getting movie details on clicking get data button
searchBtn.onclick = () =>{
    if(userInput.value != "")
        getData(userInput.value)
}

// getting random movie on reload
getData(randomMovie)

// preventing right click
document.addEventListener("contextmenu", (e) => e.preventDefault() )