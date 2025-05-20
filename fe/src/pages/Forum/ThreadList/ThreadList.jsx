// src/pages/Forum/ThreadList/ThreadList.jsx
import { ThreadItem } from './ThreadItem';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';

// Different thread data for each forum
const forumThreads = {
    'general-discussion': [
        {
            avatarUrl: "https://storage.googleapis.com/a1aa/image/58b6db8b-b878-4ed2-aad8-b9c330f9563e.jpg",
            avatarAlt: "Avatar of AnimeFan",
            title: "Favorite Anime of 2024",
            description: "Share your favorite anime series or movies released in 2024.",
            replies: 123,
            views: 1234,
            author: "AnimeFan",
            lastPost: "2024-06-01 14:23"
        },
        // Add more general discussion threads...
    ],
    'anime-recommendations': [
        {
            avatarUrl: "https://storage.googleapis.com/a1aa/image/151f9008-487f-4139-9337-994569b40072.jpg",
            avatarAlt: "Avatar of AnimeExpert",
            title: "Must-Watch Spring 2024 Anime",
            description: "Here are the top anime you should watch this season!",
            replies: 45,
            views: 567,
            author: "AnimeExpert",
            lastPost: "2024-05-15 09:30"
        },
        // Add more recommendation threads...
    ]
};

export const ThreadList = () => {
    const { forumId } = useParams(); 
    const forumName = forumId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    // Get threads specific to this forum
    const threadsToShow = forumThreads[forumId] || [];

    return (
        <div className="bg-[#bb3a44] min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto w-full px-6 pb-8">
                <section className="bg-[#c75a5f] rounded-3xl p-6 overflow-y-auto max-h-[calc(100vh-96px)] shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-white border-b border-red-300 pb-3">
                        {forumName} Threads
                    </h1>
                    <ul className="space-y-6">
                        {threadsToShow.map((thread, index) => (
                            <ThreadItem key={index} thread={thread} />
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
};