import React, { useState } from 'react'
import style from './SearchBar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { activeRender, orderVideoGames } from '../../Redux/actions'

const SearchBar = () => {
    const [search,setSearch] = useState('')
    const dispatch = useDispatch()
    const allGames = useSelector(state => state.allVideoGames)
    const handleChange = (e) =>{
        const {value} = e.target
        setSearch(value)
    }

    const handleSubmit = () =>{
        const results = allGames.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
        dispatch(activeRender(true))
        dispatch(orderVideoGames(results))
        
    }

    return (
        <div className={style.search}>
            <input onChange={handleChange} type="search" placeholder="Search" className={style.input} value={search} />
            <button onClick={()=>handleSubmit()} className={style.button}>GO</button>
        </div>
  )
}

export default SearchBar