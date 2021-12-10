const URL="https://fabulous-zany-saguaro.glitch.me/movies"


// FETCH REQUEST
// Get the array of movie objects and send to the render function
let getmovies = () => {
    return fetch(URL).then(resp => resp.json()).then(data => rendermovies(data)).catch(err => console.error(err));
}
getmovies();
// RENDER FUNCTION
// Take each movie (object) and turn each attribute into HTML Elements for display
const rendermovies=(movies)=> {
    // Empty the HTML String on each call
    let moviesHTML= "";
    // Iterate through each movie
    for(let movie of movies) {
        // Create a new "Movie" Div, with nested divs for each listed attribute
        moviesHTML+='<div class="movie">'+
        '<div class="title">' + movie.title + '</div>'+
        '<div class="year"> Released: ' + movie.year + '</div>'+
        '<div class="director"> Director' + movie.director + '</div>'+
        '<div class="rating"> Rating: ' + movie.rating + '</div>'+
        '<div class="actors"> Starring: ' + movie.actors + '</div>'+

        // '<div class="title">'+ movie.  '</div>+
        '</div>'
    }
    // Set the HTML of the target to the given string of elements & data.
    $('#movies').html(moviesHTML);
}
// FORM SUBMISSION: ADD FUNCTION
// On click of "Add" Button, will create a new movie object and send to the createMovie() function
$('#add-movie').click(function(e){
    e.preventDefault();
   let title = $('#add-title').val();
   let rating = $('#add-rating').val();
   let newMovie = {title, rating};
   createMovie(newMovie);
});
// POST REQUEST
// Takes in the new movie and uses POST to add it to the JSON file
let createMovie = (movie) => {
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movie)
    }
    // after posting, getMovies is called again to update the list
    fetch(URL, options).then(resp => resp.json()).then(getmovies()).catch(err => console.error(err));
}