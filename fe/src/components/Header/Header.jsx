import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { SearchForm } from './SearchForm';

export const Header = () => (
  <header className="flex items-center justify-between px-6 py-4 border-b border-[#9a2f36]">
    <Link to="/">
      <Logo />
    </Link>
    <SearchForm />
    <nav className="flex items-center space-x-6 font-semibold text-white text-base select-none">
      <Link className="hover:underline" to="/film">Film</Link>
      <Link className="hover:underline" to="/forum">Forum</Link>
      <Link className="flex items-center space-x-1" to="/profile">
        <i className="far fa-user text-lg"></i>
        <span>user</span>
      </Link>
    </nav>
  </header>
);