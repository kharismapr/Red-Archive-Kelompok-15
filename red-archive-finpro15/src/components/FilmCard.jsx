// FilmCard.jsx
import { Link } from 'react-router-dom';

const FilmCard = ({ film }) => {
  return (
    <Link to={film.link} className=" bg-[#7B191F] rounded-lg shadow-md p-5 transition-transform duration-300 hover:scale-105 m-1">
      {/* Gambar Film */}
      <img
        src={film.image}
        alt={film.title}
        className="w-full h-64 object-cover "
      />

      {/* Judul dan Genre */}
      <div className="mt-2 text-white flex flex-col items-center text-center">
        <h3 className="text-xl font-bold">{film.title}</h3>
        <p className="text-sm">{film.genres.join(', ')}</p>
      </div>
    </Link>
  );
};

export default FilmCard;