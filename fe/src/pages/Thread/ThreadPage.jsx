// src/pages/Thread/ThreadPage.jsx
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ThreadHeader } from './components/ThreadHeader';
import { Post } from './components/Post';
import { Sidebar } from './components/ThreadSidebar';
import { PostForm } from './components/PostForm';
import { useLocation } from 'react-router-dom';

// Thread data mapping - can be moved to a separate file
const threadSpecificData = {
  'favorite-anime-of-2024': {
    title: "General Discussion - Favorite Anime of 2024",
    author: "User123",
    authorAvatarUrl: "https://storage.googleapis.com/a1aa/image/ebb68a20-a4e4-4fab-7272-c635b61b5dbe.jpg",
    postDate: "2024-06-01 14:23",
    replyCount: 15,
    posts: [
      {
        id: 1,
        avatarUrl: "https://storage.googleapis.com/a1aa/image/ebb68a20-a4e4-4fab-7272-c635b61b5dbe.jpg",
        author: "User123",
        content: "I think the best anime of 2024 so far has been 'Crimson Horizon'. The animation quality is stunning...",
        date: "2024-06-01 14:23",
        upvotes: 12,
        downvotes: 1
      }
    ]
  },
  'must-watch-spring-2024-anime': {
    title: "Must-Watch Spring 2024 Anime",
    author: "AnimeExpert",
    authorAvatarUrl: "https://storage.googleapis.com/a1aa/image/151f9008-487f-4139-9337-994569b40072.jpg",
    postDate: "2024-05-15 09:30",
    replyCount: 45,
    posts: [
      {
        id: 1,
        avatarUrl: "https://storage.googleapis.com/a1aa/image/151f9008-487f-4139-9337-994569b40072.jpg",
        author: "AnimeExpert",
        content: "Here are my top picks for Spring 2024...",
        date: "2024-05-15 09:30",
        upvotes: 25,
        downvotes: 2
      }
    ]
  }
};

export const ThreadPage = () => {
  const location = useLocation();
  const state = location.state;
  
  // Get the thread ID from the URL or state
  const threadId = state?.title?.toLowerCase().replace(/\s+/g, '-') || '';
  const currentThread = threadSpecificData[threadId] || threadData; // Fallback to default if not found

  return (
    <div className="bg-[#bb3a44] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 pb-8 flex flex-col space-y-8">
        <ThreadHeader thread={currentThread} />
        
        <div className="flex flex-col md:flex-row md:space-x-8">
          <section className="flex-1 bg-[#c75a5f] rounded-3xl p-6 overflow-y-auto max-h-[calc(100vh-160px)] shadow-lg">
            {currentThread.posts.map(post => (
              <Post key={post.id} post={post} />
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