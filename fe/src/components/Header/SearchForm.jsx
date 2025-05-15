// src/components/Header/SearchForm.jsx
export const SearchForm = () => (
    <form className="flex items-center flex-1 max-w-md mx-6">
        <label className="sr-only" htmlFor="search">
        Search on RedArchive
        </label>
        <input 
        className="w-full rounded-md px-3 py-2 text-[#b73c44] placeholder-[#b73c44] focus:outline-none" 
        id="search" 
        placeholder="Search on RedArchive" 
        style={{ backgroundColor: '#f3f3f3' }} 
        type="search"
        />
        <button className="hidden" type="submit">
        Search
        </button>
    </form>
);