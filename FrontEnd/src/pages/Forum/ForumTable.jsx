// src/pages/Forum/ForumTable.jsx
import { ForumTableRow } from './ForumTableRow';

const forumData = [
    {
    icon: "https://storage.googleapis.com/a1aa/image/d15cf52f-0e65-4496-3d03-7881c8eedcbd.jpg",
    title: "General Discussion",
    description: "Talk about anything related to anime and manga.",
    threads: "1,234",
    posts: "12,345",
    lastPost: { user: "User123", date: "2024-06-01 14:23" }
    },
    {
    icon: "https://play-lh.googleusercontent.com/DkKKV6BfcJ_Pxf8qtR9uCpSubiB9lKbsudqhFUPNE-JyxSAfkwxqHwKKFRLn1q9VSHyr",
    title: "Anime Recommendations",
    description: "is anyhting good lately?",
    threads: "1,234",
    posts: "13",
    lastPost: { user: "User321", date: "2025-05-01 14:23" }
    },
  // Add forum entry lain...
];

export const ForumTable = () => (
    <table className="min-w-full border border-red-400 rounded-lg overflow-hidden shadow-sm bg-[#f7eaea]">
        <thead className="bg-red-200">
        <tr>
            <th className="border-b border-red-400 px-6 py-3 text-left text-sm font-semibold text-red-900 tracking-wide">
            Forum
            </th>
            <th className="border-b border-red-400 px-6 py-3 text-left text-sm font-semibold text-red-900 tracking-wide">
            Threads
            </th>
            <th className="border-b border-red-400 px-6 py-3 text-left text-sm font-semibold text-red-900 tracking-wide">
            Posts
            </th>
            <th className="border-b border-red-400 px-6 py-3 text-left text-sm font-semibold text-red-900 tracking-wide">
            Last Post
            </th>
        </tr>
        </thead>
        <tbody>
        {forumData.map((forum, index) => (
            <ForumTableRow key={index} forum={forum} />
        ))}
        </tbody>
    </table>
);