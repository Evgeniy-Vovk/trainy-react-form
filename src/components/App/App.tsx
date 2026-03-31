import { useState } from "react";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import { movieServices } from "../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
function App() {
  const [posts, setPosts] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchForm = async (query: string) => {
    setLoading(true);
    try {
      const data = await movieServices(query);
      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={fetchForm} />
      {loading && <Loader />}
      {posts.length > 0 && <MovieGrid movies={posts} />}
    </>
  );
}

export default App;
