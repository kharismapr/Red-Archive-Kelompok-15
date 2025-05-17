import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import films from '../../pages/filmsData.jsx';

export const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    // Cari film yang judulnya mengandung searchTerm (case insensitive)
    const foundFilm = films.find(film => 
      film.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (foundFilm) {
      // Jika film ditemukan, buat slug dan navigasi ke halaman detail film
      const filmSlug = foundFilm.title.toLowerCase().replace(/\s+/g, '-');
      navigate(`/film/${filmSlug}`);
      setSearchTerm(''); // Reset search term setelah navigasi
    } else {
      // Jika film tidak ditemukan, navigasi ke halaman film dengan query search
      navigate(`/film?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(''); // Reset search term setelah navigasi
    }
  };

  return (
    <form className="flex items-center flex-1 max-w-md mx-6" onSubmit={handleSearch}>
      <label className="sr-only" htmlFor="search">
        Search on RedArchive
      </label>
      <input 
        className="w-full rounded-md px-3 py-2 text-[#b73c44] placeholder-[#b73c44] focus:outline-none" 
        id="search" 
        placeholder="Search on RedArchive" 
        style={{ backgroundColor: '#f3f3f3' }} 
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="hidden" type="submit">
        Search
      </button>
    </form>
  );
};
