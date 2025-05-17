// src/pages/Profile/ProfilePage.jsx
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ProfileSidebar } from './ProfileSidebar/ProfileSidebar';
import { FilmGrid } from './FilmGrid/FilmGrid';

export const ProfilePage = () => {
    return (
        <div className="bg-[#b73c44] text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-col md:flex-row px-6 py-8 flex-grow max-w-7xl mx-auto w-full gap-8">
            <ProfileSidebar />
            <section className="flex-1">
            <h3 className="font-semibold text-lg mb-4 select-text">biography</h3>
            <h4 className="font-semibold text-white text-base mb-4 select-text">Fav Films</h4>
            <FilmGrid />
            </section>
        </main>
        <Footer />
        </div>
    );
};

export default ProfilePage;