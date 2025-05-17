// src/pages/Forum/ForumTableRow.jsx
export const ForumTableRow = ({ forum }) => (
    <tr className="hover:bg-red-100 transition-colors duration-200 cursor-pointer">
        <td className="border-b border-red-300 px-6 py-4 align-top">
        <div className="flex items-start space-x-4">
            <img 
            alt="Forum icon" 
            className="w-12 h-12 rounded-lg shadow-md" 
            src={forum.icon}
            />
            <div>
            <a className="text-red-800 font-semibold text-lg hover:underline" href="#">
                {forum.title}
            </a>
            <p className="text-xs text-red-900 mt-1 max-w-xs leading-tight">
                {forum.description}
            </p>
            </div>
        </div>
        </td>
        <td className="border-b border-red-300 px-6 py-4 text-sm text-red-900 font-medium text-center">
        {forum.threads}
        </td>
        <td className="border-b border-red-300 px-6 py-4 text-sm text-red-900 font-medium text-center">
        {forum.posts}
        </td>
        <td className="border-b border-red-300 px-6 py-4 text-sm text-red-900">
        <p>
            <span className="font-semibold text-red-900">{forum.lastPost.user}</span>
            <br/>
            <span className="text-xs text-red-700">{forum.lastPost.date}</span>
        </p>
        </td>
    </tr>
);