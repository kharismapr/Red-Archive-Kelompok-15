// src/pages/Thread/ThreadPage.jsx
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ThreadHeader } from './components/ThreadHeader';
import { Post } from './components/Post';
import { Sidebar } from './components/ThreadSidebar';
import { PostForm } from './components/PostForm';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

// const posts = 
// [
//   {
//     "thread_name": "Must Watch Spring 2024 Anime",
//     "username": "AnimeExpert",
//     "profile_picture": "https://storage.googleapis.com/a1aa/image/151f9008-487f-4139-9337-994569b40072.jpg",
//     "post_date": "2024-05-15 09:30",
//     "reply_count": 45,
//     "post_id": "1",
//     "comment": "Here are my top picks for Spring 2024...",
//     "score": 25,
//     "downvotes": 2
//   },
//   {
//     "thread_name": "Favorite Anime Of 2024",
//     "username": "User123",
//     "profile_picture": "https://storage.googleapis.com/a1aa/image/ebb68a20-a4e4-4fab-7272-c635b61b5dbe.jpg",
//     "post_date": "2024-06-01 14:23",
//     "reply_count": 15,
//     "post_id": "1",
//     "comment": "I think the best anime of 2024 so far has been 'Crimson Horizon'. The animation quality is stunning...",
//     "score": 12,
//     "downvotes": 1
//   },
//   {
//     "thread_name": "Favorite Anime Of 2024",
//     "username": "Another Account",
//     "profile_picture": "https://storage.googleapis.com/a1aa/image/ebb68a20-a4e4-4fab-7272-c635b61b5dbe.jpg",
//     "post_date": "2024-06-01 14:23",
//     "reply_count": 1,
//     "post_id": "2",
//     "comment": "True",
//     "score": 1,
//     "downvotes": 1
//   },
//   {
//     "thread_id": "526b5640-c597-492f-8b5c-3706692f302f",
//     "thread_name": "Testing Thread",
//     "post_id": "2c36e05d-c7cc-4aca-ad2d-89cd9433002e",
//     "comment":"This is a post",
//     "score":"0",
//     "username":"test",
//     "profile_picture":"https://res.cloudinary.com/drm5dmz1y/image/upload/v1747056313/default_sezkhw.jpg",
//     "post_date":"	2025-05-25 12:49:44.488728"
//   }
// ]

export const ThreadPage = () => {
  const [thread, setThread] = useState([{}]);
  const [update, setUpdate] = useState(false);


  // threadId = state?.thread_name?.toLowerCase().replace(/\s+/g, '-') || '';
  // currentThread = posts[threadId] || threadData; // Fallback to default if not found
  const {threadId} = useParams();
  const threadName = threadId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  useEffect(() => {
    handleThreadPage();
  },[update]); 

  const handleThreadPage = async () => {
    try {
      console.log("In effect");
      const response = await axios.get("https://red-archive-kelompok-15.vercel.app/post/getAll");
      setThread(response.data.payload.filter((thread) => thread.thread_name == threadName));
      if(update === false) {setUpdate(true)};
    } catch (error) {
      console.log(error);
    }
  }

      return (
        <div className="bg-[#bb3a44] min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow max-w-7xl mx-auto w-full px-6 pb-8 flex flex-col space-y-8">
            <ThreadHeader thread={thread[0]} length={thread.length} />
            
            <div className="flex flex-col md:flex-row md:space-x-8">
              <section className="flex-1 bg-[#c75a5f] rounded-3xl p-6 overflow-y-auto max-h-[calc(100vh-160px)] shadow-lg">
                {thread.map(post => (
                  <Post key={post.post_id} post={post} />
                ))}
              </section>
              
              <Sidebar />
            </div>
            
            <PostForm />
          </main>
          <Footer />
        </div>
      );
};