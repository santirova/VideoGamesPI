import { GET_GENRES, GET_VIDEOGAMES,GET_DETAIL,CLEAR_DETAIL,ORDER_GAMES,ACTIVE_RENDER} from "./actions";

const initialState = {
  allVideoGames: [],
  activeRender:false,
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
    case ORDER_GAMES:
      return{
        ...state,
        renderVideoGames:action.payload
      }
    case ACTIVE_RENDER:
      return{
        ...state,
        activeRender:action.payload
      }
    default:
      return state; // Devolvemos el estado sin modificaciones para casos de acción desconocida
  }
};

export default rootReducer;