const {getAllVideoGamesController,getQueryVideoGamesController,} = require('../controllers/videoGamesControllers')

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
    res.status(200).send('Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego. ')
}

const postVideoGames = async (req,res) =>{
    res.status(200).send('Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.')
}

module.exports = {getVideoGameById,getVideoGames,postVideoGames}