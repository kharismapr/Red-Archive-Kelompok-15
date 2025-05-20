// src/pages/Profile/ProfileSidebar/RecentPosts.jsx
export const RecentPosts = () => {
    const posts = [
        { title: "is illya legal?", thread: "thread name" },
        { title: "How to watch fate . .", thread: "Thread name" },
        { title: "John wick lived..", thread: "Thread name" }
    ];

    return (
        <section className="w-full">
        <h3 className="font-semibold text-lg mb-2 select-text">Recent Post</h3>
        <hr className="border-[#9a2f36] mb-4"/>
        <div className="space-y-3">
            {posts.map((post, index) => (
            <div key={index} className="bg-[#d1d5db] rounded-md p-3 text-[#6b7280] cursor-default select-text">
                <p className="font-bold text-[#4b5563] mb-1 truncate">{post.title}</p>
                <p className="text-sm">{post.thread}</p>
            </div>
            ))}
        </div>
        </section>
    );
};