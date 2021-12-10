const url="https://fabulous-zany-saguaro.glitch.me/movies"

let gitmovies = () => {
    return fetch(url).then(resp => resp.json()).catch(err => console.error(err));
}
gitmovies().then(data=>rendermovies(data));
gitmovies().then(data=>console.log(data));
const rendermovies=(movies)=> {
    let moviesHTML= "";
    for(let movie of movies) {
        moviesHTML+='<div class="movie">'+
      '<div class="title">'+ movie.title + '</div>'+
            '<div class="title">'+ movie.year + '</div>'+
            '<div class="director">'+ movie.director + '</div>'+

            '<div class="actors">'+ movie.actors + '</div>'+
            '<div class="rating">'+ movie.rating + '</div>'+
            // '<div class="title">'+ movie.  '</div>+
        '</div>'
    }
    $('#movies').html(moviesHTML)
}