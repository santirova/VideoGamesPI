import React from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const videoGames = useSelector(state => state.allVideoGames)
    console.log(videoGames)
  return (
    <div>Estas en home</div>
  )
}

export default HomePage