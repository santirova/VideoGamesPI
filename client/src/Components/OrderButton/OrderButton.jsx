import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderVideoGames } from '../../Redux/actions';

export const OrderButton = ({ handleOrderFilter }) => {
  const allGames = useSelector((state) => state.allVideoGames);
  const renderGames = useSelector((state) => state.renderVideoGames);
  const dispatch = useDispatch();
  const [orderBy, setOrderBy] = useState('');

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setOrderBy(value);
    orderGamesHandler(value);
    handleOrderFilter()
  };

  const orderGamesHandler = (value) => {
    let sortedGames = [];

    if (renderGames.length !== 0) {
      sortedGames = [...renderGames];
    } else {
      sortedGames = [...allGames];
    }

    switch (value) {
      case 'A-Z':
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        sortedGames.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-asc':
        sortedGames.sort((a, b) => a.rating - b.rating);
        break;
      case 'rating-desc':
        sortedGames.sort((a, b) => b.rating - a.rating);
        break;
      default:
        return;
    }

    dispatch(orderVideoGames(sortedGames));
  };

  return (
    <div>
      <label htmlFor="sortingOptions">Ordenar por:</label>
      <select id="sortingOptions" value={orderBy} onChange={handleSelectChange}>
      <option value="" disabled hidden>Seleccione una opción</option>
        <option value="A-Z">Name (A-Z)</option>
        <option value="Z-A">Name (Z-A)</option>
        <option value="rating-asc">Rating (Ascendente)</option>
        <option value="rating-desc">Rating (Descendente)</option>
      </select>
    </div>
  );
};
