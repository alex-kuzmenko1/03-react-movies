import axios from 'axios';

const API_KEY = '4e70b70ecdcc36f6a34bf9995c2b1288';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTcwYjcwZWNkY2MzNmY2YTM0YmY5OTk1YzJiMTI4OCIsIm5iZiI6MTc0ODczMTQ5Ny45OTksInN1YiI6IjY4M2I4NjY5YjI5MGQ1ZDJjMDI4ODZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.76CIlWte2ofDyjuy7bPcEKzwp-A7OWwQfMFil2IJs24`,
    'Content-Type': 'application/json',
  },
});


export const fetchTrendingMovies = async () => {
  const response = await api.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get(`/search/movie?query=${query}`);
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const fetchMovieCredits = async (id) => {
  const response = await api.get(`/movie/${id}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (id) => {
  const response = await api.get(`/movie/${id}/reviews`);
  return response.data.results;
};
