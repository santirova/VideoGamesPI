import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './CardsContainer.module.css';
import { activeRender, getAllVideoGames, getGenres, orderVideoGames } from '../../Redux/actions'; // Importa la acción resetFilters
import { Pagination } from '../Pagination/Pagination';
import { Card } from '../Card/Card';
import { OrderButton } from '../OrderButton/OrderButton';
import { FilterOptions } from '../FilterOptions/FilterOptions';

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const allGames = useSelector(state => state.allVideoGames);
  const renderGames = useSelector(state => state.renderVideoGames);
  const active = useSelector(state => state.activeRender);
  const [isLoading, setIsLoading] = useState(renderGames.length !== 0 ? false : true);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;
  const [isFilteredOrSorted, setIsFilteredOrSorted] = useState(renderGames.length !== 0 ? true : false);

  useEffect(() => { 
    console.log(active)
    dispatch(getGenres());
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
    dispatch(orderVideoGames(allGames)); // Llama a la acción resetFilters para eliminar los filtros
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
          Eliminar filtros
        </button>
      )} 
      {active && renderGames.length === 0 && <div>No hay resultados</div>}
      <div className={style.cards}>
        {currentGames.map(game => (
          <Card key={game.id} id={game.id} name={game.name} image={game.image} genres={game.genres} />
        ))}
      </div>
    </div>
  );
};
