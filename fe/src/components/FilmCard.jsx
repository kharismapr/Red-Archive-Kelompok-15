import { Link } from 'react-router-dom';

export default function FilmCard({ film }) {
  // Membuat slug dari judul film untuk URL
  const filmSlug = film.title.toLowerCase().replace(/\s+/g, '-');
  
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
