//TMDB API

const API_KEY ='api_key=f44fe14a52472f6d51ce5cf597e1ef33';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY; // discover is to find popularity & based on that we get the url
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



//when the page loads, calling this function. show the movies we get from the data 
getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        showMovies(data.results); //passing the results of the data in this function
    })
}

//gonna loop through the 20 elements of the array 
function showMovies(data){
    main.innerHTML = ''; //empty string so everytime the function is called, there is a blank slate to work with
    data.forEach(movie =>{
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `<img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`;

        main.appendChild(movieEl);
    })
}

function getColor(vote_average){
    if(vote_average >= 8){
        return 'green';
    } else if(vote_average >= 6){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit',(e) => {
    e.preventDefault();

    const searchTerm = search.value;

    //if searchTerm exists then call getMovies();
    if(searchTerm){
        getMovies(searchURL + '&query=' + searchTerm);
    }else{
        getMovies(API_URL);
    }
})