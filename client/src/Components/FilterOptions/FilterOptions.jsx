import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './FilterOptions.module.css';
import { orderVideoGames } from '../../Redux/actions';

export const FilterOptions = ({handleOrderFilter}) => {
  const dispatch = useDispatch()
  const genres = useSelector(state => state.genres);
  const allGames = useSelector((state) => state.allVideoGames);
  const renderGames = useSelector((state) => state.renderVideoGames);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

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
    const filterGames = allGames.filter(games => games.genres.includes(genre))
    dispatch(orderVideoGames(filterGames))
  }

  const doubleFilter = (origin,genre)=>{
    console.log('pasando');
    const firstFilters = allGames.filter(games => games.created === (origin === 'bdd' ? true : false))
    const secondFilters = firstFilters.filter(games => games.genres.includes(genre))
    dispatch(orderVideoGames(secondFilters))
  }

  const handleApplyFilters =  () => {
    if(selectedOrigin !== '' && selectedGenre !== ''){
      doubleFilter(selectedOrigin,selectedGenre)
      return handleOrderFilter()
    }
    if (selectedOrigin !== '') {
      console.log('solo origen');
      originFilter(selectedOrigin)
      return handleOrderFilter()
    }
    if (selectedGenre !== '' ){
      genreFilter(selectedGenre)
      return handleOrderFilter()
    }

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
              <option value="None" > None</option>
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
          <button className={style.applyButton} onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};