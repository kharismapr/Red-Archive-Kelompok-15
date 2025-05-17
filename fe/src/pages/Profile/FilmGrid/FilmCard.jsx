// src/pages/Profile/FilmGrid/FilmCard.jsx
export const FilmCard = ({ imageUrl, name, rating }) => (
    <div className="bg-[#7B191F] rounded-lg p-5 relative max-w-xs mx-auto">
        <div className="absolute -top-3 -left-3 text-yellow-300 text-3xl select-none" title="Favorite star">
        <i className="fas fa-star"></i>
        </div>
        <img 
        alt={`Movie poster of ${name}`} 
        className="rounded-lg w-full" 
        src={imageUrl}
        />
        <div className="text-center mt-2 text-white font-semibold text-sm select-text">
        <p>{name}</p>
        <p>{rating}</p>
        </div>
    </div>
);