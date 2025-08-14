import { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <div className={css.grid}>
      {movies.map(movie => (
        <div
          key={movie.id}
          className={css.card}
          onClick={() => onSelect(movie)} 
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={css.poster}
            />
          ) : (
            <div className={css.noPoster}>No Image</div>
          )}
          <div className={css.title}>{movie.title}</div>
        </div>
      ))}
    </div>
  );
}
