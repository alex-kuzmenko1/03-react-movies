import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_TOKEN = 'Bearer 4e70b70ecdcc36f6a34bf9995c2b1288';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_TOKEN,
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async query => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async movieId => {
  const response = await axiosInstance.get(`/movie/${movieId}`, {
    params: {
      language: 'en-US',
    },
  });
  return response.data;
};

export const getMovieCast = async movieId => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async movieId => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
    params: {
      language: 'en-US',
    },
  });
  return response.data.results;
};
