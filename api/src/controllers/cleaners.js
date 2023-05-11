const cleanGames = (games) =>{
    return games.map(e => {
        return {
            id:e.id,
            name:e.name,
            image:e.background_image,
            genres:e.genres.map(e=> e.name),
            releaseDate:e.released,
            platforms:e.platforms.map(e => e.platform.name),
            rating:e.rating
        }
    })
}
const cleanDetail = (e) =>{
    return {id:e.id,
        name:e.name,
        image:e.background_image,
        genres:e.genres.map(e=> e.name),
        releaseDate:e.released,
        platforms:e.platforms.map(e => e.platform.name),
        description:e.description,
        rating:e.rating}
}
module.exports = {cleanGames,cleanDetail}