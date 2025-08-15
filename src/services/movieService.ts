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

export async function fetchMovies(query: string): Promise<MoviesApiResponse> {
  const response = await axios.get<MoviesApiResponse>(API_URL, {
    params: { query },
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
}
