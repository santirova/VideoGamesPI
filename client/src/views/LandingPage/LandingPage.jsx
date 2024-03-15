import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={style.landingPage}>
      <h1 className={style.title}>GAME LAB</h1>
      <Link to="/home">
        <button className={style.button}>Let's Explore</button>
      </Link>
    </div>
  );
};

export default LandingPage;
