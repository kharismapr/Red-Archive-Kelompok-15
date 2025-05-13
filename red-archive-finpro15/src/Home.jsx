import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Homepic from './assets/Homepic.svg';
import FilmCard from './components/FilmCard.jsx';
import films from './filmsData.jsx';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#BE3C44]">
            <Navbar />

            <div className="relative overflow-hidden">
                <img src={Homepic} alt="Welcome to RedArchive" className="w-full h-[500px] object-cover" />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-8">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to RedArchive!</h1>
                    <p className="text-xl mb-6 font-semibold sm:text-md"> where every film you watch becomes a story worth saving. </p>
                    <p className="text-md">
                        Capture your thoughts, rate your favorites, and build a timeless collection of cinematic memories.
                        <br />
                        Whether it's a heartfelt review or a spontaneous rewatch, archive it all in style — your personal movie journey, preserved forever.
                    </p>
                </div>
            </div>

            {/* Films Section */}
            <div className="bg-[#BE3C44] py-8 px-4">
                <div className="container mx-auto"> {/* benerin deh nanti */}
                    {/* Judul Section */}
                    <h2 className="text-2xl font-bold text-white mb-6">Recommended for You</h2>
                    {/* Grid Film */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {films.map((film, index) => (
                            <FilmCard key={index} film={film} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Films Section */}
            <div className="bg-[#BE3C44] py-8 px-4">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-6">All Films You Might Like</h2>

                    {/* Grid Film */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {films.map((film, index) => (
                            <FilmCard key={index} film={film} />
                        ))}
                    </div>

                    {/* View More Button */}
                    <div className="mt-2 text-right">
                        <Link to="/films" className="text-white hover:text-gray-200 font-semibold">
                            View More →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}