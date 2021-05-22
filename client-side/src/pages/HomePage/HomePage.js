import axios from "axios";
import { useQuery } from "react-query";
import { Box, Heading } from "@chakra-ui/react";
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
  const { data, isLoading, isFetching } = useQuery(
    "trend-movies",
    getTrending,
    { staleTime: 10000 }
  );

  if (isLoading) <h1>Loading...</h1>;

  return (
    <>
      <TopNav />
      <Box mt={5}>
        <Heading fontSize="2xl" fontStyle="italic" width="80%" margin="0 auto">
          Trends
        </Heading>
        {!isFetching && <MovieList movieList={data} userId={userId} />}
      </Box>
      <Box mt={10}>
        <Heading fontSize="2xl" fontStyle="italic" width="80%" margin="0 auto">
          Recommandations based on your ❤️
        </Heading>
      </Box>
    </>
  );
};

export default HomePage;
