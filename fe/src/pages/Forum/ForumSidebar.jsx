// src/pages/Forum/ForumSidebar.jsx
export const ForumSidebar = () => (
    <aside className="w-80 bg-white rounded-3xl p-6 shadow-xl flex flex-col justify-between">
        <div>
        <h2 className="text-xl font-bold mb-4 text-[#bb3a44]">Forum Info</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
            Welcome to the RedArchive Forums
        </p>
        </div>
        <div className="mt-6">
        <h3 className="text-lg font-semibold text-[#bb3a44] mb-2">Quick Tips</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {['Use clear thread titles', 'Be respectful', 'Check existing topics', 'Have fun!'].map((tip, i) => (
            <li key={i}>{tip}</li>
            ))}
        </ul>
        </div>
    </aside>
);