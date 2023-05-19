import { GET_GENRES, GET_VIDEOGAMES,GET_DETAIL,CLEAR_DETAIL } from "./actions";

const initialState = {
  allVideoGames: [],
  renderVideoGames: [],
  detailVideoGame: null,
  genres: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideoGames: action.payload
      };
    case GET_DETAIL:
      return{
        ...state,
        detailVideoGame:action.payload
      }
    case CLEAR_DETAIL:
      return{
        ...state,
        detailVideoGame:null
      }
    default:
      return state; // Devolvemos el estado sin modificaciones para casos de acción desconocida
  }
};

export default rootReducer;