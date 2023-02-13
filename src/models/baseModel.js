const sequelize = require('../../db')

const { PokemonModel } = require('./pokemonModel')

const PokemonCaught = PokemonModel(sequelize)

module.exports = {
    PokemonCaught
}