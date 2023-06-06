import React, { useState,useEffect } from 'react'
import style from './SearchBar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { activeRender, orderVideoGames, setOrder } from '../../Redux/actions'

const SearchBar = () => {
    const [search,setSearch] = useState('')
    const dispatch = useDispatch()
    const active = useSelector(state => state.activeRender)
    const allGames = useSelector(state => state.allVideoGames)
    
    useEffect(()=>{
        if (!active) {
          setSearch('')
        }
      },[active])
    
    const handleChange = (e) =>{
        const {value} = e.target
        setSearch(value)
    }


    const handleSubmit = () =>{
        const results = allGames.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
        dispatch(activeRender(true))
        dispatch(orderVideoGames(results))
        dispatch(setOrder(''))
        
    }

    return (
        <div className={style.search}>
            <input onChange={handleChange} type="search" placeholder="Search" className={style.input} value={search} />
            <button onClick={()=>handleSubmit()} className={style.button}>GO</button>
        </div>
  )
}

export default SearchBar