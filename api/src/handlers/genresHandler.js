const { getGenresController } = require("../controllers/genresControllers")


const getGenres = async (req,res) =>{
    try {
        const allGenres = await getGenresController()
        res.status(200).json(allGenres)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = {getGenres}