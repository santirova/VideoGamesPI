import axios from 'axios'

export const getGenres = () =>{
    return async function (dispatch) {
        const genres = await axios.get('/genres')
            .then(r => r.data)
        dispatch({type:GET_GENRES,payload:genres})
    }
}
export const getAllVideoGames = () =>{
    return async function (dispatch) {
        const videoGames = await axios.get('/videogames')
            .then(r => r.data)
        dispatch({type:GET_VIDEOGAMES,payload:videoGames})
    }
}

export const getDetailVideoGame = (id)=>{
    return async function (dispatch){
        const detailVideoGame = await axios.get(`/videogames/${id}`)
        .then(r => r.data)
        console.log(detailVideoGame)
        dispatch({type:GET_DETAIL,payload:detailVideoGame})

    }
}
export const changePage = (page) =>{
    return {
        type:CHANGE_PAGE,payload:page
    }
}

export const orderVideoGames = (games)  =>{
    return{
        type:ORDER_GAMES,payload:games
    }
}

export const clearDetail = ()=>{
    console.log('clear')
    return {type:CLEAR_DETAIL}
}

export const activeRender = (value) =>{
    return {type:ACTIVE_RENDER,payload:value}
}

export const setOrder = (value) =>{
    return{type:SET_ORDER,payload:value}
}


export const CHANGE_PAGE = 'CHANGE_PAGE'
export const SET_ORDER = 'SET_ORDER'
export const ACTIVE_RENDER = 'ACTIVE_RENDER'
export const CLEAR_DETAIL = 'GET_DETAIL'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_GENRES = 'GET_GENRES'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const ORDER_GAMES = 'ORDER_GAMES'