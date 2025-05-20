import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header/Header.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import films from './filmsData.jsx';

export default function Film() {
    const navigate = useNavigate();
    // State untuk film yang ditampilkan dan filter
    const [displayedFilms, setDisplayedFilms] = useState(films);
    const [selectedGenre, setSelectedGenre] = useState('All');
    
    // Mendapatkan parameter pencarian dari URL
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    
    // Mendapatkan semua genre unik dari data film
    const allGenres = ['All', ...new Set(films.flatMap(film => film.genres))];
    
    // Filter film berdasarkan genre yang dipilih atau query pencarian
    useEffect(() => {
    }, [selectedGenre, searchQuery]);

    // Mencari film berdasarkan slug dan filter reviews
    useEffect(() => {
      handleFilmDetail();
    }, [filmSlug]);

    
    const handleFilmDetail = async () => {
      try {
        const response = await axios.get("https://red-archive-kelompok-15.vercel.app/film/getAll");
        console.log(response.data.payload);

        if (searchQuery) {
          // Filter film berdasarkan query pencarian
          const searchResults = films.filter(film => 
              film.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setDisplayedFilms(searchResults);
          // Reset genre filter saat pencarian
          setSelectedGenre('All');
        } else if (selectedGenre === 'All') {
          setDisplayedFilms(films);
        } else {
          const filtered = films.filter(film => film.genres.includes(selectedGenre)
        );
          setDisplayedFilms(filtered);
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
    <div className="min-h-screen flex flex-col bg-[#BE3C44]">
      <Header />
      
      <main className="flex-grow">
        {/* Film List Section */}
        <div className="py-8 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4">
              {/* Judul dengan indikator pencarian jika ada */}
              <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : "Films"}
              </h2>
              
              {/* Genre Filter */}
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
            {/* Films Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
              {displayedFilms.map((film, index) => {
                // Membuat slug dari judul film untuk URL
                const filmSlug = film.title.toLowerCase().replace(/\s+/g, '-');
                
                return (
                  <Link 
                    key={index}
                    to={`/film/${filmSlug}`} 
                    className="block bg-[#7B191F] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                  >
                    <div className="p-3">
                      <img
                        src={film.image}
                        alt={film.title}
                        className="w-full object-cover rounded"
                      />
                    </div>
                    <div className="px-4 pb-4 text-white text-center">
                      <h3 className="text-xl font-bold mb-1">{film.title}</h3>
                      <p className="text-sm text-gray-300">{film.genres.join(', ')}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* No Results Message */}
            {displayedFilms.length === 0 && (
              <div className="text-center py-10">
                <p className="text-white text-lg">
                  {searchQuery 
                    ? `No films found matching "${searchQuery}"` 
                    : "No films found for the selected genre."}
                </p>
                <button 
                  onClick={() => {
                    setSelectedGenre('All');
                    navigate('/film');
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
