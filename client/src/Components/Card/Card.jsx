import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { getDetailVideoGame } from '../../Redux/actions';

export const Card = ({ image, genres, name, id }) => {
  console.log(genres);
  const dispatch = useDispatch()
  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img className={style.cardImg} src={image} alt={name} />
      </div>
      <div className={style.content}>
        <div className={style.name}>
          <h2>{name}</h2>
        </div>
        <div className={style.genres}>
          <h3>Genres: {genres.join(', ')}</h3>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Link to='/detail' className={style.cardLink}>
          <button className={style.cardButton} onClick={() => dispatch(getDetailVideoGame(id))}>View Detail</button>
        </Link>
      </div>
    </div>
  );
};
