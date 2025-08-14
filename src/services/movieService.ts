import axios from 'axios';
import { Movie } from '../types/movie';

export interface MoviesApiResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export const fetchMovies = async (query: string, page = 1): Promise<MoviesApiResponse> => {
  const response = await axios.get<MoviesApiResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        query,
        page,
      },
    }
  );
  return response.data;
};
