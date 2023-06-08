import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './FilterOptions.module.css';
import { orderVideoGames, setOrder } from '../../Redux/actions';

export const FilterOptions = ({handleOrderFilter,setOrderBy}) => {
  const dispatch = useDispatch()
  const genres = useSelector(state => state.genres);
  const allGames = useSelector((state) => state.allVideoGames);
  const active = useSelector(state => state.activeRender)
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(()=>{
    if (!active) {
      setSelectedGenre('')
      setSelectedOrigin('')
    }
  },[active])
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleOriginChange = (e) => {
    setSelectedOrigin(e.target.value);
  };

  const originFilter = (origin) =>{
    if (origin === 'api') {
      const filterGames = allGames.filter(games => games.created === false)
      dispatch(orderVideoGames(filterGames))
    }
    if (origin === 'bdd'){
      const filterGames = allGames.filter(games => games.created === true)
      dispatch(orderVideoGames(filterGames))
    }
  }

  const genreFilter = (genre) =>{
    const filterGames = allGames.filter(games => {
      if (games.created) {
        return games.genres.some(obj => obj.name === genre);
      } else {
        return games.genres.includes(genre);
      }
    })
    dispatch(orderVideoGames(filterGames))
  }

  const doubleFilter = (origin, genre) => {
    console.log('pasando');
    const firstFilters = allGames.filter(games => games.created === (origin === 'bdd' ? true : false));
    const secondFilters = firstFilters.filter(games => {
      if (games.created) {
        return games.genres.some(obj => obj.name === genre);
      } else {
        return games.genres.includes(genre);
      }
    });
    dispatch(orderVideoGames(secondFilters));
  }
  
  const handleApplyFilters =  () => {
    if(selectedOrigin !== '' && selectedGenre !== ''){
      doubleFilter(selectedOrigin,selectedGenre)
      handleOrderFilter()
    }
    else if (selectedOrigin !== '') {
      console.log('solo origen');
      originFilter(selectedOrigin)
      handleOrderFilter()
    }
    else if (selectedGenre !== '' ){
      genreFilter(selectedGenre)
      handleOrderFilter()
    }
    dispatch(setOrder(''))
  };

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={style.filterOptions}>
      <button className={style.filterButton} onClick={toggleAccordion}>
        Filters
      </button>
      {isExpanded && (
        <div className={style.filterContent}>
          <div className={style.filterRow}>
            <label htmlFor="genre" className={style.filterLabel}>
              Genre:
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={handleGenreChange}
              className={style.filterSelect}
            >
              <option value="" disabled hidden > Select </option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className={style.filterRow}>
            <label htmlFor="origin" className={style.filterLabel}>
              Origin:
            </label>
            <select
              id="origin"
              value={selectedOrigin}
              onChange={handleOriginChange}
              className={style.filterSelect}
            >
              <option value=""disabled hidden>Select</option>
              <option value="api">API</option>
              <option value="bdd">Database</option>
            </select>
          </div>
          <button className={style.applyButton} onClick={handleApplyFilters} disabled={selectedGenre === '' && selectedOrigin === ''}>
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};