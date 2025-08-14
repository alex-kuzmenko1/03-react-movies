import axios from 'axios';
import { MoviesApiResponse } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_API_TOKEN; 

if (!API_TOKEN) {
  console.error('❌ Missing API token! Please set VITE_TMDB_API_KEY in .env file.');
}

export async function fetchMovies(query: string, page: number): Promise<MoviesApiResponse> {
  const response = await axios.get<MoviesApiResponse>(API_URL, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return response.data;
}
