import { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Heading } from "@chakra-ui/layout";
import emptyHeart from "../../../../../assets/emptyHeart";
import filledHeart from "../../../../../assets/filledHeart";
import { useMutation } from "react-query";
import axios from "axios";
import "./style.css";

const updateMovieList =async (data) => {
  const response =  await axios({
    method: "put",
    url: "http://localhost:3000/movie",
    data,
  });
  return response.data;
};

const getMoviesByGenre = async (id) => {
  const movieResp =  await axios({
    method: "get",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=51dd329c7baed101bf31949a22cb32c1&with_genres=${id}`,
  });
  
  return movieResp;
};


const MovieItem = ({ item, userId, setFavMovieList }) => {
  const [isMovieFav, setIsMovieFav] = useState(false);
  const mutation = useMutation(updateMovieList, {onSuccess: (id) => {
    setIsMovieFav(prevStatus => !prevStatus)
    getMoviesByGenre(id).then(resp=>setFavMovieList(resp.data.results))
  }})

  const handleMovieFav = () => {
    mutation.mutate({
      movie: { id: item.id, genreId: item.genre_ids[0] },
      userId,
    });
  };

  return (
    <Box className="card" onClick={handleMovieFav}>
      <Box className="movieImage">
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
          alt={item.title}
        />
      </Box>
      <Box className="movieDescription">
        <Heading as="h6" size="xs">
          {item.title ? item.title : item.name}
        </Heading>
      </Box>
      <Box className="heartIcon">{isMovieFav ? filledHeart : emptyHeart}</Box>
    </Box>
  );
};

export default MovieItem;
