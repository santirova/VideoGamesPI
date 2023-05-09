

const getGenres = async (req,res) =>{
    res.status(200).send("Obtiene un arreglo con todos los géneros existentes de la API.")
}

module.exports = {getGenres}