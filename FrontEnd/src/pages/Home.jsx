import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from '../components/Header/Header.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import Homepic from '../assets/homepic.svg';
import FilmCard from '../components/FilmCard.jsx';
import FilmSlider from '../components/FilmSlider.jsx';
import films from './filmsData.jsx';
import { threads } from './threadData.jsx';
import ThreadCard from '../components/ThreadCard.jsx';

export default function Home() {
  const [topFilms, setTopFilms] = useState([]);
  const [allFilms, setAllFilms] = useState([]);

  useEffect(() => {
    handleHomePage();
  },[]);

  const handleHomePage = async () => {
    try {
      // Get all films
      const response = await axios.get("https://red-archive-kelompok-15.vercel.app/film/getAll");
      const films = response.data.payload || [];

      // Get reviews for each film and calculate average rating
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
      }));

      // Sort films by rating (descending)
      const sortedFilms = filmsWithReviews.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      
      // Get top 10 films for slider
      const topTenFilms = sortedFilms.slice(0, 10);
      
      setTopFilms(topTenFilms);
      setAllFilms(filmsWithReviews);
      
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#BE3C44]">
      <Header />
      
      <div className="relative overflow-hidden">
        <img src={Homepic} alt="Welcome to RedArchive" className="w-full h-[500px] object-cover" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to RedArchive!</h1>
          <p className="text-xl mb-6 font-semibold sm:text-md"> where every film you watch becomes a story worth saving. </p>
          <p className="text-md">
            Capture your thoughts, rate your favorites, and build a timeless collection of cinematic memories.
            <br />
            Whether it's a heartfelt review or a spontaneous rewatch, archive it all in style — your personal movie journey, preserved forever.
          </p>
        </div>
      </div>

      {/* Top Rated Films Section with Netflix-style slider */}
      <FilmSlider 
        title="Top Rated Films"
        films={topFilms}
      />
      
      {/* All Films Section with grid layout */}
      <div className="py-8 px-4 bg-[#BE3C44]">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-white">All Films You Might Like</h2>
            <Link to="/film" className="text-white hover:text-gray-200 font-semibold">
              View More
            </Link>
          </div>
          <div className="border-t border-white/30 mb-6 mx-4"></div>
          
          {/* Grid Film - showing first 4 films */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
            {allFilms.slice(0, 4).map((film, index) => {
              // Create slug from film title for URL
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
        </div>
      </div>
      
      {/* Recent Film Discussion Section */}
      <div className="py-8 px-4 bg-[#BE3C44]">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-white">Recent Film Discussion</h2>
            <Link to="/forum" className="text-white hover:text-gray-200 font-semibold">
              View More
            </Link>
          </div>
          
          {/* Horizontal line */}
          <div className="border-t border-white/30 mb-6 mx-4"></div>
          
          {/* Discussion Threads */}
          <div className="px-4">
            {threads.map((post) => (
              <ThreadCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
