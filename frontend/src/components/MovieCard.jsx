import "../Pages/Styles/MovieCard.css";

function MovieCard({movie_info}) {
    return (
        <div className="display"> 
            <div className="title">
                {movie_info['title']}
            </div>

            <div className="release">
                {movie_info['release_date']}
            </div>

            <div className="image">
                <img src={"https://image.tmdb.org/t/p/original/" + movie_info['poster_path']} className="img-box" alt="Image logo"/>
            </div>
            
            
            {movie_info['overview']}
        </div>
    )
}
export default MovieCard;