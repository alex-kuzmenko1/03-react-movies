import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Movie, MoviesApiResponse } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import { SearchBar } from '../SearchBar/SearchBar';
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
    data: moviesData = {} as MoviesApiResponse, 
    isLoading, 
    isError,
    isFetching,
    isPlaceholderData
  } = useQuery<MoviesApiResponse>({
    queryKey: ['movies', searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: !!searchQuery.trim(),
    placeholderData: (previousData) => previousData,
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

  const movies = moviesData.results || [];
  const totalPages = moviesData.total_pages || 0;

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />

      {(isLoading || isFetching) && !isPlaceholderData && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={Math.min(totalPages, 500)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
              breakLabel="..."
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}