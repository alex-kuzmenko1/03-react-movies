import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { Movie } from '../../types/movie';
import { fetchMovies, MoviesApiResponse } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: moviesData,
    isLoading,
    isError,
    error,
  } = useQuery<MoviesApiResponse, Error>({
    queryKey: ['movies', searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: !!searchQuery.trim(),
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  
  useEffect(() => {
    if (isError && error) {
      toast.error('Failed to fetch movies');
    }
  }, [isError, error]);

  const movies = moviesData?.results ?? [];
  const totalPages = Math.ceil(movies.length / 10);
  const paginatedMovies = movies.slice((page - 1) * 10, page * 10);

  
  const handleSearch = (query: string) => {
    setPage(1);
    setSelectedMovie(null);
    setSearchQuery(query);
  };


  useEffect(() => {
    if (!isLoading && !isError && searchQuery && movies.length === 0) {
      toast('No movies found for "' + searchQuery + '"');
    }
  }, [isLoading, isError, searchQuery, movies]);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          <MovieGrid movies={paginatedMovies} onSelect={setSelectedMovie} />
          {totalPages > 1 && (
            <div className={css.paginationContainer}>
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={css.paginationButton}
              >
                Previous
              </button>
              <span className={css.pageInfo}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page >= totalPages}
                className={css.paginationButton}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
