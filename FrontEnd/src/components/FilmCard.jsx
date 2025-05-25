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
  
  return (
    <Link 
      to={`/film/${filmSlug}`} 
      className="block bg-[#7B191F] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 m-2"
    >
      {/* Gambar Film */}
      <div className="p-3">
        <img
          src={film.image}
          alt={film.title}
          className="w-full h-64 object-cover rounded"
        />
      </div>

      {/* Informasi Film */}
      <div className="px-4 pb-4 text-white text-center">
        <h3 className="text-xl font-bold mb-1">{film.title}</h3>
        <p className="text-sm text-gray-300">{film.genres.join(', ')}</p>
      </div>
    </Link>
  );
}
