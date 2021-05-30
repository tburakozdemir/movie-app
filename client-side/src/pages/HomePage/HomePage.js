import axios from "axios";
import { useQuery } from "react-query";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import MovieList from "./components/MovieList/MovieList";
import TopNav from "../../components/layout/TopNav";
import "./style.css";
import { useState } from "react";

const getTrending = async () => {
  const response = await axios
    .get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=51dd329c7baed101bf31949a22cb32c1"
    )
    .then((res) => {
      return res.data;
    });

  return response.results;
};

const HomePage = () => {
  const [userId] = useState(localStorage.getItem("userId"));
  const [favMovieList,setFavMovieList] = useState([]);
  const { data, isLoading, isFetching } = useQuery(
    "trend-movies",
    getTrending,
    { staleTime: 10000 }
  );


  if (isLoading) <h1>Loading...</h1>;
    console.log(favMovieList)
  return (
    <>
      <TopNav />
      <Box mt={5}>
        <Heading fontSize="2xl" fontStyle="italic" width="80%" margin="0 auto">
          Trends
        </Heading>
        {!isFetching && <MovieList movieList={data} userId={userId} setFavMovieList={setFavMovieList} />}
      </Box>
      <Box mt={10}>
        <Heading fontSize="2xl" fontStyle="italic" width="80%" margin="0 auto">
          Recommandations based on your ❤️
        </Heading>
        <Flex width="80%" margin="0 auto" >
        {favMovieList.length && favMovieList.map(item=>{
          return(
            <Box key={item.id} className="card">
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
          </Box>
          )
        })
      }
      </Flex>
      </Box>
    </>
  );
};

export default HomePage;
