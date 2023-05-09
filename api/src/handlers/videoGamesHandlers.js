

const getVideoGames = async (req,res)=>{
    const {name} = req.query
    if (name) {
        res.status(200).send('Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.')
    } else {
        res.status(200).send('Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.')
    }
}


const getVideoGameById = async (req,res)=>{
    res.status(200).send('Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego. ')
}

const postVideoGames = async (req,res) =>{
    res.status(200).send('Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.')
}

module.exports = {getVideoGameById,getVideoGames,postVideoGames}