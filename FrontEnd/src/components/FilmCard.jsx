import { Link } from 'react-router-dom';

// Helper function untuk membuat slug
const createSlug = (title) => {
  return encodeURIComponent(title.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, ''));
};

export default function FilmCard({ film }) {
  const filmSlug = createSlug(film.title);
  
  return (    <Link 
      to={`/film/${filmSlug}`} 
      className="block bg-[#7B191F] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
    >{/* Gambar Film */}
      <div className="p-3">
        <img
          src={film.image}
          alt={film.title}
          className="w-full h-[350px] object-cover rounded"
          onError={(e) => {
            e.target.src = 'https://res.cloudinary.com/drm5dmz1y/image/upload/v1747057110/default_missing_gehecc.jpg';
          }}
        />
      </div>      
      {/* Informasi Film */}
      <div className="px-4 pb-4 text-white text-center">
        <h3 className="text-xl font-bold mb-1">{film.title}</h3>
        <p className="text-sm text-gray-300 mb-2">{film.genres.join(', ')}</p>
        <div className="flex items-center justify-center">
          <span className="text-yellow-400 mr-1">★</span>
          <span className="text-yellow-400">{film.rating || '0.0'}</span>
          {film.reviews > 0 && (
            <span className="text-gray-300 text-sm ml-2">({film.reviews} reviews)</span>
          )}
        </div>
      </div>
    </Link>
  );
}
