const cleanGames = (games) =>{
    return games.map(e => {
        return {
            id:e.id,
            name:e.name,
            image:e.background_image,
            genres:e.genres.map(e=> e.name),
            released:e.released,
            platforms:e.platforms.map(e => e.platform.name),
            description:"No se sabe aun",
            rating:e.rating
        }
    })
}

module.exports = {cleanGames}