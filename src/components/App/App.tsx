import { useState } from 'react';
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

  
  const { data: moviesData, isLoading, isError } = useQuery<MoviesApiResponse, Error>({
    queryKey: ['movies', searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: !!searchQuery.trim(), 
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    setPage(1); 
    setSearchQuery(query);
  };

  const movies = moviesData?.results ?? [];
  const totalPages = moviesData?.total_pages ?? 0;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && (
        <>
          {movies.length > 0 ? (
            <>
              <MovieGrid movies={movies} onSelect={setSelectedMovie} />

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
          ) : searchQuery && (
            <div className={css.noResults}>
              No movies found for "{searchQuery}"
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
