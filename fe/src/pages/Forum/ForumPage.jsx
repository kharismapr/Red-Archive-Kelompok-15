// src/pages/Forum/ForumPage.jsx
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ForumMain } from './ForumMain';
import { ForumSidebar } from './ForumSidebar';

export const ForumPage = () => (
    <div className="bg-[#bb3a44] min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex max-w-7xl mx-auto w-full px-6 pb-8 space-x-8">
        <ForumMain />
        <ForumSidebar />
        </main>
        <Footer />
    </div>
);