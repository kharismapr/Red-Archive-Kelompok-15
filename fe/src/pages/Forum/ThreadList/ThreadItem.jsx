// src/pages/Forum/ThreadList/ThreadItem.jsx
export const ThreadItem = ({ thread }) => (
    <li className="bg-[#f7eaea] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start">
        <div className="flex space-x-4">
            <img 
            alt={thread.avatarAlt} 
            className="w-14 h-14 shadow" 
            src={thread.avatarUrl}
            />
            <div>
            <a className="text-red-800 font-semibold text-xl hover:underline" href="#">
                {thread.title}
            </a>
            <p className="text-sm text-red-900 mt-1 max-w-xl leading-relaxed">
                {thread.description}
            </p>
            <div className="mt-2 text-xs text-red-700 flex space-x-4">
                <span><i className="far fa-comments mr-1"></i>{thread.replies} replies</span>
                <span><i className="far fa-eye mr-1"></i>{thread.views} views</span>
            </div>
            </div>
        </div>
        <div className="text-right text-red-900 text-xs">
            <p className="font-semibold">{thread.author}</p>
            <p className="mt-1">{thread.lastPost}</p>
        </div>
        </div>
    </li>
);