import { Box } from "@chakra-ui/layout";
import MovieItem from "./components/MovieItem";
import "./style.css";

const MovieList = ({ movieList = [], userId, setFavMovieList }) => {
  return (
    <Box mt={3} className="movieListWrapper">
      {movieList.length &&
        movieList.map((item) => {
          return <MovieItem item={item} key={item.id} userId={userId} setFavMovieList={setFavMovieList} />;
        })}
    </Box>
  );
};

export default MovieList;
