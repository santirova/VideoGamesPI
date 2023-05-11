const axios = require('axios')
const {Videogame} = require('../db.js')
const { cleanGames } = require('./cleaners')
const{API_KEY}= process.env

const getAllVideoGamesController = async () => {
    const dbVideoGames = await Videogame.findAll();
  
    const pageRequests = [];
    for (let i = 1; i <= 5; i++) {
      pageRequests.push(
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
          .then(response => response.data.results)
      );
    }
  
    const allPages = await Promise.all(pageRequests);
    console.log(allPages)
    const allGames = allPages.flat();
  
    const cleandedApiGames = cleanGames(allGames);
    console.log(cleandedApiGames.length);
  
    return [...dbVideoGames, ...cleandedApiGames];
  }

const getQueryVideoGamesController = async (query)=>{
    const queryGames = (await getAllVideoGamesController()).filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
    if (queryGames.length !== 0) {
        return queryGames
    } else {
        return "No hay resultados"
    }
}

module.exports ={getAllVideoGamesController,getQueryVideoGamesController}