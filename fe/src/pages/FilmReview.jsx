import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header/Header.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import films from './filmsData.jsx';
import reviews from './reviewsData.jsx';

export default function FilmReview() {
  const { filmSlug } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [reviewData, setReviewData] = useState({
    score: 0,
    comment: ''
  });
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  
  // Mencari film berdasarkan slug
  useEffect(() => {
    const foundFilm = films.find(f => 
      f.title.toLowerCase().replace(/\s+/g, '-') === filmSlug
    );
    
    if (foundFilm) {
      setFilm(foundFilm);
      
      // Cek apakah user sudah pernah review film ini (dalam implementasi nyata)
      // const userReview = reviews.find(r => r.film_id === foundFilm.id && r.user_id === 'current_user_id');
      // if (userReview) {
      //   setReviewData({
      //     score: userReview.score,
      //     comment: userReview.comment
      //   });
      // }
    }
  }, [filmSlug]);

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value
    });
  };

  // Handler untuk perubahan score
  const handleScoreChange = (newScore) => {
    setReviewData({
      ...reviewData,
      score: newScore
    });
  };

  // Handler untuk toggle synopsis
  const toggleSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
  };

  // Handler untuk submit review
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dalam implementasi nyata, kirim data ke backend
    console.log('Submitting review:', {
      film_id: film.id,
      user_id: 'current_user_id', // Dalam implementasi nyata, ambil dari state auth
      score: reviewData.score,
      comment: reviewData.comment
    });
    
    // Redirect ke halaman detail film
    navigate(`/film/${filmSlug}`);
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-[#BE3C44]">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="mx-auto max-w-3xl">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-white mb-2 px-4">Review Film</h1>
          <h2 className="text-xl text-white mb-6 px-4">{film.title}</h2>
          
          {/* Horizontal line */}
          <div className="border-t border-white/30 mb-6 mx-4"></div>
          
          {/* Film Info Card */}
          <div className="bg-[#7B191F] rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Film Poster */}
              <div className="sm:w-1/4">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full rounded"
                />
              </div>
              
              {/* Film Details */}
              <div className="sm:w-3/4 text-white">
                <h3 className="text-xl font-bold mb-2">{film.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{film.genres.join(', ')}</p>
                <p className="text-sm mb-4">Directed by {film.directors.join(', ')}</p>
                
                {/* Synopsis with View All toggle */}
                <div>
                  <p className="text-sm">
                    {showFullSynopsis 
                      ? film.synopsis 
                      : `${film.synopsis.substring(0, 150)}...`}
                  </p>
                  <button 
                    onClick={toggleSynopsis}
                    className="text-xs text-yellow-300 hover:text-yellow-100 mt-2 underline"
                  >
                    {showFullSynopsis ? 'Show Less' : 'View All'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Review Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-[#7B191F] mb-6">Write Your Review</h3>
            
            <form onSubmit={handleSubmit}>
              {/* Score Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-3">
                  Your Score: {reviewData.score}
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => handleScoreChange(score)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                        reviewData.score === score 
                          ? 'bg-[#7B191F] text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Comment */}
              <div className="mb-6">
                <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={reviewData.comment}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B191F]"
                  placeholder="Share your thoughts about this film..."
                  required
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Link 
                  to={`/film/${filmSlug}`}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#7B191F] text-white rounded-md hover:bg-[#a83239] transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
