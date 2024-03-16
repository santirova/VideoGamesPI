import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './CardsContainer.module.css';
import { activeRender, changePage, getAllVideoGames, getGenres, orderVideoGames } from '../../Redux/actions'; 
import { Pagination } from '../Pagination/Pagination';
import { Card } from '../Card/Card';
import { OrderButton } from '../OrderButton/OrderButton';
import { FilterOptions } from '../FilterOptions/FilterOptions';
import Loader from '../Loader/Loader';

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const allGames = useSelector(state => state.allVideoGames);
  const renderGames = useSelector(state => state.renderVideoGames);
  const active = useSelector(state => state.activeRender);
  const currentPage = useSelector(state => state.currentPage)
  const [isLoading, setIsLoading] = useState(allGames.length !== 0 || renderGames.length !== 0 ? false : true);
  // const [currentPage, setCurrentPage] = useState(1);
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
      <Loader bgColor='#165063'/>
    );
  }

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = active ? renderGames.slice(indexOfFirstGame, indexOfLastGame) : allGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil((active ? renderGames.length : allGames.length) / gamesPerPage);
  const handleClick = pageNumber => dispatch(changePage(pageNumber))

  const handleOrderFilter = () => {
    if (!active) {
      console.log('activandro')
      dispatch(activeRender(true));
    }
    dispatch(changePage(1))
  };

  const handleResetFilters = () => {
    dispatch(orderVideoGames([])); 
    dispatch(activeRender(false))
    dispatch(changePage(1))
    
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
              <Card key={game.id} id={game.id} rating={game.rating} name={game.name} image={game.image} genres={game.genres} created={game.created} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
};
 