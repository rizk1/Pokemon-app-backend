const { Router } = require('express')
const router = Router()

const pokemonController = require('../controllers/pokemonCaught')

router.get('/my-pokemon', pokemonController.getPokemon)
router.get('/my-pokemon/:pokemon', pokemonController.getDetailPokemon)
router.get('/my-pokemon-list', pokemonController.getPokemonList)
router.get('/release-pokemon', pokemonController.ReleasePokemon)
router.post('/catch-pokemon', pokemonController.CatchPokemon)
router.post('/change-pokemon-name', pokemonController.UpdateNamePokemon)

module.exports = router