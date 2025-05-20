import { Link } from 'react-router-dom';

export default function ThreadCard({ post }) {
  return (
    <Link to={post.link || "/forum"} className="block bg-white rounded-lg shadow-md mb-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-gray-50">
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#7B191F] mb-1">{post.title}</h3>
        <p className="text-sm text-gray-600">by {post.author}</p>
      </div>
    </Link>
  );
}