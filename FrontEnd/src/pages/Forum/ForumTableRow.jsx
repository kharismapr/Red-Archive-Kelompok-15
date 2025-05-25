import { useNavigate } from 'react-router-dom';

// src/pages/Forum/ForumTableRow.jsx
export const ForumTableRow = ({ forum }) => {
    const navigate = useNavigate();
    
    const handleForumClick = () => {
        // Convert forum title to URL-friendly format
        const forumId = forum.name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/forum/${forumId}`);
    };

    return (
        <tr onClick={handleForumClick} className="hover:bg-red-100 transition-colors duration-200 cursor-pointer">
            <td className="border-b border-red-300 px-6 py-4 align-top">
                <div className="flex items-start space-x-4">
                    <img 
                        alt="Forum icon" 
                        className="w-12 h-12 rounded-lg shadow-md" 
                        src={forum.cover_picture}
                    />
                    <div>
                        <span className="text-red-800 font-semibold text-lg hover:underline">
                            {forum.name}
                        </span>
                        <p className="text-xs text-red-900 mt-1 max-w-xs leading-tight">
                            {forum.description}
                        </p>
                    </div>
                </div>
            </td>
            <td className="border-b border-red-300 px-6 py-4 text-sm text-red-900 font-medium text-center">
                {forum.thread_count}
            </td>
            <td className="border-b border-red-300 px-6 py-4 text-sm text-red-900 font-medium text-center">
                {forum.post_count}
            </td>
            <td className="border-b border-red-300 px-6 py-4 text-sm text-red-900">
                <p>
                    <span className="font-semibold text-red-900">{forum.username}</span>
                    <br/>
                    <span className="text-xs text-red-700">{forum.created_at}</span>
                </p>
            </td>
        </tr>
    );
};
