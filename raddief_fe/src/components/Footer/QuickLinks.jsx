import { Link } from 'react-router-dom';

export const QuickLinks = () => (
    <div>
        <h4 className="font-semibold mb-3 select-text">Quick Links</h4>
        <ul className="space-y-1 text-white text-base select-text">
            <li><Link className="hover:underline" to="/">Home</Link></li>
            <li><Link className="hover:underline" to="/about">About Us</Link></li>
            <li><Link className="hover:underline" to="/forum">Forum</Link></li>
            <li><Link className="hover:underline" to="/film">Films</Link></li>
        </ul>
    </div>
);