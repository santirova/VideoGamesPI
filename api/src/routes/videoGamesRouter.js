const {Router} = require('express');
const { getVideoGames, getVideoGameById, postVideoGames } = require('../handlers/videoGamesHandlers');
const videoGamesRouter = Router();

videoGamesRouter.get('/',getVideoGames)
videoGamesRouter.get('/:id',getVideoGameById)
videoGamesRouter.post('/',postVideoGames)

module.exports = videoGamesRouter