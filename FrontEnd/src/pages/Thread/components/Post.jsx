// src/pages/Thread/components/Post.jsx
export const Post = ({ post }) => (
  <article className="bg-[#f7eaea] rounded-xl p-5 mb-6 shadow-md border border-red-300 flex flex-col" id={`post-${post.post_id}`}>
    <header className="flex items-center space-x-4 mb-3">
      <img  
        className="w-12 h-12 shadow-md" 
        src={post.profile_picture}
      />
      <div>
        <h2 className="font-semibold text-red-900 text-lg">{post.username}</h2>
        <time className="text-xs text-red-700" dateTime={post.post_date}>
          {post.post_date}
        </time>
      </div>
    </header>
    <p className="text-red-900 leading-relaxed mb-4">{post.comment}</p>
    <div className="flex items-center space-x-4 text-red-900 font-semibold select-none">
      <button aria-label={`Upvote post ${post.post_id}`} className="flex items-center space-x-1 hover:text-red-600 focus:outline-none" type="button">
        <i className="fas fa-arrow-up"></i>
        <span>{post.score}</span>
      </button>
      <button aria-label={`Downvote post ${post.post_id}`} className="flex items-center space-x-1 hover:text-red-600 focus:outline-none" type="button">
        <i className="fas fa-arrow-down"></i>
        <span>0 {/*post.downvotes*/}</span>
      </button>
    </div>
  </article>
);

