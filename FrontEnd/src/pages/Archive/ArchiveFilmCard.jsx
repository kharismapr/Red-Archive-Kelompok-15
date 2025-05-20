export default function ArchiveFilmCard({ title, rating, description, image }) {
    return (
        <div className="bg-[#9a2f36] rounded-lg p-4 flex flex-col items-center max-w-xs mx-auto hover:shadow-xl transition-shadow">
        <img 
            alt={`Anime poster of ${title}`} 
            className="rounded-lg w-full mb-4 h-48 object-cover" 
            src={image} 
        />
        <h4 className="text-white font-semibold text-lg mb-1 text-center">{title}</h4>
        <div className="flex items-center mb-2">
            <span className="text-yellow-300 font-semibold mr-1">★</span>
            <span className="text-yellow-300 font-semibold">{rating}</span>
        </div>
        <p className="text-white text-sm text-center line-clamp-2">{description}</p>
        </div>
    );
}