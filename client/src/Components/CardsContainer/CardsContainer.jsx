import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import style from './CardsContainer.module.css';
import { getAllVideoGames } from '../../Redux/actions';

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const renderGames = useSelector(state => state.allVideoGames);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  useEffect(() => {
    dispatch(getAllVideoGames())
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return <img classname={style.loadingImg} src='https://www.gifde.com/gif/otros/decoracion/cargando-loading/cargando-loading-048.gif' alt="Loading..." />;
  }

  // Verificar si renderGames tiene elementos antes de renderizar el contenido
  if (!renderGames || renderGames.length === 0) {
    return <div>No hay juegos disponibles.</div>;
  }

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = renderGames.slice(indexOfFirstGame, indexOfLastGame);

  const handleClick = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={style.CardsContainer}>
      <>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(renderGames.length / gamesPerPage)} handleClick={handleClick} />
        <div className={style.cards}>
          {currentGames.map(game => (
            <Card key={game.id} id={game.id} name={game.name} image={game.image} genres={game.genres} />
          ))}
        </div>
      </>
    </div>
  );
};