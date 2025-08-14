import axios from 'axios';
import { Movie, MoviesApiResponse } from '../types/movie';

export async function fetchMovies(query: string, page = 1): Promise<MoviesApiResponse> {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  if (!apiKey) throw new Error('API key is missing');

  const response = await axios.get<MoviesApiResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query,
        page,
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data;
}