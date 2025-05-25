// src/pages/Forum/ForumTable.jsx
import { ForumTableRow } from './ForumTableRow';
import { useEffect, useState } from "react";
import axios from "axios";


// const forum = await axios.get("https://red-archive-kelompok-15.vercel.app/forum/getAll");
// console.log(forum);


// const forumData = 
// [
//     {
//         "cover_picture": "https://storage.googleapis.com/a1aa/image/d15cf52f-0e65-4496-3d03-7881c8eedcbd.jpg",
//         "name": "General Discussion",
//         "description": "Talk about anything related to anime and manga.",
//         "thread_count": "1,234",
//         "post_count": "12,345",
//         "username": "User123",
//         "created_at": "2024-06-01 14:23"
//     },
//     {
//         "cover_picture": "https://play-lh.googleusercontent.com/DkKKV6BfcJ_Pxf8qtR9uCpSubiB9lKbsudqhFUPNE-JyxSAfkwxqHwKKFRLn1q9VSHyr",
//         "name": "Anime Recommendations",
//         "description": "is anyhting good lately?",
//         "thread_count": "1,234",
//         "post_count": "13",
//         "username": "User321",
//         "created_at": "2025-05-01 14:23"
//     },
//     {
//         "id": "0f8f1263-3f66-445a-9371-44eb333eebd0",
//         "name": "Testing Forum",
//         "description": "Testing Thread",
//         "thread_count": 1,
//         "post_count": 1,
//         "last_post_id": null,
//         "cover_picture": "https://res.cloudinary.com/drm5dmz1y/image/upload/v1747057110/default_missing_gehecc.jpg",
//         "created_at": "2025-05-25T12:46:44.232Z",
//         "username": "test"
//     }
// ];

export const ForumTable = () => {
    const [forumData, setForum] = useState([{}]);
    const [update, setUpdate] = useState(false);
    
    useEffect(() => {
        handleForumPage();
    },[update]); 

    const handleForumPage = async () => {
        try {
            console.log("In effect");
            const response = await axios.get("https://red-archive-kelompok-15.vercel.app/forum/getAll");
            console.log("RESP: ", response.data.payload);
            setForum(response.data.payload);
            if(update === false) {setUpdate(true)};
        } catch (error) {
            console.log(error);
        }
    }

    return (
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
}