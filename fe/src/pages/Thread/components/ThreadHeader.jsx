// src/pages/Thread/components/ThreadHeader.jsx
export const ThreadHeader = ({ thread }) => (
  <section className="bg-[#c75a5f] rounded-3xl p-6 shadow-lg">
    <h1 className="text-3xl font-bold mb-2 text-white border-b border-red-300 pb-3">
      {thread.title}
    </h1>
    <div className="flex items-center space-x-4 text-red-900 text-sm font-medium">
      <div className="flex items-center space-x-2">
        <img alt={thread.authorAvatarAlt} className="w-10 h-10 shadow-md" src={thread.authorAvatarUrl}/>
        <span>{thread.author}</span>
      </div>
      <span>Posted on {thread.postDate}</span>
      <span className="ml-auto font-semibold">Replies: {thread.replyCount}</span>
    </div>
  </section>
);