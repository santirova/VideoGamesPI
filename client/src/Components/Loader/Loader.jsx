import React from 'react'
import logo from '../../assets/logo-gamelab.png'; 
import style from './Loader.module.css'

const Loader = ({bgColor}) => {
  return (
    <div style={{ backgroundColor:`${bgColor}`,}} className={style.loaderContainer}>
        <img className={style.loader} src={logo} alt="" />
    </div>
  )
}

export default Loader