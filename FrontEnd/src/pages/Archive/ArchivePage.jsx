import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import ArchiveSidebar from './ArchiveSidebar';
import ArchiveFilmCard from './ArchiveFilmCard';

export default function ArchivePage() {
  // for now archive data
    const archiveItems = [
        {
        id: 1,
        title: "Attack on Titan",
        rating: "9.0",
        description: "A story of humanity's fight against giant humanoid Titans.",
        image: "https://cdn.myanimelist.net/images/anime/1517/100633.jpg"
        },
        {
        id: 2,
        title: "My Hero Academia",
        rating: "8.5",
        description: "A world where almost everyone has superpowers called Quirks.",
        image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg"
        },
        // Add all items here...
    ];

    return (
        <div className="bg-[#b73c44] text-white min-h-screen flex flex-col">
        <Header />
        
        <main className="flex flex-col md:flex-row px-6 py-8 flex-grow max-w-7xl mx-auto w-full gap-8">
            <ArchiveSidebar />
            
            <section className="flex-1">
            <h3 className="font-semibold text-lg mb-4 sansation-font">Archive</h3>
            <hr className="border-[#9a2f36] mb-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {archiveItems.map(item => (
                <ArchiveFilmCard key={item.id} {...item} />
                ))}
            </div>
            </section>
        </main>
        
        <Footer />
        </div>
    );
}