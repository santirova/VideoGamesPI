import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderVideoGames, setOrder } from '../../Redux/actions';
import style from './OrderButton.module.css';

export const OrderButton = ({ handleOrderFilter}) => {
  const active = useSelector(state => state.activeRender)
  const allGames = useSelector((state) => state.allVideoGames);
  const renderGames = useSelector((state) => state.renderVideoGames);
  const orderBy = useSelector(state => state.orderBy)
  const dispatch = useDispatch();


  useEffect(()=>{
    if (!active) {
      dispatch(setOrder(''))
    }
  },[active])

  const handleSelectChange = (e) => {
    const value = e.target.value;
    dispatch(setOrder(value));
    orderGamesHandler(value);
    handleOrderFilter();
  };

  const orderGamesHandler = (value) => {
    let sortedGames = [];

    if (active) {
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
    <div className={style.orderButtonContainer}>
      <select
        id="sortingOptions"
        value={orderBy}
        onChange={handleSelectChange}
        className={style.orderSelect}
      >
        <option value="" disabled hidden>
          Orders
        </option>
        <option className={style.optionAZ} value="A-Z">Name (A-Z)</option>
        <option value="Z-A">Name (Z-A)</option>
        <option value="rating-asc">Rating (1-5)</option>
        <option value="rating-desc">Rating (5-1)</option>
      </select>
    </div>
  );
};
