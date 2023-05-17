import { GET_GENRES, GET_VIDEOGAMES} from "./actions";


const initialState = {
    allVideoGames: [],
    renderVideoGames: [],
    detialVideoGame:null,
    genres:[]
}

const rootReducer = (state = initialState,action) =>{
    switch (action.type) {
        case GET_GENRES:
            return {...state,genres:action.payload}
        case GET_VIDEOGAMES:
            return {...state,allVideoGames:action.payload}
        default:
            break;
    }
};

export default rootReducer;