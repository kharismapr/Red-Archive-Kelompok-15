// src/pages/Forum/ThreadList/ThreadItem.jsx
import { useNavigate } from 'react-router-dom';

export const ThreadItem = ({ thread }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const threadId = thread.thread_name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/thread/${threadId}`, { 
            state: {
                name: thread.name,
                username: thread.username,
                username_profile_picture: thread.profile_picture,
                username_profile_alt: thread.avatarAlt,
                postDate: thread.created_at,
                replyCount: thread.replies
            }
        });
    };

    return (
        <li onClick={handleClick} className="bg-[#f7eaea] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
                <div className="flex space-x-4">
                    <img 
                        className="w-14 h-14 shadow" 
                        src={thread.profile_picture}
                    />
                    <div>
                        <div className="text-red-800 font-semibold text-xl hover:underline">
                            {thread.name}
                        </div>
                        <p className="text-sm text-red-900 mt-1 max-w-xl leading-relaxed">
                            {thread.thread_name}
                        </p>
                        <div className="mt-2 text-xs text-red-700 flex space-x-4">
                            <span><i className="far fa-comments mr-1"></i>{thread.replies} replies</span>
                            <span><i className="far fa-eye mr-1"></i>{thread.views} views</span>
                        </div>
                    </div>
                </div>
                <div className="text-right text-red-900 text-xs">
                    <p className="font-semibold">{thread.username}</p>
                    <p className="mt-1">{thread.created_at}</p>
                </div>
            </div>
        </li>
    );
};