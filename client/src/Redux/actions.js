import axios from 'axios'

export const getGenres = () =>{
    return async function (dispatch) {
        const genres = await axios.get('http://localhost:3001/genres')
            .then(r => r.data)
        dispatch({type:GET_GENRES,payload:genres})
    }
}
export const getAllVideoGames = () =>{
    return async function (dispatch) {
        const videoGames = await axios.get('http://localhost:3001/videogames')
            .then(r => r.data)
        dispatch({type:GET_VIDEOGAMES,payload:videoGames})
    }
}

export const getDetailVideoGame = (id)=>{
    return async function (dispatch){
        const detailVideoGame = await axios.get(`http://localhost:3001/videogames/${id}`)
        .then(r => r.data)
        console.log(detailVideoGame)
        dispatch({type:GET_DETAIL,payload:detailVideoGame})

    }
}

export const clearDetail = ()=>{
    console.log('clear')
    return {type:CLEAR_DETAIL}
}
export const CLEAR_DETAIL = 'GET_DETAIL'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_GENRES = 'GET_GENRES'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'