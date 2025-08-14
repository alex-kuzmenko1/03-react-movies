import axios from "axios";
import type { Movie, MoviesApiResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const fetchMovies = async (query: string, page = 1): Promise<MoviesApiResponse> => {

  if (!API_TOKEN) {
    throw new Error("TMDB API token is not configured");
  }

 
  const config = {
    params: { 
      query,
      page,
      include_adult: false, 
      language: "en-US",   
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
  };

  try {
    
    const response = await axios.get<MoviesApiResponse>(API_URL, config);
    
   
    console.log("API Response:", response.data);
    
    return response.data;
  } catch (error) {
   
    console.error("Error fetching movies:", error);
    throw error;
  }
};