const movies = [
    {
        img: "./images/image 1.png",
        title: "Avengers End Game",
        score: 9.2,
        year: 2019,
        isFavorite: true,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book."
    },
    {
        img: "./images/image 1.png",
        title: "Harry Potter e a Pedra Filosofal",
        score: 9.6,
        year: 2001,
        isFavorite: false,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book."
    },
    {
        img: "./images/image 1.png",
        title: "O Jardim Secreto",
        score: 9.9,
        year: 1991,
        isFavorite: true,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book."
    },
    {
        img: "./images/image 1.png",
        title: "Gaiola das Loucas",
        score: 8.9,
        year: 1996,
        isFavorite: false,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book."
    }
];

const checkFavorite = document.querySelector('#check-favorite');
const wrapperMovies = document.querySelector('.wrapper-movies');

function renderMovie(movie) {
    let favorite;
    if (movie.isFavorite) {
        favorite = `<input type="checkbox" name="fav" id="fav" checked>`;
    } else {
        favorite = `<input type="checkbox" name="fav" id="fav">`;
    }

    return (`
            <img src="${movie.img}" alt="Cartaz do filme ${movie.title}">
            <div class="info">
                <p class="info-title">
                    ${movie.title}
                    <span>(${movie.year})</span>
                </p>
                <p class="info-plus">
                    <span>
                        <img src="./images/star-icon.svg" alt="Pontuação">
                        ${movie.score}
                    </span>
                    <span>
                        ${favorite}
                        <label for="fav">Favoritar</label>
                    </span>
                </p>
            </div>
            <div class="description">${movie.description}</div>
    `);
}

function allMovies() {
    wrapperMovies.innerHTML = '';
    movies.forEach(movie => {
        let card = document.createElement('article');
        card.classList.add('card-movie');
        card.innerHTML = renderMovie(movie);
        wrapperMovies.appendChild(card);
    });
}

function allFavorite() {
    wrapperMovies.innerHTML = '';
    movies.forEach(movie => {
        if (movie.isFavorite) {
            let card = document.createElement('article');
            card.classList.add('card-movie');
            card.innerHTML = renderMovie(movie);
            wrapperMovies.appendChild(card);
        }
    });
}

checkFavorite.addEventListener('click', () => {
    if (checkFavorite.checked) {
        allFavorite();
    } else {
        allMovies();
    }
});

window.onload = allMovies();