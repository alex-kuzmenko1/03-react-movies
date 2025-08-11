import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css"; 
 


export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies({ query: searchQuery, page }),
    placeholderData: (prev) => prev, 
    enabled: searchQuery.trim().length > 0,
  });

  const handleSearch = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();
    if (!query) {
      toast.error("Please enter a search term.");
      return;
    }
    setPage(1);
    setSearchQuery(query);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <>
      <SearchBar action={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <Toaster position="top-right" />
    </>
  );
}
