// src/pages/Thread/components/Post.jsx
export const Post = ({ post }) => (
  <article className="bg-[#f7eaea] rounded-xl p-5 mb-6 shadow-md border border-red-300 flex flex-col" id={`post-${post.id}`}>
    <header className="flex items-center space-x-4 mb-3">
      <img 
        alt={post.avatarAlt} 
        className="w-12 h-12 shadow-md" 
        src={post.avatarUrl}
      />
      <div>
        <h2 className="font-semibold text-red-900 text-lg">{post.author}</h2>
        <time className="text-xs text-red-700" dateTime={post.datetime}>
          {post.date}
        </time>
      </div>
    </header>
    <p className="text-red-900 leading-relaxed mb-4">{post.content}</p>
    <div className="flex items-center space-x-4 text-red-900 font-semibold select-none">
      <button aria-label={`Upvote post ${post.id}`} className="flex items-center space-x-1 hover:text-red-600 focus:outline-none" type="button">
        <i className="fas fa-arrow-up"></i>
        <span>{post.upvotes}</span>
      </button>
      <button aria-label={`Downvote post ${post.id}`} className="flex items-center space-x-1 hover:text-red-600 focus:outline-none" type="button">
        <i className="fas fa-arrow-down"></i>
        <span>{post.downvotes}</span>
      </button>
    </div>
  </article>
);

