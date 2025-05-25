// src/pages/Forum/ThreadList/ThreadList.jsx
import { ThreadItem } from './ThreadItem';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

// const forumThreads = 
// [
//     {
//         "name":"Testing Forum",
//         "alt":"Profile Picture",
//         "profile_picture":"https://res.cloudinary.com/drm5dmz1y/image/upload/v1747056313/default_sezkhw.jpg",
//         "thread_name":"Testing Thread",
//         "thread_info":"This is a testing thread",
//         "username":"test",
//         "created_at":"2025-05-25 12:49:44.488728"
//     },
//     {
//         "name": "Anime Recommendations",
//         "profile_picture": "https://storage.googleapis.com/a1aa/image/151f9008-487f-4139-9337-994569b40072.jpg",
//         "alt": "Avatar of AnimeExpert",
//         "thread_name": "Must-Watch Spring 2024 Anime",
//         "forum_info": "Here are the top anime you should watch this season!",
//         "replies": 45,
//         "views": 567,
//         "username": "AnimeExpert",
//         "created_at": "2024-05-15 09:30"
//     },
//     {
//         "name": "General Discussion",
//         "profile_picture": "https://storage.googleapis.com/a1aa/image/58b6db8b-b878-4ed2-aad8-b9c330f9563e.jpg",
//         "alt": "Avatar of AnimeFan",
//         "thread_name": "Favorite Anime of 2024",
//         "forum_info": "Share your favorite anime series or movies released in 2024.",
//         "replies": 123,
//         "views": 1234,
//         "username": "AnimeFan",
//         "created_at": "2024-06-01 14:23"
//     }
// ];

export const ThreadList = () => {
    const [thread, setThread] = useState([{}]);
    const [update, setUpdate] = useState(false);

    const { forumId } = useParams();
    const forumName = forumId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    useEffect(() => {
        handleThreadPage();
    },[update]); 

    const handleThreadPage = async () => {
        try {
            console.log("In effect");
            const response = await axios.get("https://red-archive-kelompok-15.vercel.app/thread/getAll");
            console.log("RESP: ", response.data.payload);
            setThread(response.data.payload);
            // setThread(response.data.payload.filter((forumThreads) => forumThreads.thread_name == forumName));
            if(update === false) {setUpdate(true)};
        } catch (error) {
            console.log(error);
        }
    }

    console.log("DATA: ", thread);
    return (
        <div className="bg-[#bb3a44] min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto w-full px-6 pb-8">
                <section className="bg-[#c75a5f] rounded-3xl p-6 overflow-y-auto max-h-[calc(100vh-96px)] shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-white border-b border-red-300 pb-3">
                        {forumName} Threads
                    </h1>
                    <ul className="space-y-6">
                        {thread.map((thread, index) => (
                            <ThreadItem key={index} thread={thread} />
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
};