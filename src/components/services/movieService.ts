import axios from "axios";
import type { Movie } from "../../types/movie";

interface FetchMovies {
  results: Movie[];
}

export async function movieServices(query: string): Promise<Movie[]> {
  const response = await axios.get<FetchMovies>("https://api.themoviedb.org/3/search/movie", {
    params: { query: query },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return response.data.results;
}
