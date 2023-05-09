const {Router} = require('express');
const { getGenres } = require('../handlers/genresHandler');
const genresRouter = Router()

genresRouter.get('/',getGenres)


module.exports = genresRouter