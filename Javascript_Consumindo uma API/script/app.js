// const movies = [
//     {
//         img: "./images/image 1.png",
//         title: "Avengers End Game",
//         score: 9.2,
//         year: 2019,
//         isFavorite: true,
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book."
//     },
//     {
//         img: "./images/image 1.png",
//         title: "Harry Potter e a Pedra Filosofal",
//         score: 9.6,
//         year: 2001,
//         isFavorite: false,
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book."
//     },
//     {
//         img: "./images/image 1.png",
//         title: "O Jardim Secreto",
//         score: 9.9,
//         year: 1991,
//         isFavorite: true,
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book."
//     },
//     {
//         img: "./images/image 1.png",
//         title: "Gaiola das Loucas",
//         score: 8.9,
//         year: 1996,
//         isFavorite: false,
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book."
//     }
// ];

let movies = [];
const checkFavorite = document.querySelector('#check-favorite');
const wrapperMovies = document.querySelector('.wrapper-movies');
const searchFilm = document.querySelector('#search-film');
const btnSearch = document.querySelector('#opt-search');

function renderMovie(movie) {
    let favs = JSON.parse(localStorage.getItem('filmes')) || [];
    let checkmark = `<input type="checkbox" name="fav" id="fav-${movie.id}">`;
    favs.forEach(fav => {
        if (fav.id == movie.id) {
            checkmark = `<input type="checkbox" name="fav" id="fav-${movie.id}" checked>`;
        }
    });
    let imgMovie = movie.poster_path == null ?
        './images/film-icon.png'
        : `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    return (`
            <img src="${imgMovie}" alt="Cartaz do filme ${movie.original_title}" class="img-movie">
            <div class="info">
                <p class="info-title">
                    ${movie.title}
                    <span>(${movie.release_date.split('-').splice(0, 1)})</span>
                </p>
                <p class="info-plus">
                    <span>
                        <img src="./images/star-icon.svg" alt="Pontuação">
                        ${movie.vote_average}
                    </span>
                    <span>
                        ${checkmark}
                        <label for="fav-${movie.id}" onclick="newFav(${movie.id})">Favoritar</label>
                    </span>
                </p>
            </div>
            <div class="description">${movie.overview.length > 435 ? movie.overview.substr(0, 435).concat('...') : movie.overview == '' ? 'Não há informações sobre esse filme' : movie.overview}</div>
    `);
}

async function clickFind() {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${searchFilm.value}`;
    let response = await fetch(URL);
    let data = await response.json();

    movies = data.results;
    console.log(movies);
    wrapperMovies.innerHTML = '';
    movies.forEach(movie => {
        let card = document.createElement('article');
        card.classList.add('card-movie');
        card.innerHTML = renderMovie(movie);
        wrapperMovies.appendChild(card);
    })
}

function findFilm(event) {
    if (event.code == 'Enter') {
        clickFind();
    }
}

async function allMovies() {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;
    wrapperMovies.innerHTML = '';

    let response = await fetch(URL);
    let data = await response.json();
    movies = data.results;
    //console.log(movies);

    movies.forEach(movie => {
        let card = document.createElement('article');
        card.classList.add(`card-movie`, `card-movie-${movie.id}`);
        card.innerHTML = renderMovie(movie);
        wrapperMovies.appendChild(card);
    });
}

function newFav(id) {
    let favs = JSON.parse(localStorage.getItem('filmes')) || [];
    let newArr = favs.filter(fav => {
        return fav.id != id;
    })

    if (newArr.length != favs.length) {
        localStorage.setItem('filmes', JSON.stringify(newArr));
        let cardFav = document.querySelector(`.card-movie-${id}`);
        cardFav.style.display = 'none';
        console.log(cardFav);
        return (console.log("Retirado dos Favoritos"))
    }

    movies.filter(item => {
        if (item.id == id) {
            let movie = JSON.parse(localStorage.getItem('filmes')) || [];
            movie.push(item);
            localStorage.setItem('filmes', JSON.stringify(movie));
            return (console.log("Inserido nos Favoritos"))
        }
    })
}

function allFavorite() {
    wrapperMovies.innerHTML = '';
    let fav = JSON.parse(localStorage.getItem('filmes')) || [];
    //console.log(fav)
    fav.forEach(movie => {
        let card = document.createElement('article');
        card.classList.add(`card-movie`, `card-movie-${movie.id}`);
        card.innerHTML = renderMovie(movie);
        wrapperMovies.appendChild(card);
    });
}

checkFavorite.addEventListener('click', () => {
    if (checkFavorite.checked) {
        allFavorite();
    } else {
        allMovies();
    }
});

searchFilm.addEventListener('keyup', findFilm);
btnSearch.addEventListener('click', clickFind);

window.onload = allMovies();