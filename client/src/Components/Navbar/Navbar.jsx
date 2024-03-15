import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Navbar.module.css';
import SearchBar from '../SearchBar/SearchBar';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={style.navbar}>
      <div>
        <h2 className={style.logo}>GAME LAB</h2>
      </div>
      <div className={style.links}>
        <Link
          to="/home"
          className={`${style.link} ${location.pathname === '/home' ? style.active : ''}`}
        >
          HOME
        </Link>
        <Link
          to="/form"
          className={`${style.link} ${location.pathname === '/form' ? style.active : ''}`}
        >
          FORM
        </Link>
      </div>
      {location.pathname === '/home' && <SearchBar/>}
    </nav>
  );
};
