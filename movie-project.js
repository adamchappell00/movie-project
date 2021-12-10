const URL="https://fabulous-zany-saguaro.glitch.me/movies"


// FETCH REQUEST
// Get the array of movie objects and send to the render function
let getmovies = () => {
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
        '<img class="poster" src="' + movie.poster + '">'+
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
    $('.delete-btn').click(function (){
        let buttonvalue = $(this).data("id");
        console.log(buttonvalue)
        alert("hello")
    })
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
let deleteMovie = (movieid) => {
    let options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    }
   return  fetch(`${URL}/${movieid}`, options).then(resp => resp.json()).then(getmovies()).catch(err => console.error(err));
}
$('.delete-btn').click(function (){
    let buttonvalue = $(this).data("id");
    console.log(buttonvalue)
alert("hello")
})

// deleteMovie(5);
//     $(document).ready(function(){
// }
//     $("#edit-btn").prop("value", "Input New Text");
