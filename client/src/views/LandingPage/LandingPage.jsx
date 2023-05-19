import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const LandingPage = () => {
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