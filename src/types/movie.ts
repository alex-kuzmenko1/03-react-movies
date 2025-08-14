export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string | null;
}

export interface MoviesApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


export const initialMoviesData: MoviesApiResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};