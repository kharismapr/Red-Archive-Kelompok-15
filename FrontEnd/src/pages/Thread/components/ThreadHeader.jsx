// src/pages/Thread/components/ThreadHeader.jsx
export const ThreadHeader = ({ thread, length }) => {
  return (
  <section className="bg-[#c75a5f] rounded-3xl p-6 shadow-lg">
    <h1 className="text-3xl font-bold mb-2 text-white border-b border-red-300 pb-3">
      {thread.thread_name}
    </h1>
    <div className="flex items-center space-x-4 text-red-900 text-sm font-medium">
      <div className="flex items-center space-x-2">
        <img className="w-10 h-10 shadow-md" src={thread.profile_picture}/>
        <span>{thread.username}</span>
      </div>
      <span>Posted on {thread.post_date}</span>
      <span className="ml-auto font-semibold">Replies: {length || 0}</span>
    </div>
  </section>
)};