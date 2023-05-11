const axios = require('axios');
const{API_KEY}= process.env;
const {Genres} = require('../db.js')



const getGenresController = async () => {
    const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        .then(r => r.data.results.map(e => {
            return {id:e.id,name:e.name}
         }))

    const conditional = await Genres.findAll()
    if (conditional.length === 0) {
        for (const e of allGenres) {
            await Genres.create({id:e.id,name:e.name})
        }
    }

    return await Genres.findAll()
    
}

module.exports = {getGenresController}