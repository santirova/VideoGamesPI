const {getAllVideoGamesController,getQueryVideoGamesController, postVideogameController, getIdVideoGameController,} = require('../controllers/videoGamesControllers')

const getVideoGames = async (req,res)=>{
    const {name} = req.query
    try {
        if (name) {
            const detailGame = await getQueryVideoGamesController(name)
            res.status(200).send(detailGame)
        } else {
            const videoGames = await getAllVideoGamesController()
            res.status(200).json(videoGames)
        }    
    } catch (error) {
        res.status(400).send({error:error.message})
    }

}

const getVideoGameById = async (req,res)=>{
    const {id} = req.params 
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const detailGame = await getIdVideoGameController(source,id)
        res.status(200).json(detailGame)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

const postVideoGames = async (req,res) =>{
    const {name,description,platforms,image,releaseDate,rating,genres} = req.body
    try {
        await postVideogameController(name,description,platforms,image,releaseDate,rating,genres)
        res.status(200).send('video game created successfully')
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = {getVideoGameById,getVideoGames,postVideoGames}