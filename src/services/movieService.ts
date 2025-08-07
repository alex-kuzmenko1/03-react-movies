import axios from 'axios';
import { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_URL = `${BASE_URL}/search/movie`;

interface FetchMoviesParams {
  query: string;
}

export const fetchMovies = async ({ query }: FetchMoviesParams): Promise<Movie[]> => {
  const response = await axios.get(SEARCH_URL, {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data.results;
};
