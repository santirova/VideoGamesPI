import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './CardsContainer.module.css';
import { activeRender, getAllVideoGames, getGenres, orderVideoGames } from '../../Redux/actions'; 
import { Pagination } from '../Pagination/Pagination';
import { Card } from '../Card/Card';
import { OrderButton } from '../OrderButton/OrderButton';
import { FilterOptions } from '../FilterOptions/FilterOptions';

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const allGames = useSelector(state => state.allVideoGames);
  const renderGames = useSelector(state => state.renderVideoGames);
  const active = useSelector(state => state.activeRender);
  const [isLoading, setIsLoading] = useState(allGames.length !== 0 || renderGames.length !== 0 ? false : true);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;
 

  useEffect(() => { 
    dispatch(getGenres());
    dispatch(getAllVideoGames())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <img className={style.loadingImg} src="https://www.gifde.com/gif/otros/decoracion/cargando-loading/cargando-loading-048.gif" alt="Loading..." />
      </div>
    );
  }

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = active ? renderGames.slice(indexOfFirstGame, indexOfLastGame) : allGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil((active ? renderGames.length : allGames.length) / gamesPerPage);
  const handleClick = pageNumber => setCurrentPage(pageNumber);

  const handleOrderFilter = () => {
    if (!active) {
      console.log('activandro')
      dispatch(activeRender(true));
    }
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    dispatch(orderVideoGames([])); 
    dispatch(activeRender(false))
    setCurrentPage(1);
    
  };

  return (
    <div className={style.cardsContainer}>
      <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
      <div className={style.filterAndOrderContainer}>
        <FilterOptions handleOrderFilter={handleOrderFilter} />
        <OrderButton handleOrderFilter={handleOrderFilter} />
      </div>
      {active && (
        <button className={style.resetFiltersButton} onClick={handleResetFilters}>
          Reset
        </button>
      )}
      {active && renderGames.length === 0 ? (
        <div className={style.cardsContent}>
          <div className={style.noGames}>No results</div>
        </div>
      ) : (
        <div className={style.cardsContent}>
          <div className={style.cards}>
            {currentGames.map(game => (
              <Card key={game.id} id={game.id} name={game.name} image={game.image} genres={game.genres} created={game.created} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
};
 