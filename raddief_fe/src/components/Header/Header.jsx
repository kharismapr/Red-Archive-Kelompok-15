// src/components/Header/Header.jsx
import { Logo } from '../Logo';
import { SearchForm } from './SearchForm';

export const Header = () => (
  <header className="flex items-center justify-between px-6 py-4 border-b border-[#9a2f36]">
    <Logo />
    <SearchForm />
    <nav className="flex items-center space-x-6 font-semibold text-white text-base select-none">
      <a className="hover:underline" href="#">Film</a>
      <a className="hover:underline" href="#">Forum</a>
      <a className="flex items-center space-x-1" href="#">
        <i className="far fa-user text-lg"></i>
        <span>user</span>
      </a>
    </nav>
  </header>
);