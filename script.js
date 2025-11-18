let movieInput = document.getElementById("movieInput");
let searchBtn = document.getElementById("searchBtn");
let movieResult = document.getElementById("movieResult");

const API_KEY = "4a3b711b"; // OMDB free API Key

function getMovie() {
    let movieName = movieInput.value.trim();
    if(!movieName){
        movieResult.innerHTML = `<p class="err">Please enter a movie name</p>`;
        return;
    }

    // Fade out previous result
    movieResult.classList.add("hide");

    searchBtn.disabled = true; // disable button during fetch
    movieResult.innerText = "Loading...";

    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            searchBtn.disabled = false; // enable button after fetch

            if(data.Response === "False"){
                movieResult.innerText = "Movie not found!";
                return;
            }

            // Show movie card
            movieResult.innerHTML = `
                <div class="movie-card">
                    <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/100"}" alt="${data.Title} Poster">
                    <div class="movie-info">
                        <h3>${data.Title} (${data.Year})</h3>
                        <p><strong>Genre:</strong> ${data.Genre}</p>
                        <p><strong>Actors:</strong> ${data.Actors}</p>
                        <p><strong>Plot:</strong> ${data.Plot.length > 200 ? data.Plot.substring(0,200) + "..." : data.Plot}</p>
                    </div>
                </div>
            `;

            // Fade in new result
            setTimeout(() => movieResult.classList.remove("hide"), 50);

            // Clear input and focus
            movieInput.value = "";
            movieInput.focus();
        })
        .catch(err => {
            searchBtn.disabled = false;
            movieResult.innerText = "Something went wrong!";
            console.log(err);
        });
}

// Event listeners
searchBtn.addEventListener("click", getMovie);
movieInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        getMovie();
    }
});
