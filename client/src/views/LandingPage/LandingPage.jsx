import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {getAllVideoGames, getGenres} from '../../Redux/actions'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const LandingPage = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllVideoGames())
        dispatch(getGenres())
    },[dispatch])

  return (
    <div>
        <Link to='/home'>
            <button>
                vamos a ver los video juegos
            </button>  
        </Link>
        
    </div>
  )
}

export default LandingPage