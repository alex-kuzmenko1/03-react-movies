import axios from 'axios';
import { Movie } from '../types/movie';

export interface MoviesApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

if (!API_TOKEN) {
  console.error('❌ Missing API token! Please set VITE_API_TOKEN in .env file.');
}

export async function fetchMovies(query: string): Promise<MoviesApiResponse> {
  if (!API_TOKEN) {
    throw new Error('API token is missing. Set VITE_API_TOKEN in your .env file.');
  }

  const response = await axios.get<MoviesApiResponse>(API_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
