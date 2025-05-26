import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components/Header/Header.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import FilmCard from '../components/FilmCard.jsx';

// Helper function untuk membuat slug
const createSlug = (title) => {
  return encodeURIComponent(title.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, ''));
};

export default function Film() {
  const navigate = useNavigate();
  const [displayedFilms, setDisplayedFilms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [allGenres, setAllGenres] = useState(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    fetchFilms();
  }, [selectedGenre, searchQuery]);

  const fetchFilms = async () => {
    try {
      setIsLoading(true);
      setError(null);      console.log('Fetching films...');
      const response = await axios.get("https://red-archive-kelompok-15.vercel.app/film/getAll");
      console.log('Response:', response.data);

      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Failed to fetch films');
      }      // Ambil daftar film
      const films = response.data.payload || [];
      
      // Untuk setiap film, ambil review untuk menghitung rating yang benar
      const filmsWithReviews = await Promise.all(films.map(async (film) => {
        try {
          const reviewsResponse = await axios.get(`https://red-archive-kelompok-15.vercel.app/review/getByFilmId/${film.id}`);
          if (reviewsResponse.data.success) {
            const reviews = reviewsResponse.data.payload || [];
            if (reviews.length > 0) {
              const totalScore = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
              const averageScore = (totalScore / reviews.length).toFixed(1);
              return { ...film, rating: averageScore, reviews: reviews.length };
            }
          }
          return { ...film, rating: '0.0', reviews: 0 };
        } catch (error) {
          console.warn(`Error fetching reviews for film ${film.id}:`, error);
          return { ...film, rating: '0.0', reviews: 0 };
        }
      }));console.log('Films with reviews:', filmsWithReviews);

      // Get unique genres from all films
      const genres = ['All', ...new Set(filmsWithReviews.flatMap(film => film.genres))];
      setAllGenres(genres);

      let filteredFilms = filmsWithReviews;

      if (searchQuery) {
        filteredFilms = films.filter(film => 
          film.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSelectedGenre('All');
      } else if (selectedGenre !== 'All') {
        filteredFilms = films.filter(film => film.genres.includes(selectedGenre));
      }

      console.log('Filtered films:', filteredFilms);
      setDisplayedFilms(filteredFilms);

    } catch (error) {
      console.error("Error fetching films:", error);
      setError(error.response?.data?.message || "Failed to load films. Please try again later.");
      setDisplayedFilms([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#BE3C44]">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-xl mb-4">{error}</p>
            <button 
              onClick={fetchFilms}
              className="bg-white text-[#7B191F] px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#BE3C44]">
      <Header />
      
      <main className="flex-grow">
        <div className="py-8 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4">
              <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : "Films"}
              </h2>
              
              <div className="flex items-center">
                <span className="text-white mr-3">Sort by Genre:</span>
                <select 
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-white text-[#7B191F] px-3 py-2 rounded-md border-none focus:ring-2 focus:ring-[#7B191F] focus:outline-none"
                >
                  {allGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="border-t border-white/30 mb-6 mx-4"></div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-[#7B191F]/40 rounded-lg p-4">
                      <div className="h-64 bg-gray-300/20 rounded mb-4"></div>
                      <div className="h-6 bg-gray-300/20 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300/20 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedFilms.length > 0 ? (  

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                {displayedFilms.map((film, index) => (
                  <div key={index}>
                    <div className="p">
                    <FilmCard film={film} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-white text-lg">
                  {searchQuery 
                    ? `No films found matching "${searchQuery}"` 
                    : "No films found for the selected genre."}
                </p>
                <button 
                  onClick={() => {
                    setSelectedGenre('All');
                    if (searchQuery) {
                      navigate('/film');
                    }
                  }} 
                  className="mt-4 bg-white text-[#7B191F] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  View All Films
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
