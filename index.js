document.body.addEventListener(`keydown`, (event) => {
  if (event.key === `Enter`) {
    let query = document.querySelector(`.input`).value;
    document.querySelector(`.results`).innerHTML = `Search results for: ${query}`;
    showLoadingSpinner();
    setTimeout(() => {
      fetchMovies(query);
    }, 2000);
  }
});

document.querySelector(`.search`).addEventListener(`click`, () => {
  let query = document.querySelector(`.input`).value;
  document.querySelector(`.results`).innerHTML = `Search results for: ${query}`;
  showLoadingSpinner();
  setTimeout(() => {
    fetchMovies(query);
  }, 2000);
});


function showLoadingSpinner() {
  document.querySelector(`.loading-spinner`).classList.add(`visible`);
  document.querySelector(`.page_wrapper`).innerHTML = "";
}

function hideLoadingSpinner() {
  document.querySelector(`.loading-spinner`).classList.remove(`visible`);
}


async function fetchMovies(query) {
  let apiKey = "e9ee96f6";
  let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.Search) {
      document.querySelector(`.page_wrapper`).innerHTML = "";
      hideLoadingSpinner();
      displayMovies(data.Search);
    } else {
      hideLoadingSpinner();
      displayError(`No movies found or error in response.`);
    }
  } catch (error) {
    hideLoadingSpinner();
    displayError(`Error fetching movie data.`);
  }
}


function displayError(message) {
  let errormessage = document.querySelector(`.page_wrapper`);
  errormessage.innerHTML = `<p>${message}</p>`;
}


function displayMovies(movies) {
  let movieHtml = "";
  movies.forEach((movie, index) => {
    if (index <= 5)
      movieHtml += `
         <div class="movie">
            <h2>${movie.Title}</h2>
            <img class="img" src="${movie.Poster}" alt="" />
            <p>Year:${movie.Year}</p>
          </div>
   `;
    document.querySelector(`.page_wrapper`).innerHTML = movieHtml;
  });
}
