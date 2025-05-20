import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { Header } from '../components/Header/Header.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import films from './filmsData.jsx';
import reviews from './reviewsData.jsx'; 

export default function FilmDetail() {
  const { filmSlug } = useParams();
  const [film, setFilm] = useState(null);
  const [filmReviews, setFilmReviews] = useState([]); // Renamed untuk kejelasan

  // Mencari film berdasarkan slug dan filter reviews
  useEffect(() => {
    handleFilmDetail();
  }, [filmSlug]);

  
  const handleFilmDetail = async () => {
    try {
      const response = await axios.get("https://red-archive-kelompok-15.vercel.app/film/getAll");
      console.log(response.data.payload);
      
      const foundFilm = response.data.payload.find(f => 
        f.name.toLowerCase().replace(/\s+/g, '-') === filmSlug
      );
      let {hours, minutes, seconds} = foundFilm.duration;
      if(hours == undefined) hours = 0;
      if(minutes == undefined) minutes = 0;
      if(seconds == undefined) seconds = 0;
      minutes += hours*60;
      foundFilm.duration = `${minutes} Minutes`; 
      console.log(foundFilm.duration);
      if (foundFilm) {
        setFilm(foundFilm);
        
        // Filter reviews untuk film ini saja
        // setFilmReviews(reviews.filter(review => review.film_id === foundFilm.id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Jika film tidak ditemukan
  if (!film) {
    return (
      <div className="min-h-screen flex flex-col bg-[#BE3C44]">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Film Not Found</h2>
            <Link to="/film" className="bg-white text-[#7B191F] px-4 py-2 rounded-md hover:bg-gray-100">
              Back to All Films
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // // Menghitung rata-rata skor dari reviews
  // const averageScore = filmReviews.length > 0 
  //   ? (filmReviews.reduce((sum, review) => sum + review.score, 0) / filmReviews.length).toFixed(1)
  //   : film.score; // Gunakan skor film jika tidak ada review

  return (
    <div className="min-h-screen flex flex-col bg-[#BE3C44]">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Film Title */}
          <h1 className="text-3xl font-bold text-white mb-6 px-4">{film.name}</h1>
          
          {/* Horizontal line */}
          <div className="border-t border-white/30 mb-6 mx-4"></div>
          
          {/* Film Details */}
          <div className="flex flex-col md:flex-row gap-8 px-4">
            {/* Film Poster */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="bg-[#7B191F] rounded-lg shadow-md overflow-hidden">
                <div className="p-3">
                  <img
                    src={film.cover_picture}
                    alt={film.name}
                    className="w-full object-cover rounded"
                  />
                </div>
                <div className="px-4 pb-4 text-white text-center">
                  <h3 className="text-xl font-bold mb-1">{film.name}</h3>
                  <p className="text-sm text-gray-300">{film.genre}</p>
                </div>
              </div>
              {/* <p className="text-white mt-2 text-sm">ID: {film.id}</p> */}
            </div>
            
            {/* Film Info */}
            <div className="md:w-2/3 lg:w-3/4">
              <div className="bg-[#7B191F] rounded-lg shadow-md p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="mb-6">{film.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Directors</h3>
                    <p>{film.director_name}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Actors</h3>
                    <p>{film.actor_name}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Release Date</h3>
                    <p>{film.release_date}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Film Length</h3>
                    <p>{film.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold mr-4">Score</h2>
                  <div className="text-4xl font-bold">{film.rating}/10</div>
                </div>
                
                <div className="flex gap-4">
                  <Link to={`/review/${filmSlug}`} className="bg-[#BE3C44] hover:bg-[#a83239] text-white font-bold py-2 px-6 rounded-md transition-colors">
                    Review
                  </Link>
                  <Link to={`/forum?film=${filmSlug}`} className="bg-[#BE3C44] hover:bg-[#a83239] text-white font-bold py-2 px-6 rounded-md transition-colors">
                    Forum
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mt-12 px-4">
            <h2 className="text-2xl font-bold text-white mb-6">What People Says?</h2>
            
            {/* Horizontal line */}
            <div className="border-t border-white/30 mb-6"></div>
            
            {/* Reviews List */}
            <div className="space-y-6">
              {filmReviews.length > 0 ? (
                filmReviews.map(review => (
                  <div key={review.id} className="border-b border-white/20 pb-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-bold">{review.username}</h3>
                      <span className="text-white font-bold">{review.score}</span>
                    </div>
                    <p className="text-white/80 mt-2">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-white text-center py-4">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
