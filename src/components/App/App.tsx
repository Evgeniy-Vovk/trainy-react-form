import { useState } from "react";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import { movieServices } from "../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [posts, setPosts] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchMovies = async (query: string) => {
    setPosts([]);
    setLoading(true);
    setError(false);
    try {
      const data = await movieServices(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
      setPosts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const modalOpen = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const modalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={fetchMovies} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {posts.length > 0 && <MovieGrid movies={posts} onSelect={modalOpen} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={modalClose} />}
    </>
  );
}

export default App;
