import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Navbar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../assets/logo-gamelab.png'; // Importa la imagen del logo desde la carpeta de activos

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={style.navbar}>
      <div className={style.logoContainer}>
        <img src={logo} alt="Logo" className={style.logo} /> {/* Agrega el logo aquí */}
        <h1 className={style.title}>GAME LAB</h1> {/* Mantén el título */}
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

