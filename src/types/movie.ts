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