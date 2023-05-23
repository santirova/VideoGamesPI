import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Navbar.module.css';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={style.navbar}>
      <div>
        <h2 className={style.logo}>VideoGames PI</h2>
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
      {location.pathname === '/home' && (
        <div className={style.search}>
          <input type="search" placeholder="Search" className={style.input} />
          <button className={style.button}>GO</button>
        </div>
      )}
    </nav>
  );
};
