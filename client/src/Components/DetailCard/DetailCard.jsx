import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearDetail } from '../../Redux/actions';
import style from './DetailCard.module.css';
import Loader from '../Loader/Loader';

export const DetailCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch]);

  const detail = useSelector(state => state.detailVideoGame);
  console.log(detail);
  if (!detail) {
    return (
      <Loader bgColor='#ecf1f2'/>
    )
  }

  return (
    <div className={style.detailContainer}>
      <div className={style.detailHeader}>
        <h2 className={style.detailTitle}>ID: {detail.id}</h2>
        <h2 className={style.detailTitle}>Name: {detail.name}</h2>
      </div>
      <div className={style.detailContent}>
        <div className={style.detailImageContainer}>
          <img className={style.detailImage} src={detail.image} alt={detail.name} />
        </div>
        <div className={style.detailInfo}>
          <h3 className={style.detailSubtitle}>Plataforms: {detail.platforms.join(', ')}</h3>
          <p className={style.detailDescription}>{detail.description}</p>
          <p className={style.detailText}>Relase Date: {detail.releaseDate}</p>
          <p className={style.detailText}>Rating: {detail.rating}</p>
          <p className={style.detailText}>Genres: {detail.created  ? detail.genres.map((genre) => genre.name).join(', ') : detail.genres.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};