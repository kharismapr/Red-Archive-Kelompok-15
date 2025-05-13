// src/pages/Profile/FilmGrid/FilmGrid.jsx
import { FilmCard } from './FilmCard';

export const FilmGrid = () => {
    const films = [
        { 
        imageUrl: "https://m.media-amazon.com/images/S/pv-target-images/7852c99fb839dbf95ef87716222dd4c5b99f90b9903fc1a412bb8332fdb409fd.jpg",
        name: "Name",
        rating: "Rating"
        },
        { 
        imageUrl: "https://m.media-amazon.com/images/S/pv-target-images/6d3d1461d50778271845ce7ec81ba2c5d76a20f7f84e5061cd099aabaedc77f9.jpg",
        name: "Name",
        rating: "Rating"
        },
        { 
        imageUrl: "https://m.media-amazon.com/images/S/pv-target-images/7852c99fb839dbf95ef87716222dd4c5b99f90b9903fc1a412bb8332fdb409fd.jpg",
        name: "Name",
        rating: "Rating"
        },
        { 
        imageUrl: "https://m.media-amazon.com/images/S/pv-target-images/6d3d1461d50778271845ce7ec81ba2c5d76a20f7f84e5061cd099aabaedc77f9.jpg",
        name: "Name",
        rating: "Rating"
        },
        // testing masih duplikat
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {films.map((film, index) => (
            <FilmCard 
            key={index}
            imageUrl={film.imageUrl}
            name={film.name}
            rating={film.rating}
            />
        ))}
        </div>
    );
};