const URL="https://fabulous-zany-saguaro.glitch.me/movies";


// FETCH REQUEST
// Get the array of movie objects and send to the render function
const getmovies = () => {
    return fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            rendermovies(data);
            console.log(data);
        })
        .catch(err => console.error(err));
}
getmovies();
console.log(getmovies());
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
        '<img class="poster" src="' + movie.poster + '" alt="a movie poster">'+
        '<div class="year"> Released: ' + movie.year + '</div>'+
        '<div class="director"> Directed by ' + movie.director + '</div>'+
        '<div class="rating"> Rating: ' + movie.rating + '</div>'+
        '<div class="actors"> Starring: ' + movie.actors + '</div>'+
        '<div class="plot">'+ movie.plot + '</div>' +
        // EDIT & DELETE BUTTONS
        // Rendered with the particular movie ID, this allows targeting of the class "edit-btn" or "delete-btn"
        // for simplified event function, while still allowing *this* particular movie to be targeted to PATCH or DELETE
        '<button class="edit-btn"  data-id="' + movie.id + '">Edit</button>' +
        '<button class="delete-btn" data-id="' + movie.id + '">Delete</button>' +
        // '<div class="title">'+ movie.  '</div>+
        '</div>'
    }
    // Set the HTML of the target to the given string of elements & data.
    $('#movies').html(moviesHTML);
    // EDIT CLICK FUNCTION
    $('.edit-btn').click(function (){
        populateEdit($(this).data("id"));
    });
    // DELETE CLICK FUNCTION
    $('.delete-btn').click(function (){
        deleteMovie($(this).data("id"));
    });
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
// FORM POPULATE: EDIT FUNCTION
// Takes the movie ID from an edit-button and populates the edit form with the current data for that movie
const populateEdit = (movieID) => {
    // First, get the information for that movie ID
    fetch(`${URL}/${movieID}`)
        .then(resp => resp.json())
        // Take the movie attributes and set the values within the edit form to match the value of each attribute
        .then(movie =>{
            $('#edit-title').val(movie.title);
            $('#edit-release').val(movie.year);
            $('#edit-director').val(movie.director);
            $('#edit-rating').val(movie.rating);
            $('#edit-actors').val(movie.actors);
            $('#edit-genre').val(movie.genre);
            $('#edit-plot').val(movie.plot);
        })
        .catch(err => console.error(err));
}
// FORM SUBMISSION: EDIT FUNCTION
// On click of "Apply" Button, will create an object with the inputs on the edit form and send to the editMovie() function
$('#edit-apply').click(function(e){
    e.preventDefault();
    let title = $('#edit-title').val();
    let year = $('#edit-release').val();
    let director = $('#edit-director').val();
    let rating = $('#edit-rating').val();
    let actors = $('#edit-actors').val();
    let genre = $('#edit-genre').val();
    let plot = $('#edit-plot').val();
    let editedMovie = {title, director, year, rating, actors, genre, plot};
    editMovie(editedMovie);
});
// POST REQUEST
// Takes in the new movie and uses POST to add it to the JSON file
const createMovie = (movie) => {
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movie)
    }
    // after posting, getMovies is called again to update the list
    fetch(URL, options).then(resp => resp.json()).then(getmovies()).catch(err => console.error(err));
}
// PATCH REQUEST
// Takes the movie from the Edit Form and uses PATCH to change the values of it's attributes in the JSON file
const editMovie = (movie) => {
    let movieID = movie.id;
    let options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movie)
    }
    return  fetch(`${URL}/${movieID}`, options).then(resp => resp.json()).then(getmovies()).catch(err => console.error(err));
}
// DELETE REQUEST
// Takes the movie ID from a delete-button and uses DELETE to to remove it from the JSON file
const deleteMovie = (movieID) => {
    let options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    }
   return  fetch(`${URL}/${movieID}`, options).then(resp => resp.json()).then(getmovies()).catch(err => console.error(err));
}