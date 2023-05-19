const axios = require('axios')
const {Videogame} = require('../db.js')
const { cleanGames, cleanDetail } = require('./cleaners')
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
    const allGames = allPages.flat();
  
    const cleandedApiGames = cleanGames(allGames);
    console.log(cleandedApiGames.length);
  
    return [...dbVideoGames, ...cleandedApiGames];
  }

const getQueryVideoGamesController = async (query) => {   
    const queryGames = (await getAllVideoGamesController()).filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
    if (queryGames.length !== 0) {
        return queryGames
    } else {
        return "No hay resultados"
    }
}

const getIdVideoGameController = async (source,id) => {
    if (source === "bdd") {
        const detail = await Videogame.findByPk(id)
        return detail
    }
    if (source === "api") {
        console.log(id)
        const detail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            .then(r => r.data)
        console.log(detail)
        return cleanDetail(detail) 
    }
}

const postVideogameController = async (name,description,platforms,image,relaseDate,rating,genres) => {
   return await Videogame.create({name,description,platforms,image,relaseDate,rating,genres})
}

module.exports = {getIdVideoGameController,getAllVideoGamesController,getQueryVideoGamesController,postVideogameController}