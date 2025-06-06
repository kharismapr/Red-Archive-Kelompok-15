import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { Header } from '../components/Header/Header.jsx';
import { Footer } from '../components/Footer/Footer.jsx';

export default function FilmDetail() {
  const { filmSlug } = useParams();
  const [film, setFilm] = useState(null);
  const [filmReviews, setFilmReviews] = useState([]);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [averageScore, setAverageScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFilmAndReviews();
  }, [filmSlug]);

  const fetchFilmAndReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Decode the slug before sending to API
      const decodedSlug = decodeURIComponent(filmSlug);
      console.log('Fetching film with slug:', decodedSlug);

      const filmResponse = await axios.get(`https://red-archive-kelompok-15.vercel.app/film/getBySlug/${encodeURIComponent(decodedSlug)}`);
      console.log('Film response:', filmResponse.data);
      
      if (!filmResponse.data.success) {
        throw new Error(filmResponse.data.message || 'Failed to fetch film details');
      }

      const filmData = filmResponse.data.payload;
      if (filmData) {
        // Format duration if needed
        if (typeof filmData.duration === 'object' && filmData.duration.hours !== undefined) {
          let {hours, minutes, seconds} = filmData.duration;
          hours = parseInt(hours) || 0;
          minutes = parseInt(minutes) || 0;
          seconds = parseInt(seconds) || 0;
          const totalMinutes = (hours * 60) + minutes;
          filmData.duration = `${totalMinutes} Minutes`;
        } else if (typeof filmData.duration === 'string') {
          // If duration is already formatted, use it as is
          filmData.duration = filmData.duration;
        } else {
          // Default duration if not available
          filmData.duration = 'Duration not available';
        }
        
        setFilm(filmData);

        try {
          // Get film reviews
          const reviewsResponse = await axios.get(`https://red-archive-kelompok-15.vercel.app/review/getByFilmId/${filmData.id}`);
          if (reviewsResponse.data.success) {
            const reviews = reviewsResponse.data.payload || [];
            setFilmReviews(reviews);

            // Calculate average score
            if (reviews.length > 0) {
              const totalScore = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
              setAverageScore((totalScore / reviews.length).toFixed(1));
            }
          }
        } catch (reviewError) {
          console.warn('Error fetching reviews:', reviewError);
          setFilmReviews([]);
          setAverageScore(0);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.response?.data?.message || "Failed to load film details. Please try again later.");
      setFilm(null);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#BE3C44]">
        <Header />
        <main className="flex-grow py-8 px-4">
          <div className="mx-auto max-w-4xl animate-pulse">
            <div className="bg-[#7B191F]/40 rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="w-full h-[400px] bg-gray-300/20 rounded"></div>
                </div>
                <div className="md:w-2/3 space-y-4">
                  <div className="h-8 bg-gray-300/20 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300/20 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300/20 rounded w-1/4"></div>
                  <div className="h-20 bg-gray-300/20 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !film) {
    return (
      <div className="min-h-screen flex flex-col bg-[#BE3C44]">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              {error || "Film Not Found"}
            </h2>
            <Link 
              to="/film" 
              className="bg-white text-[#7B191F] px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Back to All Films
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#BE3C44]">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Film Info Section */}
          <div className="bg-[#7B191F] rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Film Poster */}
              <div className="md:w-1/3">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full rounded"
                />
              </div>
              
              {/* Film Details */}
              <div className="md:w-2/3 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{film.title}</h1>
                    <p className="text-gray-300">{film.genres.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-yellow-400">{averageScore}</div>
                    <div className="text-sm text-gray-300">{filmReviews.length} reviews</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm mb-2">Duration: {film.duration}</p>
                  <p className="text-sm mb-2">Release Date: {new Date(film.release_date).toLocaleDateString()}</p>
                  <p className="text-sm mb-2">Cast: {film.actors.join(', ')}</p>
                  <p className="text-sm">Directed by {film.directors.join(', ')}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Synopsis</h3>
                  <p className="text-sm">
                    {showFullSynopsis ? film.synopsis : `${film.synopsis.substring(0, 200)}...`}
                  </p>
                  <button 
                    onClick={toggleSynopsis}
                    className="text-yellow-400 text-sm hover:text-yellow-300 mt-2"
                  >
                    {showFullSynopsis ? 'Show Less' : 'Read More'}
                  </button>
                </div>
                
                <Link
                  to={`/review/${filmSlug}`}
                  className="inline-block bg-yellow-400 text-[#7B191F] px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Write a Review
                </Link>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#7B191F] mb-6">Reviews</h2>
            
            {filmReviews.length > 0 ? (
              <div className="space-y-6">
                {filmReviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-bold">
                            {review.user_name ? review.user_name[0].toUpperCase() : 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{review.user_name || 'Anonymous'}</p>
                          <p className="text-gray-500 text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="bg-[#7B191F] text-white px-3 py-1 rounded-full">
                        {review.rating}/10
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No reviews yet</p>
                <Link
                  to={`/film/${filmSlug}/review`}
                  className="text-[#7B191F] hover:text-[#a83239] font-semibold"
                >
                  Be the first to review
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
