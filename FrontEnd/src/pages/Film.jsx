import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components/Header/Header.jsx';
import { Footer } from '../components/Footer/Footer.jsx';

export default function Film() {
  const navigate = useNavigate();
  const [displayedFilms, setDisplayedFilms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [allGenres, setAllGenres] = useState(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get search params from URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  // Fetch and filter films
  useEffect(() => {
    fetchFilms();
  }, [selectedGenre, searchQuery]);

  const fetchFilms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Starting to fetch films...");
      
      const response = await axios.get("https://red-archive-kelompok-15.vercel.app/film/getAll", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Raw API response:", response);
      
      if (!response.data || !response.data.payload) {
        throw new Error("Invalid response format from server");
      }

      const films = response.data.payload;
      console.log("Received films:", films);

      // Transform film data to match frontend needs
      const transformedFilms = films.map(film => ({
        id: film.id,
        title: film.name, // backend uses 'name', frontend expects 'title'
        genres: film.genre.split(',').map(g => g.trim()), // Convert genre string to array
        image: film.cover_picture,
        description: film.description,
        rating: film.total_rating / Math.max(1, (film.reviews - 1)), // Calculate average rating
        duration: film.duration,
        release_date: film.release_date,
        directors: [film.director_name], // Convert to array as frontend expects array
        actors: film.actor_name.split(',').map(a => a.trim()) // Convert to array
      }));

      console.log("Transformed films:", transformedFilms);

      // Get unique genres from transformed data
      const genres = ['All', ...new Set(transformedFilms.flatMap(film => film.genres))];
      setAllGenres(genres);

      let filteredFilms = transformedFilms;

      if (searchQuery) {
        filteredFilms = transformedFilms.filter(film => 
          film.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSelectedGenre('All');
      } else if (selectedGenre !== 'All') {
        filteredFilms = transformedFilms.filter(film => film.genres.includes(selectedGenre));
      }

      console.log("Filtered films to display:", filteredFilms);
      setDisplayedFilms(filteredFilms);
      
    } catch (error) {
      console.error("Detailed error:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      
      setError(error.response?.data?.message || "Failed to load films. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#BE3C44]">
        <Header />
        <main className="flex-grow py-8 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 w-48 mb-6 rounded"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-[#7B191F]/40 rounded-lg p-4">
                    <div className="h-64 bg-gray-300/20 rounded mb-4"></div>
                    <div className="h-6 bg-gray-300/20 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300/20 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
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
            
            {/* Film Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
              {displayedFilms.map((film, index) => (
                <Link 
                  key={index}
                  to={`/film/${film.title.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="block bg-[#7B191F] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <div className="p-4">
                    <img
                      src={film.image}
                      alt={film.title}
                      className="w-full h-[350px] object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://res.cloudinary.com/drm5dmz1y/image/upload/v1747057110/default_missing_gehecc.jpg';
                      }}
                    />
                  </div>
                  <div className="px-4 pb-4 text-white text-center">
                    <h3 className="text-xl font-bold mb-1">{film.title}</h3>
                    <p className="text-sm text-gray-300">{film.genres.join(', ')}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            {displayedFilms.length === 0 && !isLoading && (
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
