import { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Heading } from "@chakra-ui/layout";
import emptyHeart from "../../../../../assets/emptyHeart";
import filledHeart from "../../../../../assets/filledHeart";
import { useMutation } from "react-query";
import axios from "axios";
import "./style.css";

const updateMovieList = (data) => {
  axios({
    method: "put",
    url: "http://localhost:3000/movie",
    data,
  }).then((resp) => {
    if (resp.status === 200) {
    } else {
    }
  });
};

const MovieItem = ({ item, userId }) => {
  const [isMovieFav, setIsMovieFav] = useState(false);
  const mutation = useMutation(updateMovieList, {
    onSuccess: (data) => {
      setIsMovieFav((prevState) => !prevState);
    },
  });

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
